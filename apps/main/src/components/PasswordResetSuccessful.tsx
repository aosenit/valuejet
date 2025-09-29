import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { arrowRight } from "../utils/icons";

const PasswordResetSuccessful = () => {
  // In your PasswordResetSuccessful component:
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/signin");
  };
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h1 className="text-2xl font-bold text-[var(--brand-color)] mb-2">
          Password Reset Successful
        </h1>
        <p className="text-gray-600 text-sm">
          Your password has been reset. Click the button below to log in to your
          account.
        </p>
        <div className="py-2"></div>
      </div>

      <Button
        onClick={handleBackToLogin}
        className="w-full"
        variant="contained"
      >
        Login <img src={arrowRight} alt="" />
      </Button>
    </div>
  );
};

export default PasswordResetSuccessful;
