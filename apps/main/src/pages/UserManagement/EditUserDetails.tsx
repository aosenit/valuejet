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
import { toast } from "sonner";

interface UserFormData {
  email: string;
  phoneNumber: string;
}

// Mock user data
const mockUserData = {
  id: "timipreye-oweikeme",
  email: "bisilekan@gmail.com",
  phoneNumber: "07023451129",
};

export default function EditUserDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    email: mockUserData.email,
    phoneNumber: mockUserData.phoneNumber,
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[\d\s\-+()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof UserFormData, value: string) => {
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
    navigate(`/user-profile/${mockUserData.id}`);
  };

  const handleCancel = () => {
    navigate(`/user-profile/${mockUserData.id}`);
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
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(`/user-profile/${mockUserData.id}`)}
          sx={{ color: "#667085", textDecoration: "none" }}
        >
          User Profile
        </Link>
        <Typography color="text.primary">Edit User Details</Typography>
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
          Edit User Details
        </Typography>
        <Typography variant="body2" sx={{ color: "#667085" }}>
          Fill in new user information to modify.
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
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#101828", mb: 3 }}
          >
            Contact Information
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
              <Box className="w-full">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter email address"
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
              <Box className="w-full">
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  error={!!errors.phoneNumber}
                  helperText={
                    errors.phoneNumber || "Enter a valid phone number"
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
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
      {decisionOpen && (
        <DecisionCard
          open={decisionOpen}
          onClose={() => setDecisionOpen(false)}
          title="Save New Changes ?"
          description="Are you sure, you want to Save new changes ? Kindly note that this new changes would override previous data."
          cancelButton={{
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          }}
          confirmButton={{
            text: "Save Changes",
            color: "#AD3291",
            action: handleDecisionConfirm,
          }}
        />
      )}

      {/* Confirmation Card */}
      {confirmationOpen && (
        <ConfirmationCard
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          title="User Updated"
          description="User has been successfully updated"
          button={{
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          }}
        />
      )}
    </Box>
  );
}
