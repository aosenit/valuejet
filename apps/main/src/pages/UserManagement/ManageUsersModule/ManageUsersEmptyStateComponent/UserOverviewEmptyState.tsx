import React from "react";
import { Card, CardContent } from "@mui/material";
import { UserRoundCheck, UserRoundMinus, Users } from "lucide-react";
import clsx from "clsx";

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
    <Card className="w-full rounded-lg border border-gray-200">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
          <span className="text-xs text-gray-400">{description}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 flex items-center justify-center rounded-full",
            color
          )}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
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
          color="bg-gray-100 text-gray-700"
          icon={<Users className="w-5 h-5" />}
        />
        <UserStatCard
          title="Active Users"
          value={stats.activeUsers}
          description="No data available"
          color="bg-green-100 text-green-600"
          icon={<UserRoundCheck className="w-5 h-5" />}
        />
        <UserStatCard
          title="Inactive Users"
          value={stats.inactiveUsers}
          description="No data available"
          color="bg-yellow-100 text-yellow-600"
          icon={<UserRoundMinus className="w-5 h-5" />}
        />
      </div>
    </div>
  );
};

export default UserOverviewEmptyState;
