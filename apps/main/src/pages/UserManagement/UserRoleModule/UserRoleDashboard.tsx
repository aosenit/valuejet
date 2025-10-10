import { useState } from "react";

import UserRoleEmptyState from "./UserRoleEmptyState";
import UserRoleFilledState from "./UserRoleFilledState";
import { toast } from "sonner";

export default function UserRoleDashboard() {
  const [isEmpty, setIsEmpty] = useState(false); // Changed to false to show filled state

  const handleFilled = () => {
    setIsEmpty(false);
  };

  const handleExport = () => {
    toast.warning("No User Roles to Export");
  };

  const handleFilter = () => {
    toast.warning("No User Roles to Filter");
  };

  return (
    <>
      {isEmpty ? (
        <UserRoleEmptyState
          onCreateRole={handleFilled}
          onExport={handleExport}
          onFilter={handleFilter}
        />
      ) : (
        <UserRoleFilledState onCreateUserRole={handleFilled} />
      )}
    </>
  );
}
