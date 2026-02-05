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
    <div className="w-full max-w-5xl rounded-xl p-8 flex flex-col gap-6">
      <div className="w-full bg-white rounded-md p-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            Recently Posted Items
          </h1>
          <a href="/search">
            <h1 className="underline">View more...</h1>
          </a>
        </div>

        <p className="text-gray-700 mt-[30px] text-[18px]">
          Here are some of the latest items people have posted.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {loading ? (
          <div className="w-full flex justify-center items-center mt-[40px]">
            <LoaderCircle size={60} color="#2563eb" />
          </div>
        ) : Data.length > 0 ? (
          Data.slice(0, 6).map((item) => (
            <ReportCard key={item._id} {...item} />
          ))
        ) : (
          <div className="w-full flex justify-center items-center gap-x-5 mt-[15px]">
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
  );
};
