import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Dialog } from "@mui/material";
import React from "react";

interface SessionExpiredDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAgain: () => void;
}

export const SessionExpiredDialog: React.FC<SessionExpiredDialogProps> = ({
  isOpen,
  onClose,
  onLoginAgain,
}) => {
  const handleLoginAgain = () => {
    onLoginAgain();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <div className="flex flex-col items-center justify-center gap-4 p-4 my-4">
        <Box className="flex h-12 w-12 items-center justify-center rounded-full">
          <LockOutlined fontSize="large" color="primary" />
        </Box>

        {/* Title with better typography */}
        <div className="flex flex-col items-center justify-center gap-2">
          <h3
            style={{
              fontSize: "24px",
              color: "#111827",
              fontWeight: 700,
            }}
          >
            Session Timeout
          </h3>
        </div>

        {/* Description with better spacing */}
        <div className="text-center">
          <h3 className="text-gray-600  max-w-[400px] text-center my-3">
            For your security, your session has automatically expired. Please
            sign in again to continue where you left off.
          </h3>

          {/* Footer with improved button design */}
          <div className="">
            <Button variant="contained" onClick={handleLoginAgain}>
              {" "}
              Continue to Sign In
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
