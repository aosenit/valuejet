import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronDown,
  Save,
  Edit,
  UserX,
  UserCheck,
  Trash2,
} from "lucide-react";

interface ActionOption {
  id: string;
  label: string;
  icon: React.ElementType;
  color?: string;
  onClick: () => void;
}

interface ActionMenuProps {
  onSaveChanges?: () => void;
  onEditRole?: () => void;
  onDeactivateRole?: () => void;
  onReactivateRole?: () => void;
  onDeleteRole?: () => void;
  isActive?: boolean;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onSaveChanges,
  onEditRole,
  onDeactivateRole,
  onReactivateRole,
  onDeleteRole,
  isActive = true,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionOptions: ActionOption[] = [
    {
      id: "save-changes",
      label: "Save New Changes",
      icon: Save,
      onClick: () => {
        onSaveChanges?.();
        handleClose();
      },
    },
    {
      id: "edit-role",
      label: "Edit Role & Permission",
      icon: Edit,
      onClick: () => {
        onEditRole?.();
        handleClose();
      },
    },
    {
      id: isActive ? "deactivate-role" : "reactivate-role",
      label: isActive ? "Deactivate Role" : "Reactivate Role",
      icon: isActive ? UserX : UserCheck,
      onClick: () => {
        if (isActive) {
          onDeactivateRole?.();
        } else {
          onReactivateRole?.();
        }
        handleClose();
      },
    },
    {
      id: "delete-role",
      label: "Delete Role",
      icon: Trash2,
      color: "#EF4444",
      onClick: () => {
        onDeleteRole?.();
        handleClose();
      },
    },
  ];

  return (
    <>
      <Button
        id="action-button"
        aria-controls={open ? "action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ChevronDown size={16} />}
        variant="contained"
        sx={{
          textTransform: "none",
          backgroundColor: "#AD3291",
          borderRadius: "8px",
          padding: "8px 16px",
          "&:hover": {
            backgroundColor: "#92287A",
          },
        }}
      >
        Take Action
      </Button>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
          },
        }}
      >
        {actionOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={option.onClick}
            sx={{
              color: option.color || "#101828",
              "&:hover": {
                backgroundColor: option.color ? `${option.color}10` : "#F3F4F6",
              },
            }}
          >
            <ListItemIcon>
              <option.icon size={16} color={option.color || "#667085"} />
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ActionMenu;
