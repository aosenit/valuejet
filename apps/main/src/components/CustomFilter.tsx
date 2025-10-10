import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Sort } from "@mui/icons-material";

interface FilterOption {
  label: string;
  value: string;
}

interface CustomFilterProps {
  filterOptions: FilterOption[];
  onFilterSelect: (value: string) => void;
}

export default function CustomFilter({
  filterOptions,
  onFilterSelect,
}: CustomFilterProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterClick = (value: string) => {
    onFilterSelect(value);
    handleClose();
  };

  return (
    <div>
      <Button
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="outlined"
        endIcon={<Sort />}
        sx={{
          textTransform: "none",
          borderColor: "#AD3291",
          color: "#AD3291",
          borderRadius: "8px",
          padding: "6px 24px",
        }}
      >
        Filter
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "filter-button",
          },
        }}
      >
        {filterOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleFilterClick(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
