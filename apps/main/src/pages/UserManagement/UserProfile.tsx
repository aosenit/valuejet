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
import { useNavigate, useParams } from "react-router-dom";
import { DecisionCard, ConfirmationCard } from "../../components/DialogCards";
import UserActionMenu from "../../components/UserActionMenu";
import { toast } from "sonner";
import Pagination from "../../components/Pagination";
import { useFetchData, useDeleteData, usePatchData } from "../../hooks/useApis";
import UserProfileSkeletonLoader from "../../components/UserProfileSkeletonLoader";
import { useQueryClient } from "@tanstack/react-query";

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

export default function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId } = useParams<{ userId: string }>();

  const [tabValue, setTabValue] = useState(0);
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [actionType, setActionType] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(10);
  const [totalItems] = useState(100);
  const [itemsPerPage] = useState(10);

  // Fetch user data from API
  const {
    data: userResponse,
    isLoading,
    error,
  } = useFetchData(userId ? `users/${userId}` : null);

  // API mutations
  const activateUserMutation = usePatchData(`users/${userId}/activate`);
  const deactivateUserMutation = usePatchData(`users/${userId}/deactivate`);
  const deleteUserMutation = useDeleteData(`users`);

  const userData = userResponse?.data;
  const [userStatus, setUserStatus] = useState(
    userData?.status?.toLowerCase() === "active"
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    console.log(event, newValue);
  };

  const handleSaveChanges = () => {
    // Navigate to edit user page with user ID
    navigate(`/edit-user/${userId}`);
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

  const handleDecisionConfirm = async () => {
    try {
      switch (actionType) {
        case "deactivate":
          await deactivateUserMutation.mutateAsync({});
          await queryClient.invalidateQueries({
            queryKey: [`users/${userId}`],
          });
          await queryClient.invalidateQueries({ queryKey: ["users"] });
          setUserStatus(false);
          setDecisionOpen(false);
          setConfirmationOpen(true);
          toast.success("User deactivated successfully!");
          break;

        case "reactivate":
          await activateUserMutation.mutateAsync({});
          await queryClient.invalidateQueries({
            queryKey: [`users/${userId}`],
          });
          await queryClient.invalidateQueries({ queryKey: ["users"] });
          setUserStatus(true);
          setDecisionOpen(false);
          setConfirmationOpen(true);
          toast.success("User reactivated successfully!");
          break;

        case "delete":
          await deleteUserMutation.mutateAsync(userId);
          await queryClient.invalidateQueries({ queryKey: ["users"] });
          setDecisionOpen(false);
          toast.success("User deleted successfully!");
          navigate("/manage-users");
          break;
      }
    } catch (error) {
      console.error("Error performing action:", error);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to perform action. Please try again.";
      toast.error(errorMessage);
      setDecisionOpen(false);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    if (actionType === "delete") {
      navigate("/manage-users");
    }
  };

  const handleEditContact = () => {
    navigate(`/edit-user/${userId}`);
  };

  const getDecisionDialogProps = () => {
    const getLoadingState = () => {
      switch (actionType) {
        case "deactivate":
          return deactivateUserMutation.isPending;
        case "reactivate":
          return activateUserMutation.isPending;
        case "delete":
          return deleteUserMutation.isPending;
        default:
          return false;
      }
    };

    switch (actionType) {
      case "deactivate":
        return {
          title: "Deactivate User Profile ?",
          description:
            "Are you sure, you want to deactivate this User profile?",
          warningText:
            "Kindly note that this action implies user access to the system would be temporarily revoked hence, they won't be able to see nor manage customers.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Deactivate Profile",
            color: "#AD3291",
            action: () => {
              void handleDecisionConfirm();
            },
          },
          loading: getLoadingState(),
        };
      case "reactivate":
        return {
          title: "Reactivate User Profile ?",
          description: "Are you sure, you want to reactivate this User?",
          warningText:
            "Kindly note that this action implies user would now be able to access the system and see/manage customers with ease.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Reactivate Profile",
            color: "#AD3291",
            action: () => {
              void handleDecisionConfirm();
            },
          },
          loading: getLoadingState(),
        };
      case "delete":
        return {
          title: "Delete Profile ?",
          description: "Are you sure, you want to delete this user profile?",
          warningText:
            "Kindly note that this action implies user access to the system would be permanently revoked hence, they won't be able to see nor manage customers.",
          cancelButton: {
            text: "Cancel",
            color: "#AD3291",
            action: () => setDecisionOpen(false),
          },
          confirmButton: {
            text: "Delete Profile",
            color: "#EF4444",
            action: () => {
              void handleDecisionConfirm();
            },
          },
          loading: getLoadingState(),
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
            action: () => {
              void handleDecisionConfirm();
            },
          },
          loading: getLoadingState(),
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

  // Handle loading state
  if (isLoading) {
    return <UserProfileSkeletonLoader />;
  }

  // Handle error state
  if (error || !userData) {
    return (
      <Box sx={{ backgroundColor: "#F9F6F8", minHeight: "100vh", pb: 10 }}>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Error loading user profile
            </p>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : "User not found"}
            </p>
            <Button
              variant="contained"
              onClick={() => navigate("/manage-users")}
              sx={{ mt: 3, backgroundColor: "#AD3291" }}
            >
              Back to Users
            </Button>
          </div>
        </div>
      </Box>
    );
  }

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date: dateCreated, time: timeCreated } = formatDate(
    userData.created_at
  );

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
              {userData.firstname} {userData.lastname}
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
          Role: {userData.assigned_role || "N/A"}
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
                  {userData.firstname || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Last Name
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {userData.lastname || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Department
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {userData.department || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Date Created
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {dateCreated}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Time Created
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {timeCreated}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Assigned Role
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {userData.assigned_role || "N/A"}
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
                  {userData.email || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: "#667085", mb: 1 }}>
                  Phone Number
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {userData.phone_number || "N/A"}
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
                {userData.assigned_role || "N/A"}
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
                {userData.permissions && userData.permissions.length > 0 ? (
                  userData.permissions.map((permission: string) => (
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
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: "#667085" }}>
                    No permissions assigned
                  </Typography>
                )}
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
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                },
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
                {userData.activities && userData.activities.length > 0 ? (
                  userData.activities.map(
                    (activity: {
                      id: string;
                      date: string;
                      activityType: string;
                      description: string;
                    }) => (
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
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body2" sx={{ color: "#667085" }}>
                        No activities found for this user
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
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
