import { Skeleton } from "@mui/material";

interface TableSkeletonLoaderProps {
  rows?: number;
  columns?: number;
  hasCheckbox?: boolean;
  hasAction?: boolean;
}

export default function TableSkeletonLoader({
  rows = 10,
  columns = 5,
  hasCheckbox = true,
  hasAction = true,
}: TableSkeletonLoaderProps) {
  return (
    <div className="space-y-4">
      {/* Table Header Skeleton */}
      <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-t-lg">
        {hasCheckbox && (
          <Skeleton variant="rectangular" width={20} height={20} />
        )}
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={`header-${index}`}
            variant="text"
            width={`${100 / columns}%`}
            height={20}
          />
        ))}
        {hasAction && <Skeleton variant="rectangular" width={24} height={24} />}
      </div>

      {/* Table Rows Skeleton */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex items-center gap-4 p-3 border-b border-gray-200"
        >
          {hasCheckbox && (
            <Skeleton variant="rectangular" width={20} height={20} />
          )}
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="flex flex-col gap-1"
              style={{ width: `${100 / columns}%` }}
            >
              <Skeleton variant="text" width="80%" height={16} />
              <Skeleton variant="text" width="60%" height={14} />
            </div>
          ))}
          {hasAction && <Skeleton variant="circular" width={24} height={24} />}
        </div>
      ))}
    </div>
  );
}

// Specific skeleton loader for user management table
export function UserTableSkeletonLoader() {
  return (
    <div className="overflow-x-auto rounded-lg bg-white border border-[#D0D5DD] mx-10 p-4 space-y-4">
      {/* Header Section Skeleton */}
      <div className="border-b border-[#F2DDED] pb-4">
        <Skeleton variant="text" width={150} height={28} className="mb-2" />
        <Skeleton variant="text" width={400} height={20} />
      </div>

      {/* Search and Filter Section Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ flex: 1, borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={40}
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="rectangular"
          width={100}
          height={40}
          sx={{ borderRadius: 1 }}
        />
      </div>

      {/* Table Skeleton */}
      <TableSkeletonLoader
        rows={10}
        columns={4}
        hasCheckbox={false}
        hasAction={true}
      />

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Skeleton variant="text" width={200} height={20} />
        <div className="flex items-center gap-2">
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={`page-${index}`}
                variant="rectangular"
                width={32}
                height={32}
                sx={{ borderRadius: 1 }}
              />
            ))}
          </div>
          <Skeleton
            variant="rectangular"
            width={80}
            height={32}
            sx={{ borderRadius: 1 }}
          />
        </div>
      </div>
    </div>
  );
}

// Overview cards skeleton loader
export function OverviewCardsSkeletonLoader() {
  return (
    <div className="space-y-4 border border-[#D0D5DD] bg-white rounded-lg p-4 m-10">
      <div>
        <Skeleton variant="text" width={150} height={28} className="mb-2" />
        <Skeleton variant="text" width={300} height={20} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`card-${index}`}
            className="rounded-lg p-4 border border-gray-300 bg-gray-50"
          >
            <Skeleton variant="text" width={100} height={20} className="mb-2" />
            <Skeleton variant="text" width={80} height={36} className="mb-2" />
            <Skeleton variant="text" width={200} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
}
