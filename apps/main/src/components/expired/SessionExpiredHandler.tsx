import React, { useState, useEffect } from "react";

import { SessionExpiredDialog } from "../../components/expired/SessionExpiredDialog";
import { useAuth } from "../../hooks/useAuth";

export const SessionExpiredHandler: React.FC = () => {
  const { logout } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Listen for session expired events
    const handleSessionExpired = () => {
      setIsDialogOpen(true);
    };

    // Store the handler globally so axios can call it
    window.showSessionExpiredDialog = handleSessionExpired;

    return () => {
      delete window.showSessionExpiredDialog;
    };
  }, []);

  const handleLoginAgain = () => {
    logout();
  };

  return (
    <SessionExpiredDialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      onLoginAgain={handleLoginAgain}
    />
  );
};

// Extend the Window interface to include our global function
declare global {
  interface Window {
    showSessionExpiredDialog?: () => void;
  }
}
