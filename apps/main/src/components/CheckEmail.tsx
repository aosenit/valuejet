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

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // Detect email provider and get appropriate URL
  const getEmailProviderUrl = (email: string) => {
    if (!email) return null;

    const domain = email.split("@")[1]?.toLowerCase();

    const providers: Record<string, string> = {
      "gmail.com": "https://mail.google.com",
      "outlook.com": "https://outlook.live.com",
      "hotmail.com": "https://outlook.live.com",
      "yahoo.com": "https://mail.yahoo.com",
      "icloud.com": "https://www.icloud.com/mail",
      "apple.com": "https://www.icloud.com/mail",
      "aol.com": "https://mail.aol.com",
      "protonmail.com": "https://mail.protonmail.com",
      "yandex.com": "https://mail.yandex.com",
      "yopmail.com": "https://yopmail.com",
    };

    return providers[domain] || null;
  };

  const getEmailProviderName = (email: string) => {
    if (!email) return "Email";

    const domain = email.split("@")[1]?.toLowerCase();

    const providers: Record<string, string> = {
      "gmail.com": "Gmail",
      "outlook.com": "Outlook",
      "hotmail.com": "Outlook",
      "yahoo.com": "Yahoo Mail",
      "icloud.com": "iCloud Mail",
      "apple.com": "iCloud Mail",
      "aol.com": "AOL Mail",
      "protonmail.com": "ProtonMail",
      "yandex.com": "Yandex Mail",
      "yopmail.com": "Yopmail",
    };

    return providers[domain] || "Email";
  };

  const handleOpenEmail = () => {
    const emailUrl = getEmailProviderUrl(email);
    if (emailUrl) {
      window.open(emailUrl, "_blank");
    } else {
      // Fallback: try to open default email client
      window.open("mailto:", "_blank");
    }
  };

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
        {email && (
          <p className="text-gray-500 text-xs mt-1">
            Click the button below to open {getEmailProviderName(email)} and
            check your inbox
          </p>
        )}
      </div>

      <div className="text-center py-4">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
          <RotateRightOutlined className="text-[var(--brand-color)]" />
          <span className="text-[var(--brand-color)]">Resend code</span>
          <span>in {formatTime(countdown)}</span>
        </div>
      </div>

      <Button variant="contained" className="w-full" onClick={handleOpenEmail}>
        Open {getEmailProviderName(email)}{" "}
        <Mail className="ml-2" fontSize="small" />
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
