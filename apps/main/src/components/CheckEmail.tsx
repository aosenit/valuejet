import { Mail, RotateRightOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function CheckEmailForm() {
  const [countdown, setCountdown] = useState(54);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // In your CheckEmail component:
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="space-y-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 text-sm">
          We've sent a password reset link to{" "}
          <span className="font-medium">"{email}"</span>
        </p>
      </div>

      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
          <RotateRightOutlined className="text-[var(--brand-color)]" />
          <span className="text-[var(--brand-color)]">Resend code</span>
          <span>in {formatTime(countdown)}</span>
        </div>
      </div>

      <Button variant="contained" className="w-full">
        Open Gmail <Mail className="ml-2 " fontSize="small" />
      </Button>

      <div className="text-right mt-3 ">
        <button
          onClick={handleBackToSignIn}
          className="text-[var(--brand-color)] text-sm font-medium underline"
        >
          Return to sign in
        </button>
      </div>
    </div>
  );
}
