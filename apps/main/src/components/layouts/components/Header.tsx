import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import notification from "../../../assets/notification.svg";
import { User2, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

const Header = ({ toggle }: { toggle: () => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout, getUserInfo } = useAuth();
  const userInfo = getUserInfo();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <AppBar position="static" color="inherit" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Left section (Burger + Company info) */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(173, 50, 145, 0.1)",
                borderRadius: "8px",
                padding: "4px 8px",
              },
            }}
          >
            <User2
              size={20}
              className="bg-[#AD3291]/50 text-[#AD3291] pt-1 rounded-lg"
            />
            <p>{userInfo?.name || "Isaac, Sikiru K."}</p>
          </Box>
        </Box>

        {/* Right section (Notifications + Profile + Menu) */}
        <Box>
          <img src={notification} alt="Notifications" className="w-7" />
        </Box>
      </Toolbar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
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
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogOut size={16} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
