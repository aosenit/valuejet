import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Skeleton,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { DecisionCard, ConfirmationCard } from "../../components/DialogCards";
import UserRoleSelector from "../../components/UserRoleSelector";
import { toast } from "sonner";
import { usePostData, useFetchData, usePutData } from "../../hooks/useApis";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useQueryClient } from "@tanstack/react-query";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedRoles: string[];
}

export default function CreateUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId?: string }>();

  // Determine if we're in edit mode
  const isEditMode = !!userId;

  // Fetch user data if in edit mode
  const { data: userResponse, isLoading: userLoading } = useFetchData(
    isEditMode ? `users/${userId}` : null
  );

  const createUserMutation = usePostData("users");
  const updateUserMutation = usePutData(`users/${userId}`);
  const { data: rolesResponse, isLoading: rolesLoading } =
    useFetchData("users/roles");

  const availableRoles = rolesResponse?.data || [];
  const userData = userResponse?.data;

  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    selectedRoles: [],
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Prefill form in edit mode
  useEffect(() => {
    if (isEditMode && userData && rolesResponse?.data) {
      const roles = rolesResponse.data;
      const matchingRole = roles.find(
        (role: { name: string }) => role.name === userData.assigned_role
      );

      setFormData({
        firstName: userData.firstname || "",
        lastName: userData.lastname || "",
        email: userData.email || "",
        phoneNumber: userData.phone_number || "",
        selectedRoles: matchingRole ? [matchingRole.id] : [],
      });
    }
  }, [userData, isEditMode, rolesResponse]);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Enter a valid phone number";
    }

    if (formData.selectedRoles.length === 0) {
      newErrors.selectedRoles = ["At least one role must be selected"];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      setDecisionOpen(true);
    } else {
      toast.error("Please fix the errors before saving");
    }
  };

  const handleDecisionConfirm = async () => {
    try {
      const selectedRole = availableRoles.find(
        (role: { id: string; name: string }) =>
          role.id === formData.selectedRoles[0]
      );

      if (isEditMode) {
        // Edit mode - PUT request
        const payload = {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          assigned_role: selectedRole?.name || formData.selectedRoles[0] || "",
        };

        const response = await updateUserMutation.mutateAsync(payload);

        if (response) {
          await queryClient.invalidateQueries({
            queryKey: [`users/${userId}`],
          });
          await queryClient.invalidateQueries({ queryKey: ["users"] });

          setDecisionOpen(false);
          setConfirmationOpen(true);
          toast.success(response.message || "User updated successfully!");
        }
      } else {
        // Create mode - POST request
        const callbackUrl = `${window.location.origin}/activate-account`;

        const payload = {
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          assigned_role: selectedRole?.name || formData.selectedRoles[0] || "",
          callback_url: callbackUrl,
        };

        const response = await createUserMutation.mutateAsync(payload);

        if (response) {
          await queryClient.invalidateQueries({ queryKey: ["users"] });

          setDecisionOpen(false);
          setConfirmationOpen(true);
          toast.success(
            response.message ||
              "User created successfully! Activation email sent."
          );
        }
      }
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} user:`,
        error
      );
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        `Failed to ${isEditMode ? "update" : "create"} user. Please try again.`;
      toast.error(errorMessage);
      setDecisionOpen(false);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    if (isEditMode) {
      navigate(`/user-profile/${userId}`);
    } else {
      navigate("/manage-users");
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/user-profile/${userId}`);
    } else {
      navigate("/manage-users");
    }
  };

  // Loading state for edit mode
  if (isEditMode && userLoading) {
    return (
      <Box sx={{ backgroundColor: "#F9F6F8", minHeight: "100vh", pb: 10 }}>
        <Box sx={{ px: 4, py: 2 }}>
          <Skeleton variant="text" width={200} height={24} />
        </Box>
        <Box
          sx={{
            mb: 4,
            backgroundColor: "white",
            px: 4,
            py: 3,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Skeleton variant="text" width={250} height={32} sx={{ mb: 1 }} />
          <Skeleton variant="text" width={300} height={20} />
        </Box>
        <Box sx={{ backgroundColor: "white", borderRadius: 2, p: 4, mx: 4 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={`skeleton-field-${index}`} sx={{ mb: 3 }}>
              <Skeleton variant="text" width={150} height={24} sx={{ mb: 1 }} />
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#F9F6F8", minHeight: "100vh", pb: 10 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ px: 4, py: 2 }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/manage-users")}
          sx={{ color: "#667085", textDecoration: "none" }}
        >
          Manage Users
        </Link>
        {isEditMode && (
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate(`/user-profile/${userId}`)}
            sx={{ color: "#667085", textDecoration: "none" }}
          >
            User Profile
          </Link>
        )}
        <Typography color="text.primary">
          {isEditMode ? "Edit User" : "Create New User"}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box
        sx={{
          mb: 4,
          backgroundColor: "white",
          px: 4,
          py: 2,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "#101828", mb: 1 }}
        >
          {isEditMode
            ? `Edit User: ${userData?.firstname || ""} ${userData?.lastname || ""}`
            : "Create New User"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#667085" }}>
          {isEditMode
            ? "Update user information"
            : "Fill in new user information to create one."}
        </Typography>
      </Box>

      {/* Form Card */}
      <form className="flex justify-center">
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            p: 4,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* First Name */}
            <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
              <div className="">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#101828" }}
                >
                  First Name
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#667085", mb: 1, display: "block" }}
                >
                  Enter first name.
                </Typography>
              </div>
              <TextField
                className="w-full"
                size="small"
                placeholder="Enter user first name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* Last Name */}
            <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
              <div className="">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#101828" }}
                >
                  Last Name
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#667085", mb: 1, display: "block" }}
                >
                  Enter last name.
                </Typography>
              </div>
              <TextField
                className="w-full"
                size="small"
                placeholder="Enter user last name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* Email Address */}
            <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
              <div className="">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#101828" }}
                >
                  Email Address
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#667085", mb: 1, display: "block" }}
                >
                  Enter email address.
                </Typography>
              </div>
              <TextField
                className="w-full"
                size="small"
                placeholder="Enter user email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email || "Enter a valid email address"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
            </Box>

            {/* Phone Number */}
            <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
              <div className="">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#101828" }}
                >
                  Phone Number
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#667085", mb: 1, display: "block" }}
                >
                  Enter phone number.
                </Typography>
              </div>
              <div
                className={`w-full ${errors.phoneNumber ? "react-tel-input error" : ""}`}
              >
                <PhoneInput
                  country={"ng"}
                  value={formData.phoneNumber}
                  onChange={(phone) => handleInputChange("phoneNumber", phone)}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    fontSize: "14px",
                    borderRadius: "8px",
                    paddingLeft: "48px",
                  }}
                  buttonStyle={{
                    borderRadius: "8px 0 0 8px",
                  }}
                  containerStyle={{
                    width: "100%",
                  }}
                  dropdownStyle={{
                    borderRadius: "8px",
                  }}
                />
                {errors.phoneNumber && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#EF4444",
                      mt: 0.5,
                      display: "block",
                      ml: 1.75,
                    }}
                  >
                    {errors.phoneNumber}
                  </Typography>
                )}
                {!errors.phoneNumber && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#667085",
                      mt: 0.5,
                      display: "block",
                      ml: 1.75,
                    }}
                  >
                    Enter a valid phone number
                  </Typography>
                )}
              </div>
            </Box>

            {/* Assign Role */}
            <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
              <div className="">
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#101828" }}
                >
                  Assign Role *
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "#667085", mb: 1, display: "block" }}
                >
                  Select assignee (s)
                </Typography>
              </div>
              <div className="w-full">
                {rolesLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" sx={{ color: "#667085" }}>
                      Loading roles...
                    </Typography>
                  </Box>
                ) : (
                  <>
                    <UserRoleSelector
                      roles={availableRoles}
                      selectedRoles={formData.selectedRoles}
                      onRoleChange={(roles) =>
                        handleInputChange("selectedRoles", roles)
                      }
                      placeholder="Select an Option (s)"
                      helperText="You can only select one role"
                    />
                    {errors.selectedRoles && (
                      <Typography
                        variant="caption"
                        sx={{ color: "#EF4444", mt: 1, display: "block" }}
                      >
                        {errors.selectedRoles[0]}
                      </Typography>
                    )}
                  </>
                )}
              </div>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                textTransform: "none",
                borderColor: "#AD3291",
                color: "#AD3291",
                borderRadius: "8px",
                padding: "8px 24px",
                "&:hover": {
                  borderColor: "#AD3291",
                  backgroundColor: "#AD329110",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={
                (isEditMode
                  ? updateUserMutation.isPending
                  : createUserMutation.isPending) ||
                rolesLoading ||
                userLoading
              }
              sx={{
                textTransform: "none",
                backgroundColor: "#AD3291",
                borderRadius: "8px",
                padding: "8px 24px",
                "&:hover": {
                  backgroundColor: "#92287A",
                },
                "&:disabled": {
                  backgroundColor: "#D1D5DB",
                  color: "#9CA3AF",
                },
              }}
            >
              {isEditMode ? "Update" : "Save"}
            </Button>
          </Box>
        </Box>
      </form>

      {/* Decision Card */}
      <DecisionCard
        loading={
          isEditMode
            ? updateUserMutation.isPending
            : createUserMutation.isPending
        }
        open={decisionOpen}
        onClose={() => setDecisionOpen(false)}
        title={isEditMode ? "Update User ?" : "Create User ?"}
        description={
          isEditMode
            ? "Are you sure you want to save these changes? This will update the user information."
            : "Are you sure you want to create New User ?"
        }
        cancelButton={{
          text: "Cancel",
          color: "#AD3291",
          action: () => setDecisionOpen(false),
        }}
        confirmButton={{
          text: isEditMode ? "Yes, Update" : "Yes, Create",
          color: "#AD3291",
          action: () => {
            void handleDecisionConfirm();
          },
        }}
      />

      {/* Confirmation Card */}
      <ConfirmationCard
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        title={isEditMode ? "User Updated" : "User Created"}
        description={
          isEditMode
            ? "User has been successfully updated"
            : "User has been successfully created"
        }
        button={{
          text: "Close",
          color: "#AD3291",
          action: handleConfirmationClose,
        }}
      />
    </Box>
  );
}
