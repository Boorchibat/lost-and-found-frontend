"use client";

import { useEffect, useState } from "react";
import { ListLayout } from "../components/card-list/listLayout";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";

const FoundPage = () => {
  const [Data, setData] = useState<ItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems<ItemProps[]>("/item")
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const FoundData = Data.filter((item) => item.isFound === "In progress"); 

  return (
    <div className=" flex justify-center items-center bg-gradient-to-r from-yellow-500 to-blue-400 min-h-screen w-full p-6">
      {loading ? (
        <p className="text-center text-white text-xl">Loading items...</p>
      ) : FoundData.length > 0 ? (
        <div className="w-[80%] gap-x-5 flex flex-col justify-center items-center">
                   <h1 className="font-bold lg:text-[50px] text-[40px] mb-[20px]">Lost item list</h1>
                 <ListLayout title="Found item list" data={FoundData} />
               </div>
      ) : (
        <p className="text-center text-white text-xl">No items found.</p>
      )}
    </div>
  );
};

export default FoundPage;
