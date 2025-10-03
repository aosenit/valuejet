import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
} from "@mui/material";

import { ChevronUp, ChevronDown, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.svg";

import Header from "./components/Header";

// Nav interfaces
interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: string | React.ElementType;

  hasDropdown?: boolean;
  subItems?: SubNavItem[];
}

interface SubNavItem {
  id: string;
  title: string;
  path: string;
}

const drawerWidth = 280;

const navigationItems: NavItem[] = [
  {
    id: "Incidence Management",
    title: "Incidence Management",
    path: "/home",
    icon: logo,
  },
  {
    id: "User Management",
    title: "User Management",
    path: "/user-management",
    icon: Users,
    hasDropdown: true,
    subItems: [
      { id: "man-users", title: "Manage Users", path: "/manage-users" },
      { id: "man-roles", title: "Manage Roles", path: "/manage-roles" },
    ],
  },
];

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    userManagement: false,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  type DropdownKey = keyof typeof dropdownStates;
  const toggleDropdown = (dropdown: DropdownKey) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Nav renderer
  const renderNavItem = (item: NavItem) => {
    if (item.hasDropdown && item.subItems) {
      return (
        <Box key={item.id}>
          <ListItemButton
            onClick={() => toggleDropdown(item.id as DropdownKey)}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "#AD3291" },
              borderRadius: "8px",
            }}
          >
            <ListItemIcon>
              {typeof item.icon === "string" ? (
                <img src={item.icon} alt="logo" width={20} />
              ) : (
                React.createElement(item.icon, { size: 20, color: "#D699C8" })
              )}
            </ListItemIcon>
            <ListItemText primary={item.title} />
            {dropdownStates[item.id as DropdownKey] ? (
              <ChevronUp size={20} color="#D699C8" />
            ) : (
              <ChevronDown size={20} color="#D699C8" />
            )}
          </ListItemButton>

          <Collapse
            in={dropdownStates[item.id as DropdownKey]}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {item.subItems.map((subItem) => (
                <NavLink
                  key={subItem.id}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `block px-8 py-2 rounded-md ${
                      isActive ? " font-bold" : "hover:bg-[#AD3291]"
                    }`
                  }
                >
                  {subItem.title}
                </NavLink>
              ))}
            </List>
          </Collapse>
        </Box>
      );
    }
    return (
      <NavLink
        key={item.id}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-4 px-4 py-2 rounded-md ${
            isActive
              ? "bg-[#AD3291] text-white font-bold"
              : "hover:bg-[#AD3291] hover:text-white"
          }`
        }
      >
        {typeof item.icon === "string" ? (
          <img src={item.icon} alt="logo" width={20} />
        ) : (
          React.createElement(item.icon, { size: 20, color: "#AD3291" })
        )}

        <span>{item.title}</span>
      </NavLink>
    );
  };

  // Drawer content
  const drawer = (
    <Box
      sx={{
        backgroundColor: "#1F091A",
        color: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Box className="flex items-center justify-between my-2 pb-14">
        <img src={logo} alt="logo" className="" />
      </Box>

      <List sx={{ flex: 1 }}>{navigationItems.map(renderNavItem)}</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Header / AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#FFFFFF",
          color: "black",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Header toggle={handleDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* Sidebar / Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,

          mt: 8,
          backgroundColor: "#FFFFFF",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashBoard;
