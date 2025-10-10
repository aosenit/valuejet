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

const schema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

const LoginOtp = () => {
  const loginMutation = usePostData("auth/verify-otp");
  const resendOtpMutation = usePostData("auth/resend-otp");
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const location = searchParams.get("location");
  const userId = searchParams.get("userId");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      const payload = {
        user_uuid: userId,
        otp: values.otp,
        context: "login", // OPTIONAL: login|reset|password|other
      };
      try {
        const response = await loginMutation.mutateAsync(payload);

        if (response) {
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
          localStorage.setItem("access_token", response?.data?.token);
          // expires at
          localStorage.setItem("expires_at", response?.data?.expires_at);
          console.log(response);
          toast.success("OTP verified successfully");
          const targetPage = location?.includes(location)
            ? location
            : "/dashboard";
          navigate(targetPage, { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    const payload = {
      email: email,
      context: "login",
    };

    try {
      const response = await resendOtpMutation.mutateAsync(payload);
      if (response) {
        toast.success(response?.message || "OTP resent successfully");
        formik.setFieldValue("otp", "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="text-left mb-4">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit code to {email || "your email"}. Enter it below
          to continue.
        </p>
      </div>

      {loginMutation.isError && (
        <Alert severity="error" className="mb-6">
          {loginMutation.error?.message || "Invalid OTP. Please try again."}
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
                loginMutation.isPending || formik.values.otp.length !== 6
              }
              sx={{
                height: 45,
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              {loginMutation.isPending ? "Verifying..." : "Verify Code"}
              <img src={arrowRight} alt="" className="ml-2" />
            </Button>
          </FormControl>

          {/* Resend OTP */}
          <div className="text-center">
            <Typography variant="body2" className="text-gray-600 mb-2">
              Didn't receive the code?
            </Typography>
            <button
              onClick={handleResendOtp}
              className="hover:underline text-sm cursor-pointer"
              style={{
                color: "var(--brand-color)",
                fontWeight: "500",
              }}
            >
              Resend Code
            </button>
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

export default LoginOtp;
