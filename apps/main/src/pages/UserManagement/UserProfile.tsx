import React, { useState } from "react";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import { NavigateNext, Search, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DecisionCard, ConfirmationCard } from "../../components/DialogCards";
import UserActionMenu from "../../components/UserActionMenu";
import { toast } from "sonner";
import Pagination from "../../components/Pagination";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Mock user data
const mockUserData = {
  id: "timipreye-oweikeme",
  firstName: "Timipreye",
  lastName: "Oweikeme",
  email: "timiowei@gmail.com",
  phone: "+234 905 544 4444",
  department: "Administrator",
  role: "System Admin",
  status: "Active",
  dateCreated: "July 2, 2025",
  timeCreated: "11:02 AM",
  permissions: [
    "Incident Management",
    "Customer Profile Management",
    "Escalation Management",
    "Department",
    "Audit Trail",
    "User Management",
    "Settings",
    "Notification",
  ],
};

// Mock activity data
const mockActivities = [
  {
    id: 1,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Profile created",
    description: "Fatima Yusuf created via KIU - Lagos to Abuja",
  },
  {
    id: 2,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Document upload",
    description: "Uploaded NIN.pdf for Chuka D.",
  },
  {
    id: 3,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Verification",
    description: "Phone verified for Temi T. (+2348012345671)",
  },
  {
    id: 4,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Merge complete",
    description: "Email for bukola@xmail.com failed",
  },
  {
    id: 5,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Flight activity",
    description: "Uche M. linked to Charles M. (Spouse)",
  },
  {
    id: 6,
    date: "Jan 25 2025, 11:06 AM",
    activityType: "Segment update",
    description: "Email for fabian@gmail.com success",
  },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [actionType, setActionType] = useState<string>("");
  const [userStatus, setUserStatus] = useState(
    mockUserData.status === "Active"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10);
  const [totalItems] = useState(100);
  const [itemsPerPage] = useState(10);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    console.log(event, newValue);
  };

  const handleSaveChanges = () => {
    setDecisionOpen(true);
    setActionType("save-changes");
  };

  const handleDeactivateUser = () => {
    setDecisionOpen(true);
    setActionType("deactivate");
  };

  const handleReactivateUser = () => {
    setDecisionOpen(true);
    setActionType("reactivate");
  };

  const handleDeleteUser = () => {
    setDecisionOpen(true);
    setActionType("delete");
  };

  const handleDecisionConfirm = () => {
    setDecisionOpen(false);

    switch (actionType) {
      case "save-changes":
        setTimeout(() => {
          setConfirmationOpen(true);
          toast.success("User updated successfully!");
        }, 500);
        break;
      case "deactivate":
        setTimeout(() => {
          setUserStatus(false);
          setConfirmationOpen(true);
          toast.success("User deactivated successfully!");
        }, 500);
        break;
      case "reactivate":
        setTimeout(() => {
          setUserStatus(true);
          setConfirmationOpen(true);
          toast.success("User reactivated successfully!");
        }, 500);
        break;
      case "delete":
        setTimeout(() => {
          navigate("/manage-users");
          toast.success("User deleted successfully!");
        }, 500);
        break;
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    if (actionType === "delete") {
      navigate("/manage-users");
    }
  };

  const handleEditContact = () => {
    navigate(`/edit-user/${mockUserData.id}`);
  };

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
          title: "Deactivate Officer Profile ?",
          description:
            "Are you sure, you want to deactivate this User profile >",
          warningText:
            "Kindly note that this action, implies user access to the system would be temporarily revoked hence, they won't be able to see nor manage customers.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Deactivate Profile",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
      case "reactivate":
        return {
          title: "Reactivate User Profile ?",
          description: "Are you sure, you want to reactivate this User ?",
          warningText:
            "Kindly note that this action, implies user would now be able to use access their system access and see/mange customers with ease.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Reactivate Profile",
            color: "#AD3291",
            action: handleDecisionConfirm,
          },
        };
      case "delete":
        return {
          title: "Delete Profile ?",
          description: "Are you sure, you want to delete this user profile?",
          warningText:
            "Kindly note that this action, implies user access to the system would be permanently revoked hence, they won't be able to see nor manage customers.",
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
          title: "User Updated",
          description: "User has been successfully updated",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
      case "deactivate":
        return {
          title: "User Deactivated",
          description: "User has been successfully Deactivated",
          button: {
            text: "Close",
            color: "#AD3291",
            action: handleConfirmationClose,
          },
        };
      case "reactivate":
        return {
          title: "User Reactivated",
          description: "User has been successfully Reactivated",
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
          onClick={() => navigate("/manage-users")}
          sx={{ color: "#667085", textDecoration: "none" }}
        >
          Manage User
        </Link>
        <Typography color="text.primary">User Profile</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box
        sx={{
          mb: 4,
          backgroundColor: "white",
          px: 4,
          py: 3,
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: "#101828" }}>
              {mockUserData.firstName} {mockUserData.lastName}
            </Typography>
            <Chip
              label={userStatus ? "Active" : "Inactive"}
              color={userStatus ? "success" : "default"}
              size="small"
              sx={{
                backgroundColor: userStatus ? "#10B981" : "#6B7280",
                color: "white",
                fontWeight: 500,
              }}
            />
          </Box>
          <UserActionMenu
            onSaveChanges={handleSaveChanges}
            onDeactivateUser={handleDeactivateUser}
            onReactivateUser={handleReactivateUser}
            onDeleteUser={handleDeleteUser}
            isActive={userStatus}
          />
        </Box>
        <Typography variant="body2" sx={{ color: "#667085", mt: 1 }}>
          Role: {mockUserData.role}
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ backgroundColor: "white", px: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="user profile tabs"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              color: "#667085",
              "&.Mui-selected": {
                color: "#AD3291",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#AD3291",
              height: 3,
            },
          }}
        >
          <Tab label="User Overview" />
          <Tab label="User Activity" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        {/* User Overview Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Basic Information */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 0,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#AD3291",
                mb: 0,
                backgroundColor: "#F4E4F0",
                p: 2,
              }}
            >
              Basic Information
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 3,
                p: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  First Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.firstName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Last Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.lastName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Department
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.department}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Date Created
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.dateCreated}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Time Created
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.timeCreated}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Assigned Role
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.role}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contact Information */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 0,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0,
                p: 2,
                fontWeight: 500,
                color: "#AD3291",
                backgroundColor: "#F4E4F0",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#AD3291" }}
              >
                Contact Information
              </Typography>
              <Button
                variant="text"
                onClick={handleEditContact}
                sx={{
                  color: "#AD3291",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Edit
              </Button>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 3,
                p: 2,
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.email}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {mockUserData.phone}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Status
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: userStatus ? "#10B981" : "#6B7280",
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {userStatus ? "Active" : "Inactive"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* User Role Permission */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 0,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                color: "#AD3291",
                mb: 0,
                backgroundColor: "#F4E4F0",
                p: 2,
              }}
            >
              User Role Permission
            </Typography>
            <Box sx={{ mb: 0, p: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {mockUserData.role}
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {mockUserData.permissions.map((permission) => (
                  <Chip
                    key={permission}
                    label={permission}
                    size="small"
                    sx={{
                      backgroundColor: "#F3F4F6",
                      color: "#374151",
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* User Activity Content */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "12px",
            p: 3,
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#101828", mb: 1 }}
          >
            User Activities
          </Typography>
          <Typography variant="body2" sx={{ color: "#667085", mb: 3 }}>
            Log of recent customer updates and actions.
          </Typography>

          {/* Search and Filter */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
            }}
          >
            <TextField
              placeholder="Search"
              size="small"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" sx={{ color: "#667085" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              sx={{
                textTransform: "none",
                borderColor: "#AD3291",
                color: "#AD3291",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "#AD3291",
                  backgroundColor: "#AD329110",
                },
              }}
            >
              Filter
            </Button>
          </Box>

          {/* Activities Table */}
          <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    Activity Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#374151" }}>
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell sx={{ color: "#6B7280" }}>
                      {activity.date}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {activity.activityType}
                    </TableCell>
                    <TableCell sx={{ color: "#6B7280" }}>
                      {activity.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </Box>
      </TabPanel>

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
