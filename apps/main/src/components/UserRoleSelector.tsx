import { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { ChevronDown, Search, User } from "lucide-react";

interface Role {
  id: string;
  name: string;
}

interface UserRoleSelectorProps {
  roles: Role[];
  selectedRoles: string[];
  onRoleChange: (roleIds: string[]) => void;
  placeholder?: string;
  helperText?: string;
}

export default function UserRoleSelector({
  roles,
  selectedRoles,
  onRoleChange,
  placeholder = "Select an Option (s)",
  helperText = "You can only select one role",
}: UserRoleSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleToggle = (roleId: string) => {
    if (selectedRoles.includes(roleId)) {
      onRoleChange(selectedRoles.filter((id) => id !== roleId));
    } else {
      onRoleChange([...selectedRoles, roleId]);
    }
  };

  const getSelectedRoleNames = () => {
    return roles
      .filter((role) => selectedRoles.includes(role.id))
      .map((role) => role.name)
      .join(", ");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* Dropdown Trigger */}
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={getSelectedRoleNames() || ""}
        onClick={() => setIsOpen(!isOpen)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <User size={20} color="#667085" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
              >
                <ChevronDown size={20} color="#667085" />
              </Box>
            </InputAdornment>
          ),
          readOnly: true,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            cursor: "pointer",
          },
        }}
      />

      {helperText && (
        <Box sx={{ fontSize: "12px", color: "#667085", mt: 1 }}>
          {helperText}
        </Box>
      )}

      {/* Dropdown Content */}
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #D0D5DD",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            mt: 1,
          }}
        >
          {/* Search Input */}
          <Box sx={{ p: 2, borderBottom: "1px solid #F2DDED" }}>
            <TextField
              fullWidth
              placeholder="Search"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} color="#667085" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "6px",
                },
              }}
            />
          </Box>

          {/* Role List */}
          <Box sx={{ maxHeight: "100px", overflowY: "auto", my: 0.5 }}>
            {filteredRoles.map((role) => (
              <FormControlLabel
                key={role.id}
                control={
                  <Checkbox
                    size="small"
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleRoleToggle(role.id)}
                    sx={{
                      color: "#AD3291",
                      "&.Mui-checked": {
                        color: "#AD3291",
                      },
                    }}
                  />
                }
                label={role.name}
                sx={{
                  width: "100%",
                  px: 2,
                  py: 0.2,

                  "&:hover": {
                    backgroundColor: "#F9F6F8",
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </Box>
  );
}
