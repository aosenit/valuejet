import { useState } from "react";
import { Button, Box } from "@mui/material";
import { DecisionCard, ConfirmationCard } from "./DialogCards";

export default function DialogCardsDemo() {
  const [decisionOpen, setDecisionOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleDecisionConfirm = () => {
    setDecisionOpen(false);
    // Show confirmation after decision
    setTimeout(() => setConfirmationOpen(true), 300);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  return (
    <Box sx={{ padding: 4, display: "flex", gap: 2 }}>
      {/* Decision Card Example */}
      <Button
        variant="contained"
        onClick={() => setDecisionOpen(true)}
        sx={{ backgroundColor: "#F59E0B" }}
      >
        Show Decision Card
      </Button>

      {/* Confirmation Card Example */}
      <Button
        variant="contained"
        onClick={() => setConfirmationOpen(true)}
        sx={{ backgroundColor: "#10B981" }}
      >
        Show Confirmation Card
      </Button>

      {/* Decision Card */}
      <DecisionCard
        open={decisionOpen}
        onClose={() => setDecisionOpen(false)}
        title="Deactivate Officer Profile ?"
        description="Are you sure, you want to deactivate this User profile >"
        warningText="Kindly note that this action, implies user access to the system would be temporarily revoked hence, they won't be able to see nor manage customers."
        cancelButton={{
          text: "Cancel",
          color: "#AD3291",
          action: () => setDecisionOpen(false),
        }}
        confirmButton={{
          text: "Deactivate Profile",
          color: "#AD3291",
          action: handleDecisionConfirm,
        }}
      />

      {/* Confirmation Card */}
      <ConfirmationCard
        open={confirmationOpen}
        onClose={handleConfirmationClose}
        title="User Deactivated"
        description="User profile has been successfully Deactivated"
        button={{
          text: "Close",
          color: "#AD3291",
          action: handleConfirmationClose,
        }}
      />
    </Box>
  );
}
