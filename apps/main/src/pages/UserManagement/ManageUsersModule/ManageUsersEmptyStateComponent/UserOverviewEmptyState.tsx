import React from "react";
import { UserRoundCheck, UserRoundMinus, Users } from "lucide-react";

type UserStatCardProps = {
  title: string;
  value: number;
  description: string;
  color: string;
  icon?: React.ReactNode;
};

const UserStatCard: React.FC<UserStatCardProps> = ({
  title,
  value,
  description,
  color,
  icon,
}) => {
  return (
    <div className={`rounded-lg p-4 flex items-center justify-center ${color}`}>
      <div className="rounded-lg flex flex-col w-full">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl font-semibold">{value}</span>
        <span className="mt-2 text-xs text-gray-400 italic">{description}</span>
      </div>
      <span className="p-2 rounded-md bg-gray-100 flex items-center justify-center">
        {icon}
      </span>
    </div>
  );
};

type UserOverviewProps = {
  stats: {
    allUsers: number;
    activeUsers: number;
    inactiveUsers: number;
  };
  title: string;
  description: string;
};

const UserOverviewEmptyState: React.FC<UserOverviewProps> = ({
  stats,
  title,
  description,
}) => {
  return (
    <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 m-10">
      <h3 className="text-xl font-semibold text-[#101828]">{title}</h3>
      <p className="text-sm text-[#667085]">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UserStatCard
          title="All Users"
          value={stats.allUsers}
          description="No data available"
          color="border border-gray-300 bg-gray-50"
          icon={<Users className="w-5 h-5 text-gray-600" />}
        />
        <UserStatCard
          title="Active Users"
          value={stats.activeUsers}
          description="No data available"
          color="border border-green-300 bg-green-50"
          icon={<UserRoundCheck className="w-5 h-5 text-green-600" />}
        />
        <UserStatCard
          title="Inactive Users"
          value={stats.inactiveUsers}
          description="No data available"
          color="border border-orange-300 bg-orange-50"
          icon={<UserRoundMinus className="w-5 h-5 text-orange-600" />}
        />
      </div>
    </div>
  );
};

export default UserOverviewEmptyState;
