import React from "react";
import UserOverviewEmptyState from "./UserOverviewEmptyState";
import UsersTableEmptyState from "./UsersTableEmptyState";

type ManageUsersProps = {
  stats: {
    allUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  };
  onCreateUser: () => void;
  onExport: () => void;
  onFilter: () => void;
  title: string;
  description: string;
  overviewTitle: string;
  overviewDescription: string;
  tableTitle: string;
  tableDescription: string;
};

const ManageUsersEmptyState: React.FC<ManageUsersProps> = ({
  stats,
  onCreateUser,
  onExport,
  onFilter,
  title,
  description,
  overviewTitle,
  overviewDescription,
  tableTitle,
  tableDescription,
}) => {
  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10 ">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6 py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h2 className="text-xl font-semibold text-[#101828]">{title}</h2>
          <p className="text-sm text-[#667085]">{description}</p>
        </div>

        <button
          onClick={onCreateUser}
          className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Create New User +
        </button>
      </div>

      {/* User Overview */}
      <UserOverviewEmptyState
        stats={stats}
        title={overviewTitle}
        description={overviewDescription}
      />

      {/* Users Table */}
      <UsersTableEmptyState
        onCreateUser={onCreateUser}
        onExport={onExport}
        onFilter={onFilter}
        title={tableTitle}
        description={tableDescription}
      />
    </div>
  );
};

export default ManageUsersEmptyState;
