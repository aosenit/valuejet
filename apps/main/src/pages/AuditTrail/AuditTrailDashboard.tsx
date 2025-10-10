import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
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
  Search,
  KeyboardArrowDown,
  KeyboardArrowRight,
  Warning,
} from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import Pagination from "../../components/Pagination";

// Mock data
const auditLogsData = [
  {
    id: "1",
    date: "Jan 25 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Incident Mgt.",
  },
  {
    id: "2",
    date: "Jan 25 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Customer Mgt.",
  },
  {
    id: "3",
    date: "Jan 25 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Escalation Mgt.",
  },
  {
    id: "4",
    date: "Jan 25 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Department",
  },
  {
    id: "5",
    date: "Jan 24 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Department",
  },
  {
    id: "6",
    date: "Jan 23 2025",
    time: "11:00 AM",
    user: "Olivia Rhye",
    userEmail: "olivia@untitledui.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
    affectedModule: "Department",
  },
  {
    id: "7",
    date: "Jan 22 2025",
    time: "10:30 AM",
    user: "Isaac Sikiru",
    userEmail: "isaac@untitledui.com",
    lastModified: "Jan 22 2025",
    lastModifiedTime: "10:35 AM",
    affectedModule: "User Management",
  },
  {
    id: "8",
    date: "Jan 21 2025",
    time: "09:15 AM",
    user: "Sarah Johnson",
    userEmail: "sarah@untitledui.com",
    lastModified: "Jan 21 2025",
    lastModifiedTime: "09:20 AM",
    affectedModule: "Knowledge Base",
  },
  {
    id: "9",
    date: "Jan 20 2025",
    time: "08:45 AM",
    user: "Michael Chen",
    userEmail: "michael@untitledui.com",
    lastModified: "Jan 20 2025",
    lastModifiedTime: "08:50 AM",
    affectedModule: "Approval Workflow",
  },
  {
    id: "10",
    date: "Jan 19 2025",
    time: "07:30 AM",
    user: "Emily Davis",
    userEmail: "emily@untitledui.com",
    lastModified: "Jan 19 2025",
    lastModifiedTime: "07:35 AM",
    affectedModule: "General Settings",
  },
];

// Filter options
const filterOptions = [
  { label: "All Logs", value: "all" },
  { label: "By User", value: "user" },
  { label: "By Module", value: "module" },
  { label: "By Date Range", value: "date_range" },
  { label: "By Action Type", value: "action_type" },
];

export default function AuditTrailDashboard() {
  const [dateFilter, setDateFilter] = useState("Last 12 Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleLogSelect = (logId: string) => {
    setSelectedLogs((prev) =>
      prev.includes(logId)
        ? prev.filter((id) => id !== logId)
        : [...prev, logId]
    );
  };

  const handleSelectAll = () => {
    if (selectedLogs.length === auditLogsData.length) {
      setSelectedLogs([]);
    } else {
      setSelectedLogs(auditLogsData.map((log) => log.id));
    }
  };

  const handleFilterSelect = (value: string) => {
    console.log("Filter selected:", value);
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">Audit Trail</h1>
          <p className="text-sm text-[#667085]">
            Track and review user actions, changes, and system events to ensure
            accountability and transparency.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">Overview</h1>
            <p className="text-sm text-[#667085]">
              Get a summary of all audit logs.
            </p>
          </div>
          <FormControl sx={{ width: 200 }}>
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              displayEmpty
              IconComponent={KeyboardArrowDown}
              sx={{
                "& .MuiSelect-select": {
                  padding: "12px 14px",
                },
              }}
            >
              <MenuItem value="Last 12 Month">Date: Last 12 Month</MenuItem>
              <MenuItem value="Last 6 Month">Date: Last 6 Month</MenuItem>
              <MenuItem value="Last 3 Month">Date: Last 3 Month</MenuItem>
              <MenuItem value="Last Month">Date: Last Month</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Overview Metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Logged Actions
                </h3>
                <p className="text-sm text-gray-600">
                  All system activities tracked
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-gray-900">1925</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Warning fontSize="small" sx={{ color: "#DC2626" }} />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">
                  25 + unauthorised attempt on your system
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Warning fontSize="small" sx={{ color: "#EA580C" }} />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">
                  +5% Incident logged so far
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Warning fontSize="small" sx={{ color: "#16A34A" }} />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">
                  Incident resolved increased by + 3.5% vs last month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Audit Logs Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              All Audit Logs
            </h1>
            <p className="text-sm text-[#667085]">
              View a detailed record of all user and system activities for
              traceability and compliance.
            </p>
          </div>
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
                    <Search fontSize="small" sx={{ color: "#667085" }} />
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
                    checked={selectedLogs.length === auditLogsData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Date & Time
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  User
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Last Modified
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Affected Module
                </TableCell>
                <TableCell sx={{ width: "48px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogsData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedLogs.includes(log.id)}
                      onChange={() => handleLogSelect(log.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {log.date}
                      </span>
                      <span className="text-[#667085] text-sm">{log.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {log.user}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {log.userEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {log.lastModified}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {log.lastModifiedTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      • {log.affectedModule}
                    </span>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: "#9333EA" }}>
                      <KeyboardArrowRight />
                    </IconButton>
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
      </div>
    </div>
  );
}
