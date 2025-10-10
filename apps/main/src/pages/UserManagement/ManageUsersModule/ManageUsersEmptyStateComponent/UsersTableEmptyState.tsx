import React from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { DownloadCloud } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import { Sort } from "@mui/icons-material";
import { empty } from "../../../../assets/assets";

type UsersTableProps = {
  onCreateUser: () => void;
  onExport: () => void;
  onFilter: () => void;
  title: string;
  description: string;
};

const UsersTableEmptyState: React.FC<UsersTableProps> = ({
  onCreateUser,
  onExport,
  onFilter,
  title,
  description,
}) => {
  return (
    <div className="rounded-lg bg-white border border-[#D0D5DD] m-10 p-4 space-y-4">
      {/* Table Header */}
      <div className=" border-b border-[#F2DDED] pb-4">
        <h3 className="text-xl font-semibold text-[#101828]">{title}</h3>
        <p className="text-sm text-[#667085]">{description}</p>
      </div>

      {/* Search */}

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
          onClick={onFilter}
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
          ></div>
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
          onClick={onExport}
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
          ></div>
        </Button>
      </Box>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
        <div className="w-20 h-20 flex items-center justify-center  mb-4">
          <img
            src={empty}
            alt="empty"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="font-medium">No User</p>
        <p className="text-sm mb-4">
          You currently don’t have a user added yet.
        </p>

        <button
          onClick={onCreateUser}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Create New User +
        </button>
      </div>
    </div>
  );
};

export default UsersTableEmptyState;
