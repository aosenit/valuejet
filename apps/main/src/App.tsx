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
import LoginOtp from "./pages/LoginOtp";

import Forgot from "./pages/forgot";
import ResetOtp from "./pages/ResetOtp";

import MainLayout from "./components/layouts/MainLayout";
import ManageUsersSection from "./pages/UserManagement/ManageUsersModule/ManageUsersSection";
import UserProfile from "./pages/UserManagement/UserProfile";

function App() {
  return (
    <Router>
      <AppWithErrorHandling>
        <Routes>
          <Route
            path="/manage-users"
            element={
              <MainLayout>
                <ManageUsersSection />
              </MainLayout>
            }
          />
          <Route
            path="/manage-users/user-profile"
            element={
              <MainLayout>
                <UserProfile />
              </MainLayout>
            }
          />

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
              <MainLayout>
                <div>Dashboard</div>
              </MainLayout>
            }
          />
          <Route
            path="/incidence-management"
            element={
              <MainLayout>
                <div>Incidence Management</div>
              </MainLayout>
            }
          />
          <Route
            path="/customer-management"
            element={
              <MainLayout>
                <div>Customer Management</div>
              </MainLayout>
            }
          />
          <Route
            path="/escalation-management"
            element={
              <MainLayout>
                <div>Escalation Management</div>
              </MainLayout>
            }
          />
          <Route
            path="/department"
            element={
              <MainLayout>
                <div>Department</div>
              </MainLayout>
            }
          />
          <Route
            path="/knowledge-base"
            element={
              <MainLayout>
                <div>Knowledge Base</div>
              </MainLayout>
            }
          />
          <Route
            path="/approval-workflow"
            element={
              <MainLayout>
                <div>Approval Workflow</div>
              </MainLayout>
            }
          />
          <Route
            path="/audit-trail"
            element={
              <MainLayout>
                <div>Audit Trail</div>
              </MainLayout>
            }
          />
          <Route
            path="/user-management"
            element={
              <MainLayout>
                <div>User Management</div>
              </MainLayout>
            }
          />
          <Route
            path="/manage-roles"
            element={
              <MainLayout>
                <div>Manage Roles</div>
              </MainLayout>
            }
          />
          <Route
            path="/general-settings"
            element={
              <MainLayout>
                <div>General Settings</div>
              </MainLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <MainLayout>
                <div>Notifications</div>
              </MainLayout>
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
