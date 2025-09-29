import { useState } from "react";
import {
  Button,
  InputAdornment,
  Link,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  const handleBackToSignIn = () => {
    navigate("/signin");
  };

  const handleSendResetLink = (email: string) => {
    navigate("/check-email", { state: { email } });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(newEmail);
    setIsValid(valid);

    // Show error for invalid email format
    if (newEmail && !valid) {
      setError("Invalid Email Address");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (isValid && email) {
      handleSendResetLink(email);
    }
  };

  return (
    <div className="">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Forgot password?
        </h1>
        <p className="text-gray-600 text-sm">
          Enter your email to reset your password.
        </p>
      </div>

      <div className="grid gap-4">
        <FormControl variant="outlined" className="w-full space-y-1">
          <label htmlFor="email">Email</label>
          <OutlinedInput
            id="email"
            type="email"
            value={email}
            size="small"
            onChange={handleEmailChange}
            placeholder="Kemex@gmail.com"
            startAdornment={
              <InputAdornment position="start">
                <EmailOutlined fontSize="small" />
              </InputAdornment>
            }
            error={!!error}
            aria-describedby="email-helper-text"
            inputProps={{
              "aria-label": "email",
            }}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1" id="email-helper-text">
              {error}
            </p>
          )}
        </FormControl>

        <div className="py-1"></div>

        <FormControl className="w-full">
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            fullWidth
            variant="contained"
            size="large"
          >
            Send password reset link
          </Button>
        </FormControl>

        <div className="text-right">
          <span className="text-gray-500 text-sm">Remember password? </span>
          <Link
            component="button"
            variant="body2"
            onClick={handleBackToSignIn}
            className="underline"
            sx={{ color: "var(--brand-color)" }}
          >
            Return to sign in.
          </Link>
        </div>
      </div>
    </div>
  );
}
