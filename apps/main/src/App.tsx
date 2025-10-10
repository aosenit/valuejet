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
import UserRoleDashboard from "./pages/UserManagement/UserRoleModule/UserRoleDashboard";
import CreateUser from "./pages/UserManagement/CreateUser";
import CreateRole from "./pages/UserManagement/CreateRole";
import ViewRole from "./pages/UserManagement/ViewRole";
import UserProfile from "./pages/UserManagement/UserProfile";
import CustomerManagementDashboard from "./pages/CustomerManagement/CustomerManagementDashboard";
import IncidenceManagementDashboard from "./pages/IncidenceManagement/IncidenceManagementDashboard";
import EscalationManagementDashboard from "./pages/EscalationManagement/EscalationManagementDashboard";
import DepartmentManagementDashboard from "./pages/DepartmentManagement/DepartmentManagementDashboard";
import AuditTrailDashboard from "./pages/AuditTrail/AuditTrailDashboard";
import KnowledgeBaseDashboard from "./pages/KnowledgeBase/KnowledgeBaseDashboard";
import ApprovalWorkflowDashboard from "./pages/ApprovalWorkflow/ApprovalWorkflowDashboard";

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
          <Route
            path="/create-user"
            element={
              <MainLayout>
                <CreateUser />
              </MainLayout>
            }
          />
          <Route
            path="/create-role"
            element={
              <MainLayout>
                <CreateRole />
              </MainLayout>
            }
          />
          <Route
            path="/view-role/:roleId"
            element={
              <MainLayout>
                <ViewRole />
              </MainLayout>
            }
          />
          <Route
            path="/user-profile/:userId"
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
                <IncidenceManagementDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/incidence-management"
            element={
              <MainLayout>
                <IncidenceManagementDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/customer-management"
            element={
              <MainLayout>
                <CustomerManagementDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/escalation-management"
            element={
              <MainLayout>
                <EscalationManagementDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/department"
            element={
              <MainLayout>
                <DepartmentManagementDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/knowledge-base"
            element={
              <MainLayout>
                <KnowledgeBaseDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/approval-workflow"
            element={
              <MainLayout>
                <ApprovalWorkflowDashboard />
              </MainLayout>
            }
          />
          <Route
            path="/audit-trail"
            element={
              <MainLayout>
                <AuditTrailDashboard />
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
                <UserRoleDashboard />
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
