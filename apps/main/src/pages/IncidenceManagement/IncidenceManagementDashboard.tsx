import { useState } from "react";
import {
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
import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  Download,
  Add,
} from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import OverviewCards from "../../components/OverviewCards";
import Pagination from "../../components/Pagination";
import {
  IconList,
  IconCheck,
  IconMessageCircle,
  IconClock,
  IconThumbUp,
  IconMoodNeutral,
  IconThumbDown,
} from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock data
const overviewData = [
  {
    title: "Total Incidents",
    value: "1925",
    change: "+10.2% increase vs last 3 days",
    icon: IconList,
    color: "border border-gray-300",
    iconStyle: "bg-gray-100 text-gray-600",
    percentColor: "text-green-600",
    bg: "bg-gray-50",
  },
  {
    title: "Resolved Incidents",
    value: "1200",
    change: "+8.5% increase vs last 3 days",
    icon: IconCheck,
    color: "border border-green-300",
    iconStyle: "bg-green-100 text-green-600",
    percentColor: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Open Incidents",
    value: "725",
    change: "+2.1% increase vs last 3 days",
    icon: IconMessageCircle,
    color: "border border-blue-300",
    iconStyle: "bg-blue-100 text-blue-600",
    percentColor: "text-green-600",
    bg: "bg-blue-50",
  },
  {
    title: "Avg. Resolution Time",
    value: "20 mins",
    change: "-5.3% decrease vs last 3 days",
    icon: IconClock,
    color: "border border-yellow-300",
    iconStyle: "bg-yellow-100 text-yellow-600",
    percentColor: "text-green-600",
    bg: "bg-yellow-50",
  },
];

const trendData = [
  { month: "Jan", received: 200, solved: 180 },
  { month: "Feb", received: 250, solved: 220 },
  { month: "Mar", received: 300, solved: 280 },
  { month: "Apr", received: 280, solved: 260 },
  { month: "May", received: 320, solved: 300 },
  { month: "Jun", received: 350, solved: 320 },
  { month: "Jul", received: 380, solved: 350 },
  { month: "Aug", received: 400, solved: 380 },
  { month: "Sep", received: 420, solved: 400 },
  { month: "Oct", received: 450, solved: 430 },
  { month: "Nov", received: 480, solved: 460 },
  { month: "Dec", received: 500, solved: 480 },
];

const categoryData = [
  { name: "Type A", value: 72, color: "#10B981" },
  { name: "Type B", value: 18, color: "#EF4444" },
  { name: "Type C", value: 10, color: "#F59E0B" },
];

const satisfactionData = [
  {
    type: "Positive",
    percentage: 70,
    count: 109,
    icon: IconThumbUp,
    color: "#10B981",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    type: "Neutral",
    percentage: 20,
    count: 109,
    icon: IconMoodNeutral,
    color: "#F59E0B",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
  },
  {
    type: "Negative",
    percentage: 10,
    count: 109,
    icon: IconThumbDown,
    color: "#EF4444",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
];

const incidentsData = [
  {
    id: "1234",
    date: "Jan 25 2025",
    time: "11:06 AM",
    name: "Kehinde Lawal",
    email: "kehinde@gmail.com",
    status: "Open",
    priority: "High",
  },
  {
    id: "1235",
    date: "Jan 25 2025",
    time: "10:30 AM",
    name: "Daniel Wale",
    email: "daniel@gmail.com",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: "1236",
    date: "Jan 25 2025",
    time: "09:45 AM",
    name: "Erica Olumide",
    email: "erica@gmail.com",
    status: "Open",
    priority: "Low",
  },
  {
    id: "1237",
    date: "Jan 25 2025",
    time: "08:20 AM",
    name: "Hassan Taiwo",
    email: "hassan@gmail.com",
    status: "Resolved",
    priority: "High",
  },
  {
    id: "1238",
    date: "Jan 25 2025",
    time: "07:15 AM",
    name: "Ali Abdulkareen",
    email: "ali@gmail.com",
    status: "Open",
    priority: "Medium",
  },
];

// Filter options
const categoryFilterOptions = [
  { label: "All Categories", value: "all" },
  { label: "Type A", value: "type_a" },
  { label: "Type B", value: "type_b" },
  { label: "Type C", value: "type_c" },
];

const satisfactionFilterOptions = [
  { label: "All Responses", value: "all" },
  { label: "Positive", value: "positive" },
  { label: "Neutral", value: "neutral" },
  { label: "Negative", value: "negative" },
];

export default function IncidenceManagementDashboard() {
  const [dateFilter, setDateFilter] = useState("Last 12 Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleIncidentSelect = (incidentId: string) => {
    setSelectedIncidents((prev) =>
      prev.includes(incidentId)
        ? prev.filter((id) => id !== incidentId)
        : [...prev, incidentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIncidents.length === incidentsData.length) {
      setSelectedIncidents([]);
    } else {
      setSelectedIncidents(incidentsData.map((incident) => incident.id));
    }
  };

  const handleCategoryFilterSelect = (value: string) => {
    console.log("Category filter selected:", value);
  };

  const handleSatisfactionFilterSelect = (value: string) => {
    console.log("Satisfaction filter selected:", value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">Dashboard</h1>
          <p className="text-sm text-[#667085]">
            This gives a concise overview of reported issues, helping teams
            track, prioritize, and resolve incidents.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button startIcon={<Download />} variant="outlined">
            Export
          </Button>
          <Button startIcon={<Add />} variant="contained">
            New Incident
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">Overview</h1>
            <p className="text-sm text-[#667085]">
              This gives a concise overview of reported incidents.
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

      {/* Trend Analysis Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Trend Analysis:{" "}
              <span className="text-[#9333EA]">Incidence resolution</span>
            </h1>
            <p className="text-sm text-[#667085]">
              This gives a chart of incident created vs incident resolved.
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

        <div className="flex items-center gap-4 mb-4">
          <div className="flex flex-col items-start gap-2 border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#D699C8]"></div>
              <h4 className="text-sm text-gray-600">Total Incident Received</h4>
            </div>

            <span className="text-sm font-semibold">2,500</span>
          </div>
          <div className="flex flex-col items-start gap-2 border border-gray-300 rounded-md p-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#AD3291]"></div>
              <h4 className="text-sm text-gray-600">Total Incident Solved</h4>
            </div>

            <span className="text-sm font-semibold">2,500</span>
          </div>
        </div>

        <div style={{ height: "320px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trendData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                domain={[0, 1000]}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Tooltip />
              <Bar dataKey="received" stackId="a" fill="#AD3291" />
              <Bar dataKey="solved" stackId="a" fill="#E4BBDA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution and Satisfaction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-10">
        {/* Distribution by Incident Category */}
        <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-semibold text-[#101828]">
                Distribution by Incident Category
              </h1>
              <p className="text-sm text-[#667085]">
                The spread of incidents across different categories.
              </p>
            </div>
            <CustomFilter
              filterOptions={categoryFilterOptions}
              onFilterSelect={handleCategoryFilterSelect}
            />
          </div>

          <div style={{ height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2">
            {categoryData.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className="text-sm font-semibold">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-semibold text-[#101828]">
                Customer Satisfaction
              </h1>
              <p className="text-sm text-[#667085]">
                Reflects customer satisfaction after issue resolution.
              </p>
            </div>
            <CustomFilter
              filterOptions={satisfactionFilterOptions}
              onFilterSelect={handleSatisfactionFilterSelect}
            />
          </div>

          <div className="space-y-4">
            {satisfactionData.map((item) => (
              <div
                key={item.type}
                className={`p-4 rounded-lg ${item.bgColor} border border-opacity-20`}
                style={{ borderColor: item.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <item.icon size={20} style={{ color: item.color }} />
                    <span className={`text-sm font-medium ${item.textColor}`}>
                      {item.type}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${item.textColor}`}>
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {item.count} responses
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Incidents Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              All Incidents
            </h1>
            <p className="text-sm text-[#667085]">
              A list of all reported incidents with key details.
            </p>
          </div>
          <Button endIcon={<KeyboardArrowRight />} variant="outlined">
            View All
          </Button>
        </div>

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
                    checked={selectedIncidents.length === incidentsData.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Incident ID
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
                  Status
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Priority
                </TableCell>
                <TableCell sx={{ width: "48px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incidentsData.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIncidents.includes(incident.id)}
                      onChange={() => handleIncidentSelect(incident.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{incident.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {incident.date}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {incident.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {incident.name}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {incident.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}
                    >
                      {incident.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(incident.priority)}`}
                    >
                      {incident.priority === "Low"
                        ? "↑ Low"
                        : incident.priority}
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
