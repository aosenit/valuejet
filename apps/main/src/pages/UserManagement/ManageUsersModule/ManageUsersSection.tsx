import {
  Box,
  InputAdornment,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  ChevronRight,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import ManageUsersEmptySate from "./ManageUsersEmptyStateComponent/ManageUsersEmptySate";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import CustomExport from "../../../components/Export";
import CustomFilter from "../../../components/CustomFilter";
import { toast } from "sonner";
import { useFetchData } from "../../../hooks/useApis";
import {
  UserTableSkeletonLoader,
  OverviewCardsSkeletonLoader,
} from "../../../components/TableSkeletonLoader";
import Pagination from "../../../components/Pagination";

// StatusPill component for Active/Inactive badges
const StatusPill = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return {
          pill: "bg-green-100 text-green-800",
          dot: "bg-green-500",
        };
      case "inactive":
        return {
          pill: "bg-orange-100 text-[#B54708]",
          dot: "bg-orange-500",
        };
      default:
        return {
          pill: "bg-gray-100 text-gray-800",
          dot: "bg-gray-400",
        };
    }
  };

  const { pill, dot } = getStatusStyles(status);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${pill}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${dot}`}></span>
      {status}
    </span>
  );
};

// User interface
interface User {
  uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  assigned_role: string;
  status: string;
  created_at: string;
}

function ManageUsersSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const itemsPerPage = 10;

  // Fetch users from API
  const { data: usersResponse, isLoading, error } = useFetchData("users");

  // Extract users data and calculate stats
  const users: User[] = usersResponse?.data || [];
  const totalUsers = users.length;
  const activeUsers = users.filter(
    (u) => u.status?.toLowerCase() === "active"
  ).length;
  const inactiveUsers = users.filter(
    (u) => u.status?.toLowerCase() === "inactive"
  ).length;

  // Calculate pagination
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Overview data
  const overview = useMemo(
    () => [
      {
        title: "All Users",
        value: totalUsers.toString(),
        change: "+10.2% increase vs last 3 days",
        color: "border border-gray-300",
        icon: Users,
        iconStyle: "bg-gray-100 text-gray-600",
        percentColor: "text-green-600",
        bg: "bg-gray-50",
      },
      {
        title: "Active Users",
        value: activeUsers.toString(),
        change: "+10.2% increase vs last 3 days",
        color: "border border-green-300",
        icon: UserRoundCheck,
        iconStyle: "bg-green-100 text-green-600",
        percentColor: "text-green-600",
        bg: "bg-green-50",
      },
      {
        title: "Inactive Users",
        value: inactiveUsers.toString(),
        change: "+10.2% increase vs last 3 days",
        color: "border border-orange-300",
        icon: UserRoundMinus,
        iconStyle: "bg-orange-100 text-orange-600",
        percentColor: "text-orange-600",
        bg: "bg-orange-50",
      },
    ],
    [totalUsers, activeUsers, inactiveUsers]
  );

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.user_uuid));
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const filterOptions = [
    { label: "Status", value: "status" },
    { label: "Phone Number", value: "phone" },
    { label: "Date", value: "date" },
    { label: "Role", value: "role" },
  ];

  const handleFilterSelect = (value: string) => {
    toast.success(`Filtered by: ${value}`);
    // Add your filter logic here
  };

  // Handle error state
  if (error) {
    return (
      <div className="space-y-6 bg-[#F9F6F8] pb-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 text-lg font-semibold mb-2">
              Error loading users
            </p>
            <p className="text-gray-600">
              {error instanceof Error
                ? error.message
                : "Please try again later"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (isLoading) {
    return (
      <div className="space-y-6 bg-[#F9F6F8] pb-10">
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Manage Users
            </h1>
            <p className="text-sm text-[#667085]">
              View and manage all users in the system.
            </p>
          </div>
        </div>

        {/* Loading Skeletons */}
        <OverviewCardsSkeletonLoader />
        <UserTableSkeletonLoader />
      </div>
    );
  }

  // Handle empty state
  if (totalUsers === 0) {
    return (
      <div className="">
        <ManageUsersEmptySate
          stats={{ allUsers: 0, activeUsers: 0, inactiveUsers: 0 }}
          onCreateUser={() => {}}
          onExport={() => toast.warning("No User to Export")}
          onFilter={() => toast.warning("No User to Filter")}
          title="Manage Users"
          description="View and manage all users in the system."
          overviewTitle="User Overview"
          overviewDescription="Showing data for all Users in the system."
          tableTitle="All Users"
          tableDescription="A list of all users across various departments and assigned roles."
        />
      </div>
    );
  }

  // Render users table
  return (
    <>
      (
      <div className="space-y-6 bg-[#F9F6F8] pb-10">
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD] ">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Manage Users
            </h1>
            <p className="text-sm text-[#667085]">
              View and manage all users in the system.
            </p>
          </div>
          <Link to="/create-user">
            <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium">
              Create New User +
            </button>
          </Link>
        </div>

        {/* User Overview Cards */}
        <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 m-10">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              User Overview
            </h1>
            <p className="text-sm text-[#667085]">
              Showing data for all Users in the system.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {overview.map((card) => {
              // Split change into first word (+10.2%) and rest
              const [percent, ...rest] = card.change.split(" ");
              return (
                <div
                  key={card.title}
                  className={`rounded-lg p-4 flex items-center justify-center ${card.color} ${card.bg}`}
                >
                  <div className="rounded-lg flex flex-col w-full">
                    <span className="text-sm text-gray-500">{card.title}</span>
                    <span className="text-2xl font-semibold">{card.value}</span>
                    <span className="mt-2 text-xs">
                      <span className={`${card.percentColor} font-medium`}>
                        {percent}
                      </span>{" "}
                      {rest.join(" ")}
                    </span>
                  </div>
                  <span
                    className={`p-2 rounded-md ${card.iconStyle} flex items-center justify-center`}
                  >
                    <card.icon size={20} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] m-10 p-4 space-y-4">
          <div className="border-b border-[#F2DDED] pb-4">
            <h1 className="text-xl font-semibold text-[#101828]">All Users</h1>
            <p className="text-sm text-[#667085]">
              A list of all users across various departments and assigned roles
              in the system.
            </p>
          </div>

          <Box display="flex" alignItems="center" gap={2}>
            {/* Search Input */}
            <TextField
              variant="outlined"
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
                      <SearchIcon fontSize="small" sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            {/* Filter Button */}
            <CustomFilter
              filterOptions={filterOptions}
              onFilterSelect={handleFilterSelect}
            />
            {/* Export Button */}
            <CustomExport />
          </Box>
          <TableContainer
            sx={{
              border: 1,
              borderColor: "#E5E7EB",
              borderRadius: 1,
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#F9FAFB" }}>
                <TableRow>
                  <TableCell sx={{ width: "48px" }}>
                    <Checkbox
                      checked={
                        selectedUsers.length === paginatedUsers.length &&
                        paginatedUsers.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                  >
                    User Name
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                  >
                    Date Created
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                  >
                    Phone Number
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                  >
                    Assigned Role
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                  >
                    Status
                  </TableCell>
                  <TableCell sx={{ width: "48px" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => {
                  const { date, time } = formatDate(user.created_at);
                  return (
                    <TableRow key={user.user_uuid}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.user_uuid)}
                          onChange={() => handleUserSelect(user.user_uuid)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-[#101828] text-sm font-medium">
                            {user.firstname} {user.lastname}
                          </span>
                          <span className="text-[#667085] text-sm">
                            {user.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-[#101828] text-sm font-medium">
                            {date}
                          </span>
                          <span className="text-[#667085] text-sm">{time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#101828] text-sm font-medium">
                          {user.phone_number || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-[#101828] text-sm font-medium">
                          {user.assigned_role || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusPill status={user.status || "Inactive"} />
                      </TableCell>
                      <TableCell>
                        <Link to={`/user-profile/${user.uuid}`}>
                          <IconButton size="small" sx={{ color: "#9333EA" }}>
                            <ChevronRight
                              size={16}
                              className="text-[#AD3291] bg-[#ef9fef] rounded-sm "
                            />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalUsers}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
}

export default ManageUsersSection;
