"use client";
import { useUser } from "@/app/context/UserContext";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const TwoDivs = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const { loading } = useUser();

  useEffect(() => {
    getItems<ItemProps[]>("/item")
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  const pendingItems = items.filter((item) => item.status === "pending");
  const approvedItems = items.filter((item) => item.status === "approved");

  return (
    <div className="flex md:flex-row justify-center items-center w-full md:w-4/5 mx-auto mt-10 gap-6">
      <div className="flex-1 min-w-[100px] h-40 flex flex-col items-center justify-center rounded-lg p-6 bg-blue-100 shadow-md transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-[25px] font-semibold mb-3">Items to Review</h2>
        <div className="flex items-center text-red-500 gap-3 text-2xl font-bold">
          {loading ? <CircularProgress/> : pendingItems.length}
        </div>
      </div>
      <a className="flex-1 min-w-[100px] h-40 flex flex-col items-center justify-center rounded-lg p-6 bg-green-100 shadow-md transform transition-transform duration-300 hover:scale-105" href="/search">
      <div className="flex-1 min-w-[100px] h-40 flex flex-col items-center justify-center rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-[25px] font-semibold mb-3">Approved Items</h2>
        <div className="flex items-center text-green-500 gap-3 text-2xl font-bold">
          {loading ? <CircularProgress/> : approvedItems.length}
        </div>
      </div>
       </a>
    </div>
  );
};
