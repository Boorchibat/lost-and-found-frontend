"use client";

import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";
import { useEffect, useState } from "react";
import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { useUser } from "../context/UserContext";
import { LoaderCircle } from "lucide-react";
import { Button } from "@mui/material";

export const HomeCards = () => {
  const [Data, setData] = useState<ItemProps[]>([]);
  const { loading } = useUser();

  useEffect(() => {
    getItems<ItemProps[]>("/item").then(setData).catch(console.error);
  }, []);

  return (
    <div className="w-full max-w-full sm:max-w-5xl mx-auto rounded-xl p-4 sm:p-8 flex flex-col gap-6">
     
      <div className="w-full bg-white rounded-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Recently Posted Items
          </h1>
          <a href="/search" className="text-blue-600 underline mt-2 sm:mt-0">
            View more...
          </a>
        </div>

        <p className="text-gray-700 mt-4 text-base sm:text-lg">
          Here are some of the latest items people have posted.
        </p>
      </div>

      <div className="w-full flex justify-center">
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <LoaderCircle size={50} color="#2563eb" />
          </div>
        ) : Data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 justify-center">
            {Data.slice(0, 6).map((item) => (
              <ReportCard key={item._id} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <h1 className="font-bold text-xl sm:text-2xl">No items found...</h1>
            <a href="/">
              <Button className="bg-blue-700 hover:bg-green-500">Return Home</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
