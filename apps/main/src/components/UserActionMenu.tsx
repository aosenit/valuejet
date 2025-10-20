import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ChevronDown, Save, UserX, UserCheck, Trash2 } from "lucide-react";

interface UserActionMenuProps {
  onSaveChanges?: () => void;
  onDeactivateUser?: () => void;
  onReactivateUser?: () => void;
  onDeleteUser?: () => void;
  isActive?: boolean;
}

const UserActionMenu: React.FC<UserActionMenuProps> = ({
  onSaveChanges,
  onDeactivateUser,
  onReactivateUser,
  onDeleteUser,
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

  const actionOptions = [
    {
      id: "save-changes",
      label: "Edit User Details",
      icon: Save,
      onClick: () => {
        onSaveChanges?.();
        handleClose();
      },
    },
    {
      id: isActive ? "deactivate-user" : "reactivate-user",
      label: isActive ? "Deactivate User" : "Reactivate User",
      icon: isActive ? UserX : UserCheck,
      onClick: () => {
        if (isActive) {
          onDeactivateUser?.();
        } else {
          onReactivateUser?.();
        }
        handleClose();
      },
    },
    {
      id: "delete-user",
      label: "Delete User",
      icon: Trash2,
      color: "#EF4444",
      onClick: () => {
        onDeleteUser?.();
        handleClose();
      },
    },
  ];

  return (
    <>
      <Button
        id="user-action-button"
        aria-controls={open ? "user-action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<ChevronDown size={16} />}
        variant="outlined"
        sx={{
          textTransform: "none",
          borderColor: "#AD3291",
          color: "#AD3291",
          borderRadius: "8px",
          padding: "8px 16px",
        }}
      >
        Take Action
      </Button>
      <Menu
        id="user-action-menu"
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

export default UserActionMenu;
