import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DecisionCard, ConfirmationCard } from "../../components/DialogCards";
import UserRoleSelector from "../../components/UserRoleSelector";
import { toast } from "sonner";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  selectedRoles: string[];
}

const availableRoles = [
  { id: "all", name: "All" },
  { id: "system-admin", name: "System Admin" },
  { id: "it-support", name: "IT Support" },
  { id: "hr-manager", name: "HR Manager" },
  { id: "accountant", name: "Accountant" },
  { id: "customer-service", name: "Customer Service Agent" },
];

export default function CreateUser() {
  const navigate = useNavigate();
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
    } else if (!/^[\d\s\-+()]+$/.test(formData.phoneNumber)) {
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

  const handleDecisionConfirm = () => {
    setDecisionOpen(false);
    // Simulate API call
    setTimeout(() => {
      setConfirmationOpen(true);
    }, 500);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    navigate("/manage-users");
  };

  const handleCancel = () => {
    navigate("/manage-users");
  };

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
        <Typography color="text.primary">Create New User</Typography>
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
          Create New User
        </Typography>
        <Typography variant="body2" sx={{ color: "#667085" }}>
          Fill in new user information to create one.
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
              <TextField
                className="w-full"
                size="small"
                placeholder="Enter user phone number"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber || "Enter a valid phone number"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
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
              sx={{
                textTransform: "none",
                backgroundColor: "#AD3291",
                borderRadius: "8px",
                padding: "8px 24px",
                "&:hover": {
                  backgroundColor: "#92287A",
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>

      {/* Decision Card */}
      <DecisionCard
        open={decisionOpen}
        onClose={() => setDecisionOpen(false)}
        title="Create User ?"
        description="Are you sure you want to create New User ?"
        cancelButton={{
          text: "Cancel",
          color: "#AD3291",
          action: () => setDecisionOpen(false),
        }}
        confirmButton={{
          text: "Yes, Create",
          color: "#AD3291",
          action: handleDecisionConfirm,
        }}
      />

      {/* Confirmation Card */}
      <ConfirmationCard
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        title="User Created"
        description="User has been successfully created"
        button={{
          text: "Close",
          color: "#AD3291",
          action: handleConfirmationClose,
        }}
      />
    </Box>
  );
}
