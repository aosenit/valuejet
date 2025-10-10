import { Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { empty } from "../../../assets/assets";

interface UserRoleEmptyStateProps {
  onCreateRole: () => void;
  onExport: () => void;
  onFilter: () => void;
}

export default function UserRoleEmptyState({
  onCreateRole,
  onExport,
  onFilter,
}: UserRoleEmptyStateProps) {
  console.log(onCreateRole, onExport, onFilter);
  return (
    <div className="space-y-6 bg-[#F9F6F8] pb-10">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-10 bg-white border-y border-[#D0D5DD]">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            Manage User Roles
          </h1>
          <p className="text-sm text-[#667085]">
            View and manage all user roles in the system.
          </p>
        </div>
        <Link to="/create-role">
          <button className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Create New User Role +
          </button>
        </Link>
      </div>

      {/* Role Overview Cards */}
      <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 m-10">
        <div>
          <h1 className="text-xl font-semibold text-[#101828]">
            User Role Overview
          </h1>
          <p className="text-sm text-[#667085]">
            A snapshot of user role data.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* All Roles Card */}
          <div className="rounded-lg p-4 flex items-center justify-center border border-gray-300 bg-gray-50">
            <div className="rounded-lg flex flex-col w-full">
              <span className="text-sm text-gray-500">All Roles</span>
              <span className="text-2xl font-semibold">0</span>
              <span className="mt-2 text-xs text-gray-500">
                No data available
              </span>
            </div>
            <span className="p-2 rounded-md bg-gray-100 text-gray-600 flex items-center justify-center">
              <Shield size={20} />
            </span>
          </div>

          {/* Active Roles Card */}
          <div className="rounded-lg p-4 flex items-center justify-center border border-green-300 bg-green-50">
            <div className="rounded-lg flex flex-col w-full">
              <span className="text-sm text-gray-500">Active Roles</span>
              <span className="text-2xl font-semibold">0</span>
              <span className="mt-2 text-xs text-gray-500">
                No data available
              </span>
            </div>
            <span className="p-2 rounded-md bg-green-100 text-green-600 flex items-center justify-center">
              <Users size={20} />
            </span>
          </div>

          {/* Deactivated Roles Card */}
          <div className="rounded-lg p-4 flex items-center justify-center border border-orange-300 bg-orange-50">
            <div className="rounded-lg flex flex-col w-full">
              <span className="text-sm text-gray-500">Deactivated Roles</span>
              <span className="text-2xl font-semibold">0</span>
              <span className="mt-2 text-xs text-gray-500">
                No data available
              </span>
            </div>
            <span className="p-2 rounded-md bg-orange-100 text-orange-600 flex items-center justify-center">
              <Shield size={20} />
            </span>
          </div>
        </div>
      </div>

      {/* All Roles List Section */}
      <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] m-10 p-4 space-y-4">
        <div className="border-b border-[#F2DDED] pb-4">
          <h1 className="text-xl font-semibold text-[#101828]">
            All User Roles
          </h1>
          <p className="text-sm text-[#667085]">
            A list of all user roles and number of users in the system.
          </p>
        </div>

        {/* Search and Export Bar */}
        <div className="flex justify-between items-center">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              disabled
            />
          </div>
          <button
            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={onExport}
          >
            Export
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-20 h-20  flex items-center justify-center mb-4">
            <img
              src={empty}
              alt="empty"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-lg font-semibold text-[#101828] mb-2">
            No User Role
          </h3>
          <p className="text-sm text-[#667085] text-center mb-6">
            You currently don't have a User Role Created Yet
          </p>
          <Link to="/create-role">
            <button className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg text-sm font-medium">
              Create New User Role +
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
