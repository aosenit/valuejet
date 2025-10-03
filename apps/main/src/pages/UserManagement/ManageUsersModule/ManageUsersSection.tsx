import { Box, Button, InputAdornment, TextField } from "@mui/material";
import {
  ChevronRight,
  DownloadCloud,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import { Sort } from "@mui/icons-material";
import ManageUsersEmptySate from "./ManageUsersEmptyStateComponent/ManageUsersEmptySate";
import { useState } from "react";
import { Link } from "react-router-dom";

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

// User Overview summary
const overview = [
  {
    title: "All Users",
    value: "1925",
    change: "+10.2% increase vs last 3 days",
    color: "border border-gray-300",
    icon: Users,
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-green-600",
    bg: "bg-gray-50",
  },
  {
    title: "Active Users",
    value: "1400",
    change: "+10.2% increase vs last 3 days",
    color: "border border-green-300",
    icon: UserRoundCheck,
    iconStyle: "bg-green-100 text-green-600",
    percentColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Inactive Users",
    value: "525",
    change: "+10.2% increase vs last 3 days",
    color: "border border-orange-300",
    icon: UserRoundMinus,
    iconStyle: "bg-orange-100 text-orange-600",
    percentColor: "text-orange-600",
    bg: "bg-orange-50",
  },
];

// User table data
const data = [
  {
    col1: "Timipreye Oweikeme",
    ident: "timiowei@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "System Admin",
    status: "Active",
  },
  {
    col1: "Rotimi Afolabi",
    ident: "rotimiafolabi@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "HR Manager",
    status: "Inactive",
  },
  {
    col1: "Greg Joshua",
    ident: "greg@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "C.S.O",
    status: "Inactive",
  },
  {
    col1: "Sonia Damola",
    ident: "sonia@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "Accountant",
    status: "Active",
  },
  {
    col1: "Damian Ramon",
    ident: "damian@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "Customer Service Agent",
    status: "Active",
  },
  {
    col1: "Simon Godswill",
    ident: "simon@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "Loyalty Program Officer",
    status: "Inactive",
  },
  {
    col1: "Stanley Williams",
    ident: "stanley@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "Account Manager",
    status: "Active",
  },
  {
    col1: "Olusegun Frank",
    ident: "olusegun@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "HR Officer",
    status: "Inactive",
  },
  {
    col1: "Caleb Eze",
    ident: "caleb@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "General Manager",
    status: "Inactive",
  },
  {
    col1: "Femi Folarin",
    ident: "femi@gmail.com",
    col2: "Jan 25 2025",
    date: "11:06 AM",
    col3: "09092331221",
    col4: "IT Support",
    status: "Active",
  },
];

function ManageUsersSection() {
  const [isEmpty, setIsEmpty] = useState(false);

  const handleFilled = () => {
    setIsEmpty(true);
  };

  return (
    <>
      {!isEmpty ? (
        <div className="">
          <ManageUsersEmptySate
            stats={{ allUsers: 0, activeUsers: 0, inactiveUsers: 0 }}
            onCreateUser={handleFilled}
            onExport={() => alert("No Users to Export ")}
            onFilter={() => alert("No Users to Filter ")}
            title="Manage Users"
            description="View and manage all users in the system."
            overviewTitle="User Overview"
            overviewDescription="Showing data for all Users in the system."
            tableTitle="All Users"
            tableDescription="A list of all users across various departments and assigned roles."
          />
        </div>
      ) : (
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
            <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium">
              Create New User +
            </button>
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
              {overview.map((card, index) => {
                // Split change into first word (+10.2%) and rest
                const [percent, ...rest] = card.change.split(" ");
                return (
                  <div
                    key={index}
                    className={`rounded-lg p-4 flex items-center justify-center ${card.color} ${card.bg}`}
                  >
                    <div className="rounded-lg flex flex-col w-full">
                      <span className="text-sm text-gray-500">
                        {card.title}
                      </span>
                      <span className="text-2xl font-semibold">
                        {card.value}
                      </span>
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
              <h1 className="text-xl font-semibold text-[#101828]">
                All Users
              </h1>
              <p className="text-sm text-[#667085]">
                A list of all users across various departments and assigned
                roles in the system.
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: "#667085" }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Filter Button */}
              <Button
                variant="outlined"
                endIcon={<Sort />}
                sx={{
                  textTransform: "none",
                  borderColor: "#AD3291",
                  color: "#AD3291",
                  borderRadius: "8px",
                  padding: "6px 24px",
                }}
                onClick={() => {
                  const menu = document.getElementById("filter-menu");
                  if (menu) {
                    menu.style.display =
                      menu.style.display === "none" ? "block" : "none";
                  }
                }}
              >
                Filter
                <div
                  id="filter-menu"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Status
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Phone Number
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Date
                    </button>
                  </div>
                </div>
              </Button>
              {/* Export Button */}
              <Button
                variant="contained"
                endIcon={<DownloadCloud />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#AD3291",
                  "&:hover": { backgroundColor: "#92287A" },
                  borderRadius: "8px",
                  padding: "6px 24px",
                }}
                onClick={() => {
                  const menu = document.getElementById("export-menu");
                  if (menu) {
                    menu.style.display =
                      menu.style.display === "none" ? "block" : "none";
                  }
                }}
              >
                Export
                <div
                  id="export-menu"
                  style={{
                    display: "none",
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    backgroundColor: "white",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    borderRadius: "4px",
                    zIndex: 1000,
                  }}
                >
                  <div className="py-1">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      CSV
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      PDF
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      JPEG
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      PNG
                    </button>
                  </div>
                </div>
              </Button>
            </Box>
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 text-[#667085] text-xs font-medium">
                  <th className="p-3 text-left">User Name</th>
                  <th className="p-3 text-left">Date Created</th>
                  <th className="p-3 text-left">Phone Number</th>
                  <th className="p-3 text-left">Assigned Role</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-[#101828] text-sm font-medium">
                          {item.col1}
                        </span>
                        <span className="text-[#667085] text-sm">
                          {item.ident}
                        </span>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="text-[#101828] text-sm font-medium">
                          {item.col2}
                        </span>
                        <span className="text-[#667085] text-sm">
                          {item.date}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-sm text-[#101828]">{item.col3}</td>
                    <td className="p-3 text-sm text-[#101828]">{item.col4}</td>

                    <td className="p-2">
                      <StatusPill status={item.status} />
                    </td>

                    <td className="p-3">
                      <Link to="/manage-users/user-profile">
                        <ChevronRight
                          size={16}
                          className="text-[#AD3291] bg-[#ef9fef] rounded-sm "
                        />
                      </Link>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageUsersSection;
