import {
  Button,
  Link,
  FormControl,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as z from "zod";

import { useNavigate, useSearchParams } from "react-router-dom";
import { arrowRight } from "../utils/icons";

import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostData } from "../hooks/useApis";
import { toast } from "sonner";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";

const schema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

const ResetOtp = () => {
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isTokenVerified, setIsTokenVerified] = useState<boolean>(false);

  const verifyTokenMutation = usePostData("auth/reset-password/initiate");
  const verifyOtpMutation = usePostData("auth/reset-password/verify-otp");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract email and token from URL params
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (tokenParam) {
      setToken(tokenParam);
      // Automatically verify token when component mounts
      verifyToken(emailParam || "", tokenParam);
    }
  }, [searchParams]);

  const verifyToken = async (email: string, token: string) => {
    try {
      const payload = {
        email,
        token,
      };

      const response = await verifyTokenMutation.mutateAsync(payload);

      if (response) {
        setIsTokenVerified(true);
        toast.success("Token verified successfully");
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      toast.error("Invalid or expired token. Please request a new reset link.");
      // Redirect to forgot password page after a delay
      setTimeout(() => {
        navigate("/forgot-password");
      }, 3000);
    }
  };

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      if (!isTokenVerified || !email || !token) {
        toast.error("Invalid session. Please request a new reset link.");
        navigate("/forgot-password");
        return;
      }

      const payload = {
        email,
        token,
        otp: values.otp,
      };

      try {
        const response = await verifyOtpMutation.mutateAsync(payload);

        if (response) {
          toast.success("OTP verified successfully");
          // Navigate to set new password page with email and token
          navigate("/set-new-password", {
            state: {
              email,
              token,
            },
          });
        }
      } catch (error) {
        console.error("OTP verification failed:", error);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Resend OTP handler
  const handleResendOtp = () => {
    // Implement resend OTP logic here
    console.log("Resend OTP");
    toast.info("OTP resend functionality not implemented yet");
  };

  // Show loading state while verifying token
  if (verifyTokenMutation.isPending) {
    return (
      <div className="">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
            Verifying Reset Link
          </h1>
          <p className="text-gray-600 text-sm">
            Please wait while we verify your reset link...
          </p>
        </div>
      </div>
    );
  }

  // Show error if token verification failed
  if (verifyTokenMutation.isError) {
    return (
      <div className="">
        <div className="text-left mb-6">
          <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 text-sm">
            Your reset link is invalid or has expired. Redirecting to forgot
            password page...
          </p>
        </div>
        <Alert severity="error" className="mb-4">
          {verifyTokenMutation.error?.message || "Invalid or expired token"}
        </Alert>
      </div>
    );
  }

  return (
    <div className="">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit code to {email || "your email"}. Enter it below
          to continue with password reset.
        </p>
      </div>

      {verifyOtpMutation.isError && (
        <Alert severity="error" className="mb-4">
          {verifyOtpMutation.error?.message || "Invalid OTP. Please try again."}
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6">
          {/* OTP Input Fields */}
          <FormControl className="w-full">
            <label
              htmlFor="otp"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Verification Code
            </label>
            <Box className="flex gap-3 justify-center">
              <OtpInput
                value={formik.values.otp}
                onChange={(value) => formik.setFieldValue("otp", value)}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                containerStyle={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "5px",
                }}
                inputStyle={{
                  width: "45px",
                  height: "45px",
                  margin: "0 4px",
                  fontSize: "16px",
                  textAlign: "center",
                  border: "1px solid var(--brand-color)",
                  borderRadius: "4px",
                  padding: "4px",
                }}
              />
            </Box>
            {formik.errors.otp && (
              <Alert severity="warning" className="mt-2">
                {formik.errors.otp}
              </Alert>
            )}
          </FormControl>

          {/* Submit Button */}
          <FormControl className="w-full">
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={
                verifyOtpMutation.isPending ||
                formik.values.otp.length !== 6 ||
                !isTokenVerified
              }
              sx={{
                height: 45,
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify Code"}
              <img src={arrowRight} alt="" className="ml-2" />
            </Button>
          </FormControl>

          {/* Resend OTP */}
          <div className="text-center">
            <Typography variant="body2" className="text-gray-600 mb-2">
              Didn't receive the code?
            </Typography>
            <Link
              component="button"
              variant="body2"
              onClick={handleResendOtp}
              className="underline"
              sx={{
                color: "var(--brand-color)",
                fontWeight: "500",
              }}
            >
              Resend Code
            </Link>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/signin")}
              className="text-gray-600 hover:text-gray-800"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetOtp;
