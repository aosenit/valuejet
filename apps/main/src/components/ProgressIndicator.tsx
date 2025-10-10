import React from "react";
import { Box, Typography } from "@mui/material";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  completed: boolean;
  active: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* Step Circle */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                step.completed || step.active ? "#10B981" : "#E5E7EB",
              color: step.completed || step.active ? "white" : "#9CA3AF",
              position: "relative",
            }}
          >
            {step.completed ? (
              <Check size={20} />
            ) : (
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {index + 1}
              </Typography>
            )}
          </Box>

          {/* Step Title */}
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              fontWeight: 500,
              color: step.completed || step.active ? "#101828" : "#9CA3AF",
            }}
          >
            {step.title}
          </Typography>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <Box
              sx={{
                width: 60,
                height: 2,
                backgroundColor: step.completed ? "#10B981" : "#E5E7EB",
                mx: 2,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default ProgressIndicator;
