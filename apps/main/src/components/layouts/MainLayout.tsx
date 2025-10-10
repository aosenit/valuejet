import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  Toolbar,
  Collapse,
} from "@mui/material";

import {
  ChevronUp,
  ChevronDown,
  Users,
  Settings,
  Bell,
  FileText,
  AlertTriangle,
  UserCheck,
  Workflow,
  History,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import Header from "./components/Header";
import Protected from "../Protected";
import logo from "../../assets/logo.svg";

// Nav interfaces
interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ElementType;

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
    path: "/incidence-management",
    icon: Settings,
    hasDropdown: true,
    // dashboard and Incidence list
    subItems: [
      { id: "dashboard", title: "Dashboard", path: "/dashboard" },
      {
        id: "incidence-list",
        title: "Incidence List",
        path: "/incidence-list",
      },
    ],
  },
  {
    id: "Customer Management",
    title: "Customer Management",
    path: "/customer-management",
    icon: UserCheck,
    hasDropdown: true,
    subItems: [
      {
        id: "customer-dashboard",
        title: "Dashboard",
        path: "/customer-management",
      },
    ],
  },
  {
    id: "Escalation Management",
    title: "Escalation Management",
    path: "/escalation-management",
    icon: AlertTriangle,
  },
  {
    id: "Department",
    title: "Department",
    path: "/department",
    icon: Users,
  },
  {
    id: "Knowledge Base",
    title: "Knowledge Base",
    path: "/knowledge-base",
    icon: FileText,
  },
  {
    id: "Approval Workflow",
    title: "Approval Workflow",
    path: "/approval-workflow",
    icon: Workflow,
  },
  {
    id: "Audit Trail",
    title: "Audit Trail",
    path: "/audit-trail",
    icon: History,
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
  {
    id: "General Settings",
    title: "General Settings",
    path: "/general-settings",
    icon: Settings,
  },
  {
    id: "Notifications",
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
];

const DashBoard = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState({
    "Incidence Management": false,
    "Customer Management": false,
    "User Management": false,
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
        <Box key={item.id} className="mb-2">
          <button
            onClick={() => toggleDropdown(item.id as DropdownKey)}
            className="flex items-center gap-4 px-4 py-2 rounded-md text-white transition-colors mb-1 cursor-pointer hover:bg-[#AD3291] hover:bg-opacity-50 w-full text-left border-none bg-transparent"
          >
            {React.createElement(item.icon, { size: 16, color: "white" })}
            <span className="text-[14px] flex-1">{item.title}</span>
            {dropdownStates[item.id as DropdownKey] ? (
              <ChevronUp size={20} color="white" />
            ) : (
              <ChevronDown size={20} color="white" />
            )}
          </button>

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
                    `block px-8 py-2 rounded-md text-white transition-colors ${
                      isActive
                        ? "bg-[#AD3291] "
                        : "hover:text-[#AD3291] hover:bg-opacity-50"
                    }`
                  }
                >
                  <span className="text-[14px]">{subItem.title}</span>
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
          `flex items-center gap-4 px-4 py-2 rounded-md text-white transition-colors mb-1 ${
            isActive
              ? "bg-[#AD3291] "
              : "hover:bg-[#AD3291] hover:bg-opacity-50"
          }`
        }
      >
        {React.createElement(item.icon, { size: 16, color: "white" })}

        <span className="text-[14px]">{item.title}</span>
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
      <Box className="flex items-center justify-center my-4 pb-6">
        <span
          className="text-2xl font-bold text-white  w-full"
          style={{ fontFamily: "cursive" }}
        >
          <img
            src={logo}
            alt="logo"
            className="h-[40px] w-[100px] object-contain"
          />
        </span>
      </Box>

      <Box className="flex flex-col gap-1">
        {navigationItems.map(renderNavItem)}
      </Box>
    </Box>
  );

  return (
    <Protected>
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
            minHeight: "calc(100vh - 80px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Protected>
  );
};

export default DashBoard;
