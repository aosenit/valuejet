import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import notification from "../../../assets/notification.svg";
import { User2 } from "lucide-react";

const Header = ({ toggle }: { toggle: () => void }) => {
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

          <Box display="flex" alignItems="center" gap={2}>
            <User2
              size={20}
              className="bg-[#AD3291]/50 text-[#AD3291] pt-1 rounded-lg"
            />
            <p>Isaac, Sikiru K.</p>
          </Box>
        </Box>

        {/* Right section (Notifications + Profile + Menu) */}
        <Box>
          <img src={notification} className="w-7" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
