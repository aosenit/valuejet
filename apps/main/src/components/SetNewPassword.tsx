import { useState } from "react";
import {
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOutline,
  Check,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const navigate = useNavigate();

  const handlePasswordReset = () => {
    navigate("/password-reset-successful");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password && password !== newConfirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const allValidationsPassed =
    hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  return (
    <div className="">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Set new password?
        </h1>
        <p className="text-gray-600 text-sm">
          Your password must be different from previously used password.
        </p>
      </div>

      <div className="grid gap-4">
        <FormControl variant="outlined" className="w-full space-y-1">
          <label htmlFor="password">Enter New Password</label>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            size="small"
            onChange={handlePasswordChange}
            placeholder="Enter password"
            startAdornment={
              <InputAdornment position="start">
                <LockOutline fontSize="small" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              "aria-label": "password",
            }}
          />
        </FormControl>

        <FormControl variant="outlined" className="w-full space-y-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <OutlinedInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            size="small"
            onChange={handleConfirmPasswordChange}
            placeholder="Enter password"
            error={passwordMismatch}
            startAdornment={
              <InputAdornment position="start">
                <LockOutline fontSize="small" />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff fontSize="small" />
                  ) : (
                    <Visibility fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            inputProps={{
              "aria-label": "confirm password",
            }}
          />
          {passwordMismatch && (
            <p className="text-red-500 text-sm mt-1">Password must match</p>
          )}
        </FormControl>

        {/* Password Requirements */}
        <div className="bg-[#f9f6f8] rounded-xl p-4 space-y-2">
          <div
            className={`flex items-center gap-2 text-sm ${
              hasMinLength ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                hasMinLength
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {hasMinLength && (
                <Check className=" text-white p-1" fontSize="small" />
              )}
            </div>
            Minimum 8 character long
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${
              hasUppercase ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                hasUppercase
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {hasUppercase && (
                <Check className=" text-white p-1" fontSize="small" />
              )}
            </div>
            One uppercase letter
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${
              hasLowercase ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                hasLowercase
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {hasLowercase && (
                <Check className=" text-white p-1" fontSize="small" />
              )}
            </div>
            One lowercase letter
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${
              hasNumber ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                hasNumber ? "bg-green-500 border-green-500" : "border-gray-300"
              }`}
            >
              {hasNumber && (
                <Check className=" text-white p-1" fontSize="small" />
              )}
            </div>
            One number 0-9
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${
              hasSpecialChar ? "text-green-600" : "text-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                hasSpecialChar
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300"
              }`}
            >
              {hasSpecialChar && (
                <Check className=" text-white p-1" fontSize="small" />
              )}
            </div>
            One special character (!@#$%*+-?)
          </div>
        </div>

        <div className="py-1"></div>

        <FormControl className="w-full">
          <Button
            onClick={handlePasswordReset}
            disabled={
              !allValidationsPassed || passwordMismatch || !confirmPassword
            }
            fullWidth
            variant="contained"
            size="large"
          >
            Reset Password
          </Button>
        </FormControl>
      </div>
    </div>
  );
}
