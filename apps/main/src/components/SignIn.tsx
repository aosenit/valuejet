import { useState } from "react";
import {
  Button,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutline,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as z from "zod";

import { useLocation, useNavigate } from "react-router-dom";
import { arrowRight } from "../utils/icons";

import { toFormikValidationSchema } from "zod-formik-adapter";
import { usePostData } from "../hooks/useApis";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AuthPages = [
  "/signin",
  "/register",
  "/forgot-password",
  "/check-email",
  "/set-new-password",
  "/password-reset-successful",
  "/verify-signin-otp",
];

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignIn = () => {
  const loginMutation = usePostData("auth/login");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      try {
        const response = await loginMutation.mutateAsync(values);
        const from = location.state?.from?.pathname;
        if (response) {
          // should not include any of the AuthPages
          const targetPage =
            from && AuthPages.includes(from) ? from : "/dashboard";
          toast.success("OTP sent to your email");
          navigate(
            `/verify-signin-otp?userId=${response?.data?.user_id}&email=${values.email}&location=${targetPage}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="">
      <div className="text-left mb-6">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Sign in to your account
        </h1>
        <p className="text-gray-600 text-sm">
          Enter your sign in credentials below.
        </p>
      </div>
      {loginMutation.isError && (
        <Alert severity="error" className="mt-1">
          {loginMutation.error.message || "Invalid credentials"}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <div className=" grid gap-4">
          <FormControl variant="outlined" className="w-full space-y-1">
            <label htmlFor="email">Email</label>
            <OutlinedInput
              id="email"
              value={formik.values.email}
              size="small"
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlined fontSize="small" />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
            />
            {formik.errors.email && (
              <Alert severity="warning" className="mt-1">
                {formik.errors.email}
              </Alert>
            )}
          </FormControl>

          <FormControl variant="outlined" className="w-full space-y-1">
            <label htmlFor="password">Password</label>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutline fontSize="small" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
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
            />
            {formik.errors.password && (
              <Alert severity="warning" className="mt-1">
                {formik.errors.password}
              </Alert>
            )}
          </FormControl>
          <div className="py-1"></div>
          <FormControl className="w-full ">
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}{" "}
              <img src={arrowRight} alt="" />
            </Button>
          </FormControl>

          <div className="text-right">
            <Link
              to={"/forgot-password"}
              className="underline"
              style={{ color: "var(--brand-color)" }}
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
