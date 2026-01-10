"use client";

import { Button } from "@/components/ui/button";
import { Searchbar } from "./components/search/Searchbar";
import { ReportCard } from "./components/card/ReportCard";
import { useState } from "react";
import { ItemProps } from "@/index";
import { LoaderCircle } from "lucide-react";
import { useUser } from "@/app/context/UserContext";

type ReportProps = {
  title: string;
  Data?: ItemProps[];
};

export const ReportPage = ({ title, Data = [] }: ReportProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { loading } = useUser();

  const approvedData = Data.filter((item) => item.status === "approved");

  const [filters, setFilters] = useState({
    category: "",
    status: "approved",
    location: "",
    startDate: "",
    endDate: "",
  });

  const filterData = approvedData.filter((item) => {
    const matchesText =
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = filters.location
      ? item.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchesDate =
      filters.startDate && filters.endDate
        ? new Date(item.createdAt) >= new Date(filters.startDate) &&
          new Date(item.createdAt) <= new Date(filters.endDate)
        : true;

    return matchesText && matchesLocation && matchesDate;
  });

  const cardsToShow = filterData.slice(0, 9);
  const lost = title === "Lost items";

  return (
    <div className="w-full flex flex-col items-center px-4 py-8 md:py-12">
      <div className="w-full max-w-5xl flex flex-col items-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center">
          {title}
        </h1>
        <div className="w-full justify-center flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-grow w-full sm:w-auto flex justify-center">
            <Searchbar setQuery={setSearchTerm} />
          </div>
          <div className="flex justify-center items-center">
            {lost ? (
              <a href="/report-lost">
                <Button className="h-12 w-full sm:w-36">Report</Button>
              </a>
            ) : (
              <a href="/report-found"> <Button className="h-12 w-full sm:w-36">Report</Button></a>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center max-w-7xl p-4 rounded-lg">
          <div className="mt-[30px] gap-8 flex flex-wrap justify-center items-center w-[90%] mb-[10px]">
            {loading ? (
              <div className="w-full bg-blue-100 flex justify-center items-center mt-[40px]">
                <LoaderCircle size={60} color="#2563eb" />
              </div>
            ) : filterData.length > 0 ? (
              cardsToShow.map((item) => <ReportCard key={item._id} {...item} />)
            ) : (
              <div className="flex flex-col justify-center items-center gap-4 mt-[15px]">
                <h1 className="font-bold text-[30px]">No items found...</h1>
                <a href="/">
                  <Button className="bg-blue-700 hover:bg-green-500">
                    Return to Home Page
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {filterData.length > 9 && (
        <div className="w-full flex justify-end max-w-7xl px-6 mt-4">
          {title === "Found" ? (
            <a href="/found-list">
              <p className="text-blue-700 hover:underline font-semibold cursor-pointer">
                View More...
              </p>
            </a>
          ) : (
            <a href="/lost-list">
              <p className="text-blue-700 hover:underline font-semibold cursor-pointer">
                View More...
              </p>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
