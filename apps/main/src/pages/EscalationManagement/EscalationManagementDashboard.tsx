import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
} from "@mui/material";
import { Search, KeyboardArrowDown, Edit } from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import CustomExport from "../../components/Export";
import OverviewCards from "../../components/OverviewCards";
import Pagination from "../../components/Pagination";
import { IconList, IconCheck, IconClock } from "@tabler/icons-react";

// Mock data
const overviewData = [
  {
    title: "Total Escalation Rules",
    value: "1925",
    change: "+10.2% increase vs last 3 days",
    icon: IconList,
    color: "border border-gray-300",
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-green-600",
    bg: "bg-gray-50",
  },
  {
    title: "Active Escalation",
    value: "1200",
    change: "+8.5% increase vs last 3 days",
    icon: IconCheck,
    color: "border border-green-300",
    iconStyle: "bg-green-100 text-green-600",
    percentColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Inactive Escalation",
    value: "725",
    change: "+2.1% increase vs last 3 days",
    icon: IconClock,
    color: "border border-orange-300",
    iconStyle: "bg-orange-100 text-orange-600",
    percentColor: "text-orange-600",
    bg: "bg-orange-50",
  },
];

const escalationRulesData = [
  {
    id: "1234",
    ruleName: "Flight Delay",
    customerName: "Kehinde Lawal",
    customerEmail: "kehinde@gmail.com",
    status: "Inactive",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1235",
    ruleName: "Baggage Lost",
    customerName: "Daniel Wale",
    customerEmail: "daniel@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1236",
    ruleName: "Refund Request",
    customerName: "Erica Olumide",
    customerEmail: "erica@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1237",
    ruleName: "Customer Complaint",
    customerName: "Hassan Taiwo",
    customerEmail: "hassan@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1238",
    ruleName: "Missed Connection",
    customerName: "Ali Abdulkareen",
    customerEmail: "ali@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1239",
    ruleName: "Frequent Flyer Dispute",
    customerName: "Fortune Okoro",
    customerEmail: "fortune@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1240",
    ruleName: "Ticketing Error",
    customerName: "Marchi Chukwu",
    customerEmail: "marchi@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1241",
    ruleName: "In-Flight Service Complaint",
    customerName: "Wande Salami",
    customerEmail: "wande@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1242",
    ruleName: "Check-in System Outage",
    customerName: "Dipo Adebola",
    customerEmail: "dipo@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1243",
    ruleName: "Post-Resolution CSAT Below 3",
    customerName: "Bolimi Souza",
    customerEmail: "bolimi@gmail.com",
    status: "Active",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
];

// Filter options
const filterOptions = [
  { label: "All Rules", value: "all" },
  { label: "Active Rules", value: "active" },
  { label: "Inactive Rules", value: "inactive" },
  { label: "By Rule Name", value: "rule_name" },
  { label: "By Customer", value: "customer" },
];

export default function EscalationManagementDashboard() {
  const [dateFilter, setDateFilter] = useState("Last 12 Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleRuleSelect = (ruleId: string) => {
    setSelectedRules((prev) =>
      prev.includes(ruleId)
        ? prev.filter((id) => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRules.length === escalationRulesData.length) {
      setSelectedRules([]);
    } else {
      setSelectedRules(escalationRulesData.map((rule) => rule.id));
    }
  };

  const handleFilterSelect = (value: string) => {
    console.log("Filter selected:", value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            Escalation Management
          </h1>
          <p className="text-sm text-[#667085]">
            View and manage all configured escalation rules for incident
            handling and SLA monitoring.
          </p>
        </div>
        <Button variant="contained">Configure New Escalation</Button>
      </div>

      {/* Overview Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">Overview</h1>
            <p className="text-sm text-[#667085]">
              Get a summary of active escalation rules, trigger conditions, and
              escalation performance.
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
        <OverviewCards cards={overviewData} />
      </div>

      {/* All Escalation Rules Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              All Escalation Rules
            </h1>
            <p className="text-sm text-[#667085]">
              View and manage all configured escalation rules for incident
              handling and SLA monitoring.
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
                      selectedRules.length === escalationRulesData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Escalation ID
                  <KeyboardArrowDown fontSize="small" sx={{ ml: 0.5 }} />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Rule Name
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Last Modified
                </TableCell>
                <TableCell sx={{ width: "48px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {escalationRulesData.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRules.includes(rule.id)}
                      onChange={() => handleRuleSelect(rule.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{rule.id}</TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {rule.ruleName}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {rule.customerName}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {rule.customerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rule.status)}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${getStatusDotColor(rule.status)}`}
                      ></span>
                      {rule.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {rule.lastModified}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {rule.lastModifiedTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" sx={{ color: "#9333EA" }}>
                      <Edit fontSize="small" />
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
