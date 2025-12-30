"use client";

import { useEffect, useState } from "react";
import { ReportPage } from "../components/report-page/ReportPage";
import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";

const ReportFound = () => {
  const [Data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    getItems<ItemProps[]>("/item").then(setData).catch(console.error);
  }, []);

  const LostData = Data.filter((item) => item.isFound === "In progress");

  return (
    <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-blue-400">
      <ReportPage title="Lost items" Data={LostData} />
    </div>
  );
};

export default ReportFound;
