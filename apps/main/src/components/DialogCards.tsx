import { Dialog, DialogContent, Button, Box } from "@mui/material";
import { success, warning } from "../assets/assets";

interface DecisionCardProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  warningText?: string;
  cancelButton: {
    text: string;
    color?: string;
    action: () => void;
  };
  confirmButton: {
    text: string;
    color?: string;
    action: () => void;
  };
  loading?: boolean;
}

export function DecisionCard({
  open,
  onClose,
  title,
  description,
  warningText,
  cancelButton,
  confirmButton,
  loading,
}: DecisionCardProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", padding: 0 }}>
        {/* Warning Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
            }}
          >
            <img
              src={warning}
              alt="warning"
              className="w-full h-full object-contain"
            />
          </Box>
        </Box>

        {/* Title */}
        <Box
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#111827",
            mb: 1,
          }}
        >
          {title}
        </Box>

        {/* Description */}
        <Box
          sx={{
            fontSize: "14px",
            color: "#6B7280",
            mb: warningText ? 2 : 3,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Box>

        {/* Warning Text */}
        {warningText && (
          <Box
            sx={{
              fontSize: "14px",
              color: "#6B7280",
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            {warningText}
          </Box>
        )}

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={cancelButton.action}
            fullWidth
            size="small"
            sx={{
              textTransform: "none",
              borderColor: cancelButton.color || "#AD3291",
              color: cancelButton.color || "#AD3291",
              borderRadius: "8px",
              padding: "8px 24px",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                borderColor: cancelButton.color || "#AD3291",
                backgroundColor: `${cancelButton.color || "#AD3291"}10`,
              },
            }}
          >
            {cancelButton.text}
          </Button>
          <Button
            loading={loading}
            variant="contained"
            onClick={confirmButton.action}
            fullWidth
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: confirmButton.color || "#AD3291",
              borderRadius: "8px",
              padding: "8px 24px",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: confirmButton.color || "#92287A",
              },
            }}
          >
            {confirmButton.text}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

interface ConfirmationCardProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  button: {
    text: string;
    color?: string;
    action: () => void;
  };
}

export function ConfirmationCard({
  open,
  onClose,
  title,
  description,
  button,
}: ConfirmationCardProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogContent sx={{ textAlign: "center", padding: 0 }}>
        {/* Success Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              src={success}
              alt="success"
              className="w-full h-full object-contain"
            />
          </Box>
        </Box>

        {/* Title */}
        <Box
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            color: "#111827",
            mb: 2,
          }}
        >
          {title}
        </Box>

        {/* Description */}
        <Box
          sx={{
            fontSize: "14px",
            color: "#6B7280",
            mb: 3,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Box>

        {/* Action Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            onClick={button.action}
            fullWidth
            size="small"
            sx={{
              textTransform: "none",
              borderColor: button.color || "#AD3291",
              color: button.color || "#AD3291",
              borderRadius: "8px",
              padding: "8px 32px",
              fontSize: "14px",
              fontWeight: 500,
              "&:hover": {
                borderColor: button.color || "#AD3291",
                backgroundColor: `${button.color || "#AD3291"}10`,
              },
            }}
          >
            {button.text}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
