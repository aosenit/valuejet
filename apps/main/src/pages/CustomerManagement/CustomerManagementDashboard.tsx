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
  Chip,
  IconButton,
} from "@mui/material";
import {
  Search,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import CustomExport from "../../components/Export";
import OverviewCards from "../../components/OverviewCards";
import Pagination from "../../components/Pagination";
import {
  IconUsers,
  IconUserPlus,
  IconUserCheck,
  IconUserX,
  IconUsersGroup,
  IconList,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// Mock data
const overviewData = [
  {
    title: "Total Customers",
    value: "34,240",
    change: "+10.2% increase vs last 3 days",
    icon: IconUsers,
    color: "border border-gray-300",
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-green-600",
    bg: "bg-gray-50",
  },
  {
    title: "New Profiles",
    value: "235",
    change: "+5.8% increase vs last 3 days",
    icon: IconUserPlus,
    color: "border border-blue-300",
    iconStyle: "bg-blue-100 text-blue-600",
    percentColor: "text-green-600",
    bg: "bg-blue-50",
  },
  {
    title: "Active Profiles",
    value: "29,731",
    change: "+8.3% increase vs last 3 days",
    icon: IconUserCheck,
    color: "border border-green-300",
    iconStyle: "bg-green-100 text-green-600",
    percentColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Inactive Profiles",
    value: "14,288",
    change: "-2.1% decrease vs last 3 days",
    icon: IconUserX,
    color: "border border-red-300",
    iconStyle: "bg-red-100 text-red-600",
    percentColor: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Duplicate Profiles",
    value: "2,521",
    change: "+3.4% increase vs last 3 days",
    icon: IconUsersGroup,
    color: "border border-violet-300",
    iconStyle: "bg-violet-100 text-violet-600",
    percentColor: "text-green-600",
    bg: "bg-violet-50",
  },
  {
    title: "Total Segments",
    value: "10",
    change: "+0.0% no change vs last 3 days",
    icon: IconList,
    color: "border border-gray-300",
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-gray-600",
    bg: "bg-gray-50",
  },
];

const customerData = [
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Kehinde Lawal",
    email: "kehinde@gmail.com",
    segment: "Flight Behaviour",
    status: "Active",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Daniel Wale",
    email: "daniel@gmail.com",
    segment: "Spending Patterns",
    status: "Inactive",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Erica Olumide",
    email: "erica@gmail.com",
    segment: "Loyalty Program",
    status: "Inactive",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Hassan Taiwo",
    email: "hassan@gmail.com",
    segment: "Flight Behaviour",
    status: "Active",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Ali Abdulkareen",
    email: "ali@gmail.com",
    segment: "Spending Patterns",
    status: "Active",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Fortune Okoro",
    email: "fortune@gmail.com",
    segment: "Flight Behaviour",
    status: "Active",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Marchi Chukwu",
    email: "marchi@gmail.com",
    segment: "Demographics",
    status: "Active",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Wande Salami",
    email: "wande@gmail.com",
    segment: "Incident Activities",
    status: "Inactive",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Dipo Adebola",
    email: "dipo@gmail.com",
    segment: "Flight Behaviour",
    status: "Inactive",
  },
  {
    id: "VJ1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Bolimi Souza",
    email: "bolimi@gmail.com",
    segment: "Spending Patterns",
    status: "Inactive",
  },
];

const growthData = [
  { month: "Jan", profiles: 250 },
  { month: "Feb", profiles: 320 },
  { month: "Mar", profiles: 450 },
  { month: "Apr", profiles: 480 },
  { month: "May", profiles: 520 },
  { month: "Jun", profiles: 580 },
  { month: "Jul", profiles: 620 },
  { month: "Aug", profiles: 680 },
  { month: "Sep", profiles: 720 },
  { month: "Oct", profiles: 780 },
  { month: "Nov", profiles: 820 },
  { month: "Dec", profiles: 890 },
];

const segmentData = [
  {
    name: "Flight Behaviour",
    value: 832,
    color: "#AD3291",
    fill: "#AD3291",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-700",
  },
  {
    name: "Spending Patterns",
    value: 789,
    color: "#10B981",
    fill: "#10B981",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    textColor: "text-green-700",
  },
  {
    name: "Loyalty Programs",
    value: 729,
    color: "#F59E0B",
    fill: "#F59E0B",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-300",
    textColor: "text-orange-700",
  },
  {
    name: "Demographics",
    value: 893,
    color: "#3B82F6",
    fill: "#3B82F6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
  },
  {
    name: "Incident Activities",
    value: 736,
    color: "#06B6D4",
    fill: "#06B6D4",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-300",
    textColor: "text-teal-700",
  },
];

const activitiesData = [
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Kehinde Lawal",
    email: "kehinde@gmail.com",
    activityType: "Profile created",
    description: "Fatima Yusuf created via KIU - Lagos to Abuja",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Daniel Wale",
    email: "daniel@gmail.com",
    activityType: "Document upload",
    description: "Uploaded NIN.pdf for Chuka D.",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Erica Olumide",
    email: "erica@gmail.com",
    activityType: "Verification",
    description: "Phone verified for Temi T. (+2348012345671)",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Hassan Taiwo",
    email: "hassan@gmail.com",
    activityType: "Merge complete",
    description: "Davell & L David merged by Admin-Lois",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Ali Abdulkareen",
    email: "ali@gmail.com",
    activityType: "Flight activity",
    description: "Akai G. booked PNR - LOS",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Fortune Okoro",
    email: "fortune@gmail.com",
    activityType: "Segment update",
    description: "James A. added to Transport Payco",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Marchi Chukwu",
    email: "marchi@gmail.com",
    activityType: "Verification",
    description: "Email for outbay@gmail.com failed",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Wande Salami",
    email: "wande@gmail.com",
    activityType: "Relationship Mapping",
    description: "Lorna M. linked to Charles M. (Spouse)",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Dipo Adebola",
    email: "dipo@gmail.com",
    activityType: "Relationship Mapping",
    description: "Maureen Dike linked to Ugonna Dike (Spouse)",
  },
  {
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Bolimi Souza",
    email: "bolimi@gmail.com",
    activityType: "Verification",
    description: "Email for fabian@gmail.com success",
  },
];

// Filter options for customer list
const filterOptions = [
  { label: "All Customers", value: "all" },
  { label: "Active Customers", value: "active" },
  { label: "Inactive Customers", value: "inactive" },
  { label: "New This Month", value: "new" },
  { label: "By Segment", value: "segment" },
];

// Filter options for activities
const activityFilterOptions = [
  { label: "All Activities", value: "all" },
  { label: "Profile Created", value: "profile_created" },
  { label: "Document Upload", value: "document_upload" },
  { label: "Verification", value: "verification" },
  { label: "Flight Activity", value: "flight_activity" },
];

export default function CustomerDashboard() {
  const [dateFilter, setDateFilter] = useState("Last 12 Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customerData.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customerData.map((customer) => customer.id));
    }
  };

  const handleFilterSelect = (value: string) => {
    // Handle filter selection logic here
    console.log("Filter selected:", value);
  };

  const handleActivityFilterSelect = (value: string) => {
    // Handle activity filter selection logic here
    console.log("Activity filter selected:", value);
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">Dashboard</h1>
          <p className="text-sm text-[#667085]">
            Overview of customer profiles, activities and key metrics.
          </p>
        </div>
      </div>

      {/* Overview Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">Overview</h1>
            <p className="text-sm text-[#667085]">
              This gives a concise overview of customer profiles
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
              <MenuItem value="Last 12 Month">Last 12 Month</MenuItem>
              <MenuItem value="Last 6 Month">Last 6 Month</MenuItem>
              <MenuItem value="Last 3 Month">Last 3 Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
            </Select>
          </FormControl>
        </div>
        <OverviewCards cards={overviewData} />
      </div>

      {/* Customer List Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="border-b border-[#F2DDED] pb-4">
          <h1 className="text-xl font-semibold text-[#101828]">
            Customer List
          </h1>
          <p className="text-sm text-[#667085]">
            A list of all onboarded customers in the system.
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
                    checked={selectedCustomers.length === customerData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Customer ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Segments
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
              {customerData.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => handleCustomerSelect(customer.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{customer.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {customer.date}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {customer.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {customer.name}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {customer.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.segment}
                      size="small"
                      variant="outlined"
                      color="default"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status}
                      size="small"
                      color={
                        customer.status === "Active" ? "success" : "warning"
                      }
                      icon={
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor:
                              customer.status === "Active"
                                ? "#10B981"
                                : "#F59E0B",
                          }}
                        />
                      }
                    />
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
      </div>

      {/* Trend Analysis: Customer Growth */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Trend Analysis:{" "}
              <span className="text-[#9333EA]">Customer Growth</span>
            </h1>
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
              <MenuItem value="Last 12 Month">Last 12 Month</MenuItem>
              <MenuItem value="Last 6 Month">Last 6 Month</MenuItem>
              <MenuItem value="Last 3 Month">Last 3 Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#9333EA]"></div>
          <span className="text-sm text-gray-600">Total Profiles Created</span>
          <span className="text-sm font-semibold">34240</span>
        </div>

        <div style={{ height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="profiles"
                stroke="#9333EA"
                strokeWidth={2}
                dot={{ fill: "#9333EA", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Analysis: Segment Distribution */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Trend Analysis:{" "}
              <span className="text-[#9333EA]">Segment Distribution</span>
            </h1>
            <p className="text-sm text-[#667085]">
              View and analyse how customers are grouped across key segments for
              better targeting.
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
              <MenuItem value="Last 12 Month">Last 12 Month</MenuItem>
              <MenuItem value="Last 6 Month">Last 6 Month</MenuItem>
              <MenuItem value="Last 3 Month">Last 3 Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Segment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {segmentData.map((segment) => (
            <div
              key={segment.name}
              className={`rounded-lg p-4 border ${
                segment.color === "#AD3291"
                  ? "border-purple-500 bg-purple-50"
                  : segment.color === "#10B981"
                    ? "border-green-500 bg-green-50"
                    : segment.color === "#F59E0B"
                      ? "border-orange-500 bg-orange-50"
                      : segment.color === "#3B82F6"
                        ? "border-blue-500 bg-blue-50"
                        : "border-teal-500 bg-teal-50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.fill }}
                ></div>
                <span
                  className="text-sm font-medium"
                  style={{ color: segment.color }}
                >
                  {segment.name}
                </span>
              </div>
              <h3
                className="text-2xl font-bold"
                style={{ color: segment.color }}
              >
                {segment.value}
              </h3>
            </div>
          ))}
        </div>

        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={segmentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={{ stroke: "#E5E7EB" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={{ stroke: "#E5E7EB" }}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                labelStyle={{ color: "#374151", fontWeight: "600" }}
                formatter={(value: number) => [value, "Users"]}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {segmentData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Recent Activities
            </h1>
            <p className="text-sm text-[#667085]">
              Live feeds of recent customer updates and actions.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CustomFilter
              filterOptions={activityFilterOptions}
              onFilterSelect={handleActivityFilterSelect}
            />
            <Button
              endIcon={<KeyboardArrowRight />}
              variant="contained"
              sx={{ backgroundColor: "#9333EA" }}
            >
              View More
            </Button>
          </div>
        </div>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{
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
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Customer
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Activity Type
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activitiesData.map((activity) => (
                <TableRow key={`${activity.name}-${activity.date}`}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#667085] text-sm">
                        {activity.date}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {activity.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {activity.name}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {activity.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {activity.activityType}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#667085] text-sm">
                      {activity.description}
                    </span>
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
