import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./components/SignIn";
import PasswordResetSuccessful from "./components/PasswordResetSuccessful";
import { AuthLayout } from "./components/AuthLayout";
import { CheckEmailForm } from "./components/CheckEmail";
import SetNewPassword from "./components/SetNewPassword";
import { AppWithErrorHandling } from "./components/expired/AppWithErrorHandling";
import Protected from "./components/Protected";
import LoginOtp from "./pages/LoginOtp";
import Forgot from "./pages/forgot";
import ResetOtp from "./pages/ResetOtp";

function App() {
  return (
    <Router>
      <AppWithErrorHandling>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/verify-signin-otp" element={<LoginOtp />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-otp" element={<ResetOtp />} />
            <Route path="/check-email" element={<CheckEmailForm />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route
              path="/password-reset-successful"
              element={<PasswordResetSuccessful />}
            />
          </Route>

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <Protected>
                <div>Dashboard</div>
              </Protected>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </AppWithErrorHandling>
    </Router>
  );
}

export default App;
