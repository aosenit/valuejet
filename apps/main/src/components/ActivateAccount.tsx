import { useState, useEffect } from "react";
import {
  Button,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Alert,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePostData } from "../hooks/useApis";
import { toast } from "sonner";
import { arrowRight } from "../utils/icons";

export default function ActivateAccount() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activateAccountMutation = usePostData("users/activate-account");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (tokenParam) {
      setToken(tokenParam);
    }
    if (emailParam) {
      setEmail(emailParam);
    }

    if (!tokenParam) {
      toast.error("Invalid activation link");
      navigate("/signin");
    }
  }, [searchParams, navigate]);

  const handleActivateAccount = async () => {
    // Validate passwords
    if (!password) {
      setError("Password is required");
      return;
    }

    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setError(`Password requirements not met: ${validationErrors.join(", ")}`);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload = {
        token,
        password,
        password_confirmation: confirmPassword,
      };

      const response = await activateAccountMutation.mutateAsync(payload);

      if (response) {
        toast.success("Account activated successfully! Please sign in.");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error activating account:", error);
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (error as Error)?.message ||
        "Failed to activate account. Please try again or contact support.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const validatePassword = (pwd: string) => {
    const errors = [];

    if (pwd.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Z]/.test(pwd)) {
      errors.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(pwd)) {
      errors.push("At least one lowercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
      errors.push("At least one symbol");
    }

    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Real-time validation
    if (newPassword) {
      const validationErrors = validatePassword(newPassword);
      if (validationErrors.length > 0) {
        setError(validationErrors.join(", "));
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check password match
    if (newConfirmPassword && password && newConfirmPassword !== password) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
    <div className="">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Activate Your Account
        </h1>
        <p className="text-sm text-gray-600">
          {email
            ? `Set up your password for ${email}`
            : "Set up your password to activate your account"}
        </p>
      </div>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <div className="space-y-4">
        {/* Password Field */}
        <FormControl fullWidth variant="outlined">
          <Typography
            className="block !text-sm font-medium text-gray-700 !mb-2"
            component="label"
          >
            Password
          </Typography>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined sx={{ color: "#667085", fontSize: "18px" }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: "18px" }} />
                  ) : (
                    <Visibility sx={{ fontSize: "18px" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D0D5DD",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#AD3291",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#AD3291",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
          />
        </FormControl>
        <div className="py-1"></div>

        {/* Confirm Password Field */}
        <FormControl fullWidth variant="outlined">
          <Typography
            className="block !text-sm font-medium text-gray-700 !mb-2"
            component="label"
          >
            Confirm Password
          </Typography>
          <OutlinedInput
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <LockOutlined sx={{ color: "#667085", fontSize: "18px" }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? (
                    <VisibilityOff sx={{ fontSize: "18px" }} />
                  ) : (
                    <Visibility sx={{ fontSize: "18px" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D0D5DD",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#AD3291",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#AD3291",
              },
              "& .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
          />
        </FormControl>

        {/* Password Requirements */}
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#F9FAFB", borderRadius: 1 }}>
          <Typography
            variant="caption"
            sx={{ color: "#667085", display: "block", mb: 1 }}
          >
            Password must contain:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20, listStyle: "none" }}>
            <li>
              <Typography
                variant="caption"
                sx={{
                  color: password.length >= 8 ? "#10B981" : "#667085",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {password.length >= 8 ? "✓" : "○"} At least 8 characters
              </Typography>
            </li>
            <li>
              <Typography
                variant="caption"
                sx={{
                  color: /[A-Z]/.test(password) ? "#10B981" : "#667085",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {/[A-Z]/.test(password) ? "✓" : "○"} At least one uppercase
                letter (A-Z)
              </Typography>
            </li>
            <li>
              <Typography
                variant="caption"
                sx={{
                  color: /[a-z]/.test(password) ? "#10B981" : "#667085",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {/[a-z]/.test(password) ? "✓" : "○"} At least one lowercase
                letter (a-z)
              </Typography>
            </li>
            <li>
              <Typography
                variant="caption"
                sx={{
                  color: /[!@#$%^&*(),.?":{}|<>]/.test(password)
                    ? "#10B981"
                    : "#667085",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? "✓" : "○"} At least
                one symbol (!@#$%^&*(),.?":{}|&lt;&gt;)
              </Typography>
            </li>
          </ul>
        </Box>

        {/* Activate Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleActivateAccount}
          disabled={activateAccountMutation.isPending}
          sx={{
            mt: 3,
            backgroundColor: "#AD3291",
            "&:hover": {
              backgroundColor: "#8B2674",
            },
            textTransform: "none",
            py: 1,
          }}
          endIcon={<img src={arrowRight} alt="arrow-right" />}
        >
          {activateAccountMutation.isPending
            ? "Activating..."
            : "Activate Account"}
        </Button>
      </div>
    </div>
  );
}
