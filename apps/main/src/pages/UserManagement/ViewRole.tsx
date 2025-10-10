import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DecisionCard, ConfirmationCard } from "../../components/DialogCards";
import PermissionSelector from "../../components/PermissionSelector";
import ActionMenu from "../../components/ActionMenu";
import { toast } from "sonner";

interface RoleFormData {
  roleName: string;
  description: string;
  selectedPermissions: string[];
}

interface Permission {
  id: string;
  name: string;
  subPermissions?: Permission[];
}

const availablePermissions: Permission[] = [
  {
    id: "dashboard",
    name: "Dashboard",
  },
  {
    id: "corporate-profile",
    name: "Corporate Profile Management",
    subPermissions: [
      { id: "view-profile", name: "View Profile" },
      { id: "edit-profile", name: "Edit Profile" },
      { id: "delete-profile", name: "Delete Profile" },
    ],
  },
  {
    id: "corporate-sales",
    name: "Corporate Sales Desk",
    subPermissions: [
      { id: "view-sales", name: "View Sales Data" },
      { id: "create-sales", name: "Create Sales Records" },
      { id: "update-sales", name: "Update Sales Records" },
    ],
  },
  {
    id: "workflow",
    name: "WorkFlow Management",
    subPermissions: [
      { id: "view-workflow", name: "View Workflows" },
      { id: "create-workflow", name: "Create Workflows" },
      { id: "manage-workflow", name: "Manage Workflows" },
    ],
  },
  {
    id: "audit-trail",
    name: "Audit Trail",
  },
  {
    id: "report-management",
    name: "Report Management",
    subPermissions: [
      { id: "view-reports", name: "View Reports" },
      { id: "generate-reports", name: "Generate Reports" },
      { id: "export-reports", name: "Export Reports" },
    ],
  },
];

// Mock role data - in real app, this would come from API
const mockRoleData = {
  id: "finance-officer",
  roleName: "Finance Officer",
  description:
    "The Finance Officer oversees customer billing, payment reconciliation, and refund processing. They ensure financial accuracy across transactions and support compliance with internal financial policies.",
  selectedPermissions: [
    "dashboard",
    "corporate-profile",
    "view-profile",
    "edit-profile",
    "corporate-sales",
    "view-sales",
    "audit-trail",
  ],
  isActive: true,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-20",
};

export default function ViewRole() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RoleFormData>({
    roleName: mockRoleData.roleName,
    description: mockRoleData.description,
    selectedPermissions: mockRoleData.selectedPermissions,
  });
  const [originalData, setOriginalData] = useState<RoleFormData>(formData);
  const [errors, setErrors] = useState<Partial<RoleFormData>>({});
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [actionType, setActionType] = useState<string>("");
  const [roleStatus, setRoleStatus] = useState(mockRoleData.isActive);

  const stepLabels = ["Basic Information", "Permissions"];

  const validateBasicInfo = (): boolean => {
    const newErrors: Partial<RoleFormData> = {};

    if (!formData.roleName.trim()) {
      newErrors.roleName = "Role name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description must not exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePermissions = (): boolean => {
    const newErrors: Partial<RoleFormData> = {};

    if (formData.selectedPermissions.length === 0) {
      newErrors.selectedPermissions = [
        "At least one permission must be selected",
      ];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof RoleFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validateBasicInfo()) {
        setCurrentStep(2);
      } else {
        toast.error("Please fix the errors before continuing");
      }
    } else if (currentStep === 2) {
      if (validatePermissions()) {
        setDecisionOpen(true);
        setActionType("save-changes");
      } else {
        toast.error("Please select at least one permission");
      }
    }
  };

  const handleSaveChanges = () => {
    if (validateBasicInfo() && validatePermissions()) {
      setDecisionOpen(true);
      setActionType("save-changes");
    } else {
      toast.error("Please fix the errors before saving");
    }
  };

  const handleEditRole = () => {
    setIsEditing(true);
    setCurrentStep(1);
  };

  const handleDeactivateRole = () => {
    setDecisionOpen(true);
    setActionType("deactivate");
  };

  const handleReactivateRole = () => {
    setDecisionOpen(true);
    setActionType("reactivate");
  };

  const handleDeleteRole = () => {
    setDecisionOpen(true);
    setActionType("delete");
  };

  const handleDecisionConfirm = () => {
    setDecisionOpen(false);

    switch (actionType) {
      case "save-changes":
        // Simulate API call to save changes
        setTimeout(() => {
          setOriginalData(formData);
          setIsEditing(false);
          setConfirmationOpen(true);
          toast.success("Role updated successfully!");
        }, 500);
        break;
      case "deactivate":
        setTimeout(() => {
          setRoleStatus(false);
          setConfirmationOpen(true);
          toast.success("Role deactivated successfully!");
        }, 500);
        break;
      case "reactivate":
        setTimeout(() => {
          setRoleStatus(true);
          setConfirmationOpen(true);
          toast.success("Role reactivated successfully!");
        }, 500);
        break;
      case "delete":
        setTimeout(() => {
          navigate("/manage-roles");
          toast.success("Role deleted successfully!");
        }, 500);
        break;
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    if (actionType === "delete") {
      navigate("/manage-roles");
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      setFormData(originalData);
      setIsEditing(false);
      setErrors({});
    } else {
      navigate("/manage-roles");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

  const getDecisionDialogProps = () => {
    switch (actionType) {
      case "save-changes":
        return {
          title: "Save New Changes ?",
          description:
            "Are you sure, you want to Save new changes ? Kindly note that this new changes would override previous data.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Save Changes",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
      case "deactivate":
        return {
          title: "Deactivate Role ?",
          description: "Are you sure, you want to deactivate this Role ?",
          warningText:
            "Kindly note that this action, implies user with access to this role won't be able to impact this system as their access would default to view only or read-only access",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Deactivate Role",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
      case "reactivate":
        return {
          title: "Reactivate Role ?",
          description: "Are you sure, you want to Reactivate this Role ?",
          warningText:
            "Kindly note that this action, implies user with access to this role would now be able to access and impact this system vis-a-vis their associated permission.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Reactivate Role",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
      case "delete":
        return {
          title: "Delete Role ?",
          description: "Are you sure, you want to delete this user profile?",
          warningText:
            "Kindly note that this action, implies role access to the system would be permanently revoked hence, they won't be able to see nor manage roles and permissions.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Delete Profile",
            color: "#EF4444",
            action: handleDecisionConfirm,
          },
        };
      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to proceed?",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Confirm",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
    }
  };

  const getConfirmationDialogProps = () => {
    switch (actionType) {
      case "save-changes":
        return {
          title: "Role Updated",
          description: "Role has been successfully updated",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
      case "deactivate":
        return {
          title: "Role Deactivated",
          description: "Role has been successfully Deactivated",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
      case "reactivate":
        return {
          title: "Role Reactivated",
          description: "Role has been successfully Reactivated",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
      default:
        return {
          title: "Action Completed",
          description: "The action has been completed successfully",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
    }
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
          onClick={() => navigate("/manage-roles")}
          sx={{ color: "#667085", textDecoration: "none" }}
        >
          Manage Roles
        </Link>
        <Typography color="text.primary">View Role</Typography>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 500, color: "#101828", mb: 1 }}
            >
              View: Existing Role
            </Typography>
            <Typography variant="body2" sx={{ color: "#667085" }}>
              Manage role on the system with ease
            </Typography>
          </Box>
          <ActionMenu
            onSaveChanges={handleSaveChanges}
            onEditRole={handleEditRole}
            onDeactivateRole={handleDeactivateRole}
            onReactivateRole={handleReactivateRole}
            onDeleteRole={handleDeleteRole}
            isActive={roleStatus}
          />
        </Box>
      </Box>

      {/* Progress Indicator */}
      <div className="!space-y-8">
        <Box
          sx={{
            mb: 4,
            backgroundColor: "white",
            maxWidth: "800px",
            width: "100%",
            margin: "0 auto",
            borderRadius: "12px",
            p: 4,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Stepper activeStep={currentStep - 1} alternativeLabel>
            {stepLabels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form Card */}
        <form className="flex justify-center">
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 4,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#101828", mb: 3 }}
            >
              Add New Role
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {currentStep === 1 && (
                <>
                  {/* Role Name */}
                  <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-center border-b border-[#D0D5DD] pb-4">
                    <div className="">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#101828" }}
                      >
                        Role Name <span className="text-red-500">*</span>
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
                      placeholder="Enter role name"
                      value={formData.roleName}
                      onChange={(e) =>
                        handleInputChange("roleName", e.target.value)
                      }
                      error={!!errors.roleName}
                      helperText={errors.roleName}
                      disabled={!isEditing}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </Box>

                  {/* Description */}
                  <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-start border-b border-[#D0D5DD] pb-4">
                    <div className="">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#101828" }}
                      >
                        Description <span className="text-red-500">*</span>
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#667085", mb: 1, display: "block" }}
                      >
                        Enter description
                      </Typography>
                    </div>
                    <Box className="w-full">
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Enter role description"
                        value={formData.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                        error={!!errors.description}
                        helperText={
                          errors.description ||
                          "Not more than 1000 words counts"
                        }
                        disabled={!isEditing}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Permissions */}
                  <Box className="grid lg:grid-cols-[1fr_2fr] gap-4 items-start border-b border-[#D0D5DD] pb-4">
                    <div className="">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, color: "#101828" }}
                      >
                        Permission <span className="text-red-500">*</span>
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#667085", mb: 1, display: "block" }}
                      >
                        Select permissions.
                      </Typography>
                    </div>
                    <Box className="w-full">
                      <PermissionSelector
                        permissions={availablePermissions}
                        selectedPermissions={formData.selectedPermissions}
                        onPermissionChange={(permissions) =>
                          handleInputChange("selectedPermissions", permissions)
                        }
                      />
                      {errors.selectedPermissions && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#EF4444", mt: 1, display: "block" }}
                        >
                          {errors.selectedPermissions[0]}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </>
              )}
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
              {currentStep > 1 && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
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
                  Back
                </Button>
              )}
              {isEditing && (
                <Button
                  variant="contained"
                  onClick={handleContinue}
                  disabled={!hasChanges}
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#AD3291",
                    borderRadius: "8px",
                    padding: "8px 24px",
                    "&:hover": {
                      backgroundColor: "#92287A",
                    },
                    "&:disabled": {
                      backgroundColor: "#E5E7EB",
                      color: "#9CA3AF",
                    },
                  }}
                >
                  {currentStep === 1 ? "Continue" : "Save changes"}
                </Button>
              )}
            </Box>
          </Box>
        </form>
      </div>

      {/* Decision Card */}
      {decisionOpen && (
        <DecisionCard
          open={decisionOpen}
          onClose={() => setDecisionOpen(false)}
          {...getDecisionDialogProps()}
        />
      )}

      {/* Confirmation Card */}
      {confirmationOpen && (
        <ConfirmationCard
          open={confirmationOpen}
          onClose={handleConfirmationClose}
          {...getConfirmationDialogProps()}
        />
      )}
    </Box>
  );
}
