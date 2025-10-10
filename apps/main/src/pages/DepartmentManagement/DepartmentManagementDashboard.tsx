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
  Checkbox,
  IconButton,
} from "@mui/material";
import { Search, KeyboardArrowRight } from "@mui/icons-material";
import CustomFilter from "../../components/CustomFilter";
import CustomExport from "../../components/Export";
import Pagination from "../../components/Pagination";

// Mock data
const departmentsData = [
  {
    id: "1234",
    name: "Finance",
    createdDate: "Jan 25 2025",
    createdTime: "11:06 AM",
    customerName: "Kehinde Lawal",
    customerEmail: "kehinde@gmail.com",
    status: "Active",
    contactEmail: "Olivia@email.com",
  },
  {
    id: "1235",
    name: "Human Resources",
    createdDate: "Jan 25 2025",
    createdTime: "10:30 AM",
    customerName: "Daniel Wale",
    customerEmail: "daniel@gmail.com",
    status: "Active",
    contactEmail: "HR@email.com",
  },
  {
    id: "1236",
    name: "Information Technology",
    createdDate: "Jan 25 2025",
    createdTime: "09:45 AM",
    customerName: "Erica Olumide",
    customerEmail: "erica@gmail.com",
    status: "Inactive",
    contactEmail: "IT@email.com",
  },
  {
    id: "1237",
    name: "Customer Service",
    createdDate: "Jan 25 2025",
    createdTime: "08:20 AM",
    customerName: "Hassan Taiwo",
    customerEmail: "hassan@gmail.com",
    status: "Active",
    contactEmail: "Support@email.com",
  },
  {
    id: "1238",
    name: "Marketing",
    createdDate: "Jan 25 2025",
    createdTime: "07:15 AM",
    customerName: "Ali Abdulkareen",
    customerEmail: "ali@gmail.com",
    status: "Active",
    contactEmail: "Marketing@email.com",
  },
  {
    id: "1239",
    name: "Operations",
    createdDate: "Jan 25 2025",
    createdTime: "06:30 AM",
    customerName: "Fortune Okoro",
    customerEmail: "fortune@gmail.com",
    status: "Active",
    contactEmail: "Ops@email.com",
  },
  {
    id: "1240",
    name: "Legal",
    createdDate: "Jan 25 2025",
    createdTime: "05:45 AM",
    customerName: "Marchi Chukwu",
    customerEmail: "marchi@gmail.com",
    status: "Inactive",
    contactEmail: "Legal@email.com",
  },
  {
    id: "1241",
    name: "Procurement",
    createdDate: "Jan 25 2025",
    createdTime: "04:20 AM",
    customerName: "Wande Salami",
    customerEmail: "wande@gmail.com",
    status: "Active",
    contactEmail: "Procurement@email.com",
  },
  {
    id: "1242",
    name: "Quality Assurance",
    createdDate: "Jan 25 2025",
    createdTime: "03:10 AM",
    customerName: "Dipo Adebola",
    customerEmail: "dipo@gmail.com",
    status: "Active",
    contactEmail: "QA@email.com",
  },
  {
    id: "1243",
    name: "Research & Development",
    createdDate: "Jan 25 2025",
    createdTime: "02:05 AM",
    customerName: "Bolimi Souza",
    customerEmail: "bolimi@gmail.com",
    status: "Active",
    contactEmail: "R&D@email.com",
  },
];

// Filter options
const filterOptions = [
  { label: "All Departments", value: "all" },
  { label: "Active Departments", value: "active" },
  { label: "Inactive Departments", value: "inactive" },
  { label: "By Department Name", value: "department_name" },
  { label: "By Customer", value: "customer" },
];

export default function DepartmentManagementDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleDepartmentSelect = (departmentId: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(departmentId)
        ? prev.filter((id) => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedDepartments.length === departmentsData.length) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(
        departmentsData.map((department) => department.id)
      );
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
          <h1 className="text-xl font-semibold text-[#101828]">Departments</h1>
          <p className="text-sm text-[#667085]">
            This gives a concise overview of reported issues, helping teams
            track, prioritize, and resolve incidents
          </p>
        </div>
        <Button variant="contained">New Department</Button>
      </div>

      {/* All Departments Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              All Departments
            </h1>
            <p className="text-sm text-[#667085]">
              View and manage all departments within the system.
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
                      selectedDepartments.length === departmentsData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Department
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Created Date
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
                  Contact Email
                </TableCell>
                <TableCell sx={{ width: "48px" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentsData.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedDepartments.includes(department.id)}
                      onChange={() => handleDepartmentSelect(department.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {department.name}
                      </span>
                      <span className="text-[#667085] text-sm">
                        ID: {department.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {department.createdDate}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {department.createdTime}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {department.customerName}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {department.customerEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(department.status)}`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${getStatusDotColor(department.status)}`}
                      ></span>
                      {department.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {department.contactEmail}
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
