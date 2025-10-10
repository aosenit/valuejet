import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  AvatarGroup,
} from "@mui/material";
import { Search, KeyboardArrowRight, Info } from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import CustomExport from "../../components/Export";
import Pagination from "../../components/Pagination";
import { ArrowUpDown } from "lucide-react";

// Mock data
const workflowData = [
  {
    id: "8093",
    name: "Corporate Flow",
    action: "Reconciliation",
    type: "Rigid",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Accounts Payable",
    type: "Flexible",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8096",
    name: "User Acceptance",
    action: "Accounts Receivable",
    type: "Rigid",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Inactive",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Forecasting",
    type: "Flexible",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Payroll Processing",
    type: "Rigid",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Inactive",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Financial Reporting",
    type: "Flexible",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Compliance",
    type: "Rigid",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Budgeting",
    type: "Flexible",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Inactive",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Auditing",
    type: "Rigid",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Active",
  },
  {
    id: "8098",
    name: "Credit System",
    action: "Reconciliation",
    type: "Flexible",
    reviewLine: ["A", "B", "C", "D", "E"],
    approvalLine: ["F", "G", "H", "I", "J"],
    status: "Inactive",
  },
];

// Filter options
const filterOptions = [
  { label: "All Workflows", value: "all" },
  { label: "Active Workflows", value: "active" },
  { label: "Inactive Workflows", value: "inactive" },
  { label: "By Type", value: "type" },
  { label: "By Action", value: "action" },
];

export default function ApprovalWorkflowDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterSelect = (value: string) => {
    console.log("Filter selected:", value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Inactive":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getAvatarColor = (letter: string) => {
    const colors = ["#AD3291", "#9333EA", "#7C3AED", "#6B21A8", "#581C87"];
    return colors[letter.charCodeAt(0) % colors.length];
  };

  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            Workflow Management
          </h1>
          <p className="text-sm text-[#667085]">
            A list of all workflow processes created on the platform.
          </p>
        </div>
        <Button variant="outlined">Add New Workflow +</Button>
      </div>

      {/* Overview Section */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 mx-10">
        <div className="grid grid-cols-1 ">
          {/* Total Workflow Process */}
          <div className="rounded-lg p-4 flex items-center justify-center  bg-white">
            <div className="rounded-lg flex flex-col w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-500">
                  Total Workflow process
                </span>
                <Info fontSize="small" sx={{ color: "#667085" }} />
              </div>
              <span className="text-2xl font-semibold">32</span>
              <span className="mt-2 text-xs">
                <span className="text-green-600 font-medium">+ 22%</span>{" "}
                increase vs last 6 Month
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Active Workflow Process */}
            <div className="rounded-lg p-4 flex items-center justify-center border border-green-300 bg-green-50">
              <div className="rounded-lg flex flex-col w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">
                    Active Workflow Process
                  </span>
                  <Info fontSize="small" sx={{ color: "#667085" }} />
                </div>
                <span className="text-2xl font-semibold">28</span>
                <span className="mt-2 text-xs">
                  <span className="text-green-600 font-medium">+ 10.2%</span>{" "}
                  increase vs last 3 days
                </span>
              </div>
            </div>

            {/* Deactivated Client */}
            <div className="rounded-lg p-4 flex items-center justify-center border border-red-300 bg-red-50">
              <div className="rounded-lg flex flex-col w-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">
                    Deactivated Client
                  </span>
                  <Info fontSize="small" sx={{ color: "#667085" }} />
                </div>
                <span className="text-2xl font-semibold">04</span>
                <span className="mt-2 text-xs">
                  <span className="text-red-600 font-medium">+ 2.2%</span>{" "}
                  decrease vs last 3 days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow List Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Workflow List
            </h1>
            <p className="text-sm text-[#667085]">
              A list of all workflow process created on the system.
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

          {/* Sort Button */}
          <Button
            variant="outlined"
            onClick={handleSort}
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
            endIcon={<ArrowUpDown size={16} />}
          >
            Sort
          </Button>

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
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Workflow Name
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Workflow Action
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Workflow Type
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Review Line
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Approval Line
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
              {workflowData.map((workflow, index) => (
                <TableRow key={`${workflow.id}-${index}`}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {workflow.name}
                      </span>
                      <span className="text-[#667085] text-sm">
                        ID: {workflow.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {workflow.action}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {workflow.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AvatarGroup
                        max={4}
                        sx={{
                          "& .MuiAvatar-root": {
                            width: 24,
                            height: 24,
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        {workflow.reviewLine.slice(0, 3).map((letter, idx) => (
                          <Avatar
                            key={`review-${letter}-${idx}`}
                            sx={{
                              backgroundColor: getAvatarColor(letter),
                              fontSize: "0.75rem",
                              width: 24,
                              height: 24,
                            }}
                          >
                            {letter}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                      <span className="text-[#667085] text-xs ml-1">
                        +{workflow.reviewLine.length - 3}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <AvatarGroup
                        max={4}
                        sx={{
                          "& .MuiAvatar-root": {
                            width: 24,
                            height: 24,
                            fontSize: "0.75rem",
                          },
                        }}
                      >
                        {workflow.approvalLine
                          .slice(0, 3)
                          .map((letter, idx) => (
                            <Avatar
                              key={`approval-${letter}-${idx}`}
                              sx={{
                                backgroundColor: getAvatarColor(letter),
                                fontSize: "0.75rem",
                                width: 24,
                                height: 24,
                              }}
                            >
                              {letter}
                            </Avatar>
                          ))}
                      </AvatarGroup>
                      <span className="text-[#667085] text-xs ml-1">
                        +{workflow.approvalLine.length - 3}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium ${getStatusColor(workflow.status)}`}
                    >
                      {workflow.status}
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
