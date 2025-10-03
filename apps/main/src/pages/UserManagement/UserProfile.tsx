import { Typography, Button, Chip } from "@mui/material";
import { ChevronDown } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="p-6 bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Typography variant="h5" className="font-bold">
            Timipreye Oweikeme{" "}
            <Chip
              label="Active"
              color="success"
              size="small"
              className="ml-2"
            />
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Role: System Admin
          </Typography>
        </div>
        <Button
          variant="outlined"
          endIcon={<ChevronDown />}
          sx={{
            textTransform: "none",
            borderColor: "#AD3291",
            color: "#AD3291",
            borderRadius: "8px",
            padding: "6px 24px",
          }}
          onClick={() => {
            const menu = document.getElementById("filter-menu");
            if (menu) {
              menu.style.display =
                menu.style.display === "none" ? "block" : "none";
            }
          }}
        >
          Take Action
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
          >
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Edit
              </button>
            </div>
          </div>
        </Button>
      </div>
      {/* <div className="flex space-x-4 mb-6">
        <Button variant="text" color="primary">
          User Overview
        </Button>
        <Button variant="text" color="inherit">
          User Activity
        </Button>
      </div>
      <Box className="bg-purple-100 p-4 rounded-lg mb-6">
        <Typography variant="h6" className="font-semibold mb-4">
          Basic Information
        </Typography>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Typography variant="body2" color="textSecondary">
              First Name
            </Typography>
            <Typography variant="body1">Timipreye</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Last Name
            </Typography>
            <Typography variant="body1">Oweikeme</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Department
            </Typography>
            <Typography variant="body1">Administrator</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Date Created
            </Typography>
            <Typography variant="body1">July 2, 2025</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Time Created
            </Typography>
            <Typography variant="body1">11:02 AM</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Assigned Role
            </Typography>
            <Typography variant="body1">System Admin</Typography>
          </div>
        </div>
      </Box>
      <Box className="bg-purple-100 p-4 rounded-lg mb-6">
        <Typography
          variant="h6"
          className="font-semibold mb-4 flex justify-between"
        >
          Contact Information
          <Button variant="text" color="secondary">
            Edit
          </Button>
        </Typography>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Typography variant="body2" color="textSecondary">
              Email Address
            </Typography>
            <Typography variant="body1">timiowei@gmail.com</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Phone Number
            </Typography>
            <Typography variant="body1">+234 905 544 4444</Typography>
          </div>
          <div>
            <Typography variant="body2" color="textSecondary">
              Status
            </Typography>
            <Chip label="Active" color="success" size="small" />
          </div>
        </div>
      </Box>
      <Box className="bg-purple-100 p-4 rounded-lg">
        <Typography variant="h6" className="font-semibold mb-4">
          User Role Permission
        </Typography>
        <div className="flex flex-wrap gap-2">
          <Chip label="System Admin" color="primary" />
          <Chip label="Incident Management" color="default" />
          <Chip label="Customer Profile Management" color="default" />
          <Chip label="Escalation Management" color="default" />
          <Chip label="Department" color="default" />
          <Chip label="Audit Trail" color="default" />
          <Chip label="User Management" color="default" />
          <Chip label="Settings" color="default" />
          <Chip label="Notification" color="default" />
        </div>
      </Box> */}
    </div>
  );
};

export default UserProfile;
