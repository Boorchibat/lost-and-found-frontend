import { ItemProps } from "@/index";
import React, { useState } from "react";
import { ReportCard } from "../report-page/components/card/ReportCard";
import { Button } from "@/components/ui/button";

interface ListLayoutProps {
  data: ItemProps[];
  title: string;
  itemsPerPage?: number;
}

export const ListLayout: React.FC<ListLayoutProps> = ({
  data,
  itemsPerPage = 12,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || data.length === 0)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">No data to display</h1>
      </div>
    );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
        {currentData.map((item) => (
          <ReportCard key={item._id} {...item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            className="px-4 py-2 bg-black rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-400 disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
