import React from "react";

interface DashboardListSkeletonProps {
  /** Nombre de lignes à afficher dans le tableau (défaut: 4) */
  rows?: number;
  /** Nombre de colonnes dans le tableau (défaut: 6) */
  columns?: number;
}

export default function DashboardListSkeleton({
  rows = 4,
  columns = 6,
}: DashboardListSkeletonProps) {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb / Titre */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="h-7 w-48 bg-gray-300 rounded" />
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-12 bg-gray-300 rounded" />
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-24 bg-gray-300 rounded" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Card avec tableau */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="px-6 py-5">
            <div className="h-5 w-40 bg-gray-300 rounded" />
          </div>
          <div className="border-t border-gray-100 p-4 sm:p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                  {/* En-tête du tableau */}
                  <div className="flex border-b border-gray-100 px-5 py-3 gap-4">
                    {Array.from({ length: columns }).map((_, i) => (
                      <div
                        key={i}
                        className="h-4 bg-gray-300 rounded flex-1 min-w-[80px]"
                      />
                    ))}
                  </div>
                  {/* Lignes du tableau */}
                  {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex border-b border-gray-100 last:border-0 px-5 py-4 gap-4 items-center"
                    >
                      {Array.from({ length: columns }).map((_, colIndex) => (
                        <div
                          key={colIndex}
                          className="h-4 bg-gray-300 rounded flex-1 min-w-[60px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="flex items-center gap-2 mt-6">
              <div className="h-10 w-24 bg-gray-300 rounded-lg" />
              <div className="flex gap-2">
                <div className="h-10 w-10 bg-gray-300 rounded-lg" />
                <div className="h-10 w-10 bg-gray-300 rounded-lg" />
                <div className="h-10 w-10 bg-gray-300 rounded-lg" />
              </div>
              <div className="h-10 w-20 bg-gray-300 rounded-lg ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
