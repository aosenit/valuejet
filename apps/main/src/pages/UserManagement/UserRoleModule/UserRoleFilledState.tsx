import { Box, InputAdornment, TextField } from "@mui/material";
import { ChevronRight, Shield, Users, UserCheck } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import CustomExport from "../../../components/Export";
import CustomFilter from "../../../components/CustomFilter";
import OverviewCards from "../../../components/OverviewCards";
import { toast } from "sonner";

interface UserRoleFilledStateProps {
  onCreateUserRole: () => void;
}

// Role Overview summary
const overview = [
  {
    title: "All Roles",
    value: "32",
    change: "+10.2% increase vs last 3 days",
    color: "border border-gray-300",
    icon: Shield,
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-green-600",
    bg: "bg-gray-50",
  },
  {
    title: "Active Roles",
    value: "22",
    change: "+10.2% increase vs last 3 days",
    color: "border border-green-300",
    icon: UserCheck,
    iconStyle: "bg-green-100 text-green-600",
    percentColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Deactivated Roles",
    value: "12",
    change: "+10.2% increase vs last 3 days",
    color: "border border-orange-300",
    icon: Users,
    iconStyle: "bg-orange-100 text-orange-600",
    percentColor: "text-orange-600",
    bg: "bg-orange-50",
  },
];

// Role table data
const data = [
  {
    roleName: "System Admin",
    department: "Administrator",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "4",
  },
  {
    roleName: "HR Manager",
    department: "Human Resource",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "5",
  },
  {
    roleName: "Security Officer",
    department: "Security",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "14",
  },
  {
    roleName: "Accountant",
    department: "Finance",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "3",
  },
  {
    roleName: "Customer Service Agent",
    department: "Customer Service",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "8",
  },
  {
    roleName: "Loyalty Program Officer",
    department: "Marketing",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "2",
  },
  {
    roleName: "Campaign Manager",
    department: "Marketing",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "6",
  },
  {
    roleName: "HR Officer",
    department: "Human Resource",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "4",
  },
  {
    roleName: "General Manager",
    department: "Management",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "1",
  },
  {
    roleName: "IT Support",
    department: "Information Technology",
    dateCreated: "Jan 25 2025",
    timeCreated: "11:06 AM",
    numberOfUsers: "7",
  },
];

export default function UserRoleFilledState({
  onCreateUserRole,
}: UserRoleFilledStateProps) {
  console.log(onCreateUserRole);
  const filterOptions = [
    { label: "Department", value: "department" },
    { label: "Date Created", value: "date" },
    { label: "Number of Users", value: "users" },
    { label: "Role Name", value: "role" },
  ];

  const handleFilterSelect = (value: string) => {
    toast.success(`Filtered by: ${value}`);
    // Add your filter logic here
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            Manage User Roles
          </h1>
          <p className="text-sm text-[#667085]">
            View and manage all user roles in the system.
          </p>
        </div>
        <Link to="/create-role">
          <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Create New User Role +
          </button>
        </Link>
      </div>

      {/* Role Overview Cards */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 m-10">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            User Role Overview
          </h1>
          <p className="text-sm text-[#667085]">
            A snapshot of user role data.
          </p>
        </div>
        <OverviewCards cards={overview} />
      </div>

      {/* Roles Table */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] m-10 p-4 space-y-4">
        <div className="border-b border-[#F2DDED] pb-4">
          <h1 className="text-xl font-semibold text-[#101828]">
            All User Roles
          </h1>
          <p className="text-sm text-[#667085]">
            A list of all user roles and number of users in the system.
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

        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 text-[#667085] text-xs font-medium">
              <th className="p-3 text-left">Role Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Date Created</th>
              <th className="p-3 text-left">Number of Users</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="p-3">
                  <span className="text-[#101828] text-sm font-medium">
                    {item.roleName}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-[#101828] text-sm font-medium">
                    {item.department}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="text-[#101828] text-sm font-medium">
                      {item.dateCreated}
                    </span>
                    <span className="text-[#667085] text-sm">
                      {item.timeCreated}
                    </span>
                  </div>
                </td>
                <td className="p-3 text-sm text-[#101828]">
                  {item.numberOfUsers}
                </td>
                <td className="p-3">
                  <Link
                    to={`/view-role/${item.roleName.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <ChevronRight
                      size={16}
                      className="text-[#AD3291] bg-[#ef9fef] rounded-sm"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-sm text-[#667085]">
            Showing 1 to 10 of 32 results
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
              ← Previous
            </button>
            <div className="flex gap-1">
              <button className="px-3 py-1 text-sm bg-[#AD3291] text-white rounded">
                1
              </button>
              <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
                2
              </button>
              <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
                3
              </button>
              <span className="px-3 py-1 text-sm text-[#667085]">...</span>
              <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
                8
              </button>
              <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
                9
              </button>
              <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
                10
              </button>
            </div>
            <button className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291]">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
