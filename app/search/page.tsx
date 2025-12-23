"use client";
import { useEffect, useState } from "react";
import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { Searchbar } from "../components/report-page/components/search/Searchbar";
import { Button } from "@/components/ui/button";
import { getItems } from "@/lib/getDataFromBackend";
import { useUser } from "../context/UserContext";
import { LoaderCircle } from "lucide-react";

export const Search = () => {
  const { token, loading } = useUser();

  const [Data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    if (!token) return;

    getItems<ItemProps[]>("/item", token).then(setData).catch(console.error);
  }, [token]);
  console.log(token);

  const [searchTerm, setSearchTerm] = useState("");
  const filterData = Data.filter(
    (item) =>
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <div className="w-full h-auto bg-gradient-to-r from-yellow-300 to-blue-200 flex flex-col justify-center items-center">
      <div className="mt-[40px] w-full flex flex-col items-center justify-center">
        <h1 className="mb-[20px] font-bold text-[40px]">Search for an Item</h1>
        <Searchbar setQuery={setSearchTerm} />
      </div>
      <div className="mt-[30px] gap-x-20 flex flex-wrap w-[70%] mb-[30px]">
        {loading ? (
          <div className="w-full flex justify-center items-center mt-[40px]">
            <LoaderCircle size={60} color="#2563eb" />
          </div>
        ) : filterData.length > 0 ? (
          filterData.map((item) => <ReportCard key={item._id} {...item} />)
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
export default Search;
