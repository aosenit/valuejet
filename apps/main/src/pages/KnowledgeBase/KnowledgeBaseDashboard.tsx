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
const knowledgeBaseData = [
  {
    id: "1234",
    title: "How to Redeem Loyalty Points",
    createdBy: "Kehinde Lawal",
    createdByEmail: "kehinde@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1235",
    title: "Handling Baggage Delay Complaints",
    createdBy: "Daniel Wale",
    createdByEmail: "daniel@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1236",
    title: "Corporate Account Registration Guide",
    createdBy: "Erica Olumide",
    createdByEmail: "erica@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1237",
    title: "Processing Refund Requests",
    createdBy: "Hassan Taiwo",
    createdByEmail: "hassan@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1238",
    title: "Updating Passenger Contact Information",
    createdBy: "Ali Abdulkareem",
    createdByEmail: "alikareem@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1239",
    title: "Partner API Integration Setup",
    createdBy: "Fortune Okoro",
    createdByEmail: "fortune@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1240",
    title: "Escalation Rules for Incident Management",
    createdBy: "Nkechi Chukwu",
    createdByEmail: "nkechi@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1241",
    title: "In-Flight Service Complaint",
    createdBy: "Yetunde Salami",
    createdByEmail: "yetunde@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1242",
    title: "Corporate Account Registration Guide",
    createdBy: "Dele Adeleke",
    createdByEmail: "deleade@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
  {
    id: "1243",
    title: "Escalation Rules for Incident Management",
    createdBy: "Rotimi Souza",
    createdByEmail: "rotimi@gmail.com",
    lastModified: "Jan 25 2025",
    lastModifiedTime: "11:06 AM",
  },
];

// Filter options
const filterOptions = [
  { label: "All Articles", value: "all" },
  { label: "By Author", value: "author" },
  { label: "By Category", value: "category" },
  { label: "By Date Range", value: "date_range" },
  { label: "By Status", value: "status" },
];

export default function KnowledgeBaseDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);

  const totalPages = 10;
  const totalItems = 100;
  const itemsPerPage = 10;

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === knowledgeBaseData.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(knowledgeBaseData.map((article) => article.id));
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
          <h1 className="text-xl font-semibold text-[#101828]">
            Knowledge Base
          </h1>
          <p className="text-sm text-[#667085]">
            Browse, search, and manage all knowledge base articles in one place.
          </p>
        </div>
        <Button variant="contained">Add New Knowledge</Button>
      </div>

      {/* Knowledge Base Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
        <div className="flex justify-between items-start pb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#101828]">
              Knowledge Base
            </h1>
            <p className="text-sm text-[#667085]">
              View and manage all knowledge base articles.
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
                      selectedArticles.length === knowledgeBaseData.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Knowledge ID
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Knowledge Title
                </TableCell>
                <TableCell
                  sx={{ fontSize: "12px", fontWeight: 500, color: "#6B7280" }}
                >
                  Created By
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
              {knowledgeBaseData.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedArticles.includes(article.id)}
                      onChange={() => handleArticleSelect(article.id)}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{article.id}</TableCell>
                  <TableCell>
                    <span className="text-[#101828] text-sm font-medium">
                      {article.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {article.createdBy}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {article.createdByEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-[#101828] text-sm font-medium">
                        {article.lastModified}
                      </span>
                      <span className="text-[#667085] text-sm">
                        {article.lastModifiedTime}
                      </span>
                    </div>
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
