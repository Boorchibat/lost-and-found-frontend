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

  const FoundData = Data.filter((item) => item.isFound === "Found");

  return (
    <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-blue-400">
      <ReportPage title="Found items" Data={FoundData} />
    </div>
  );
};

export default ReportFound;
