"use client";
import { Button } from "@/components/ui/button";
import { Searchbar } from "./components/search/Searchbar";
import { ReportCard } from "./components/card/ReportCard";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";

type ReportProps = {
  title: String;
};

export const ReportPage = (props: ReportProps) => {
  const { token } = useUser();

  const [Data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    if (!token) return;

    getItems<ItemProps[]>("/item", token).then(setData).catch(console.error);
  }, [token]);

  const [searchTerm, setSearchTerm] = useState("");
  const filterData = Data.filter(
    (item) =>
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const title = props.title;
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
            <Button className="h-12 w-full sm:w-36">Report</Button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl p-4 rounded-lg">
          <div className="flex flex-wrap justify-center gap-4">
            {filterData.length > 0 ? (
              filterData.map((item) => <ReportCard key={item._id} {...item} />)
            ) : (
              <p className="text-gray-500 mt-10">
                No items found matching "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-6">
        <a href="/lost-list">
          <p className="text-blue-700 hover:underline">View More...</p>
        </a>
      </div>
    </div>
  );
};
