import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;

  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,

  maxVisiblePages = 7,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage <= 4) {
      pages.push(...Array.from({ length: 4 }, (_, i) => i + 2));
      pages.push("...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(
        "...",
        ...Array.from({ length: 5 }, (_, i) => totalPages - 4 + i)
      );
    } else {
      pages.push(
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
      <span className="text-sm text-[#667085]">
        Showing {startItem} to {endItem} of {totalItems} results
      </span>
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291] disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <div className="flex gap-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={`page-${page}-${index}`}>
              {page === "..." ? (
                <span className="px-3 py-1 text-sm text-[#667085]">...</span>
              ) : (
                <button
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === page
                      ? "bg-[#AD3291] text-white"
                      : "text-[#667085] hover:text-[#AD3291]"
                  }`}
                  onClick={() => onPageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
        <button
          className="px-3 py-1 text-sm text-[#667085] hover:text-[#AD3291] disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
