"use client";

import { useEffect, useState } from "react";
import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { Searchbar } from "../components/report-page/components/search/Searchbar";
import { Button } from "@/components/ui/button";
import { getItems } from "@/lib/getDataFromBackend";
import { useUser } from "../context/UserContext";
import { LoaderCircle } from "lucide-react";
import { ItemProps } from "@/index";

const COLORS = [
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Black",
  "White",
  "Gray",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Other",
];

const PHYSICAL_TYPES = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "AirPods",
  "Laptop Charger",
  "Notebook",
  "Other",
];

export const Search = () => {
  const { loading } = useUser();
  const [Data, setData] = useState<ItemProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPhysical, setSelectedPhysical] = useState<string[]>([]);

  useEffect(() => {
    getItems<ItemProps[]>("/item").then(setData).catch(console.error);
  }, []);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const togglePhysical = (type: string) => {
    setSelectedPhysical((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const approvedData = Data.filter((item) => item.status === "approved");
  const filteredData = approvedData.filter((item) => {
    const matchesSearch =
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesColor =
      selectedColors.length === 0 ||
      item.color?.some((c) => selectedColors.includes(c));
    const matchesPhysical =
      selectedPhysical.length === 0 ||
      item.physical?.some((p) => selectedPhysical.includes(p));
    return matchesSearch && matchesColor && matchesPhysical;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 to-blue-200 flex justify-center px-4 py-10">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-lg p-6 space-y-6 self-start lg:mt-30">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <Button
                  key={color}
                  onClick={() => toggleColor(color)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    selectedColors.includes(color)
                      ? "bg-yellow-400 border-yellow-600 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Physical Type</h3>
            <div className="flex flex-wrap gap-2">
              {PHYSICAL_TYPES.map((type) => (
                <Button
                  key={type}
                  onClick={() => togglePhysical(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors duration-200 ${
                    selectedPhysical.includes(type)
                      ? "bg-blue-400 border-blue-600 text-white"
                      : "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="lg:mr-[250px] w-full flex flex-col justify-center items-center">
            <h1 className="mb-6 font-bold lg:text-[70px] text-4xl text-gray-900">
              Search for an Item
            </h1>
            <Searchbar setQuery={setSearchTerm} />
          </div>

          <div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
            {loading ? (
              <div className="w-full flex justify-center items-center mt-10 col-span-3">
                <LoaderCircle size={60} color="#2563eb" />
              </div>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ReportCard key={item._id} {...item} />
              ))
            ) : (
              <div className="w-full flex flex-col justify-center items-center gap-4 mt-10 col-span-3">
                <h1 className="font-bold text-2xl">No items found...</h1>
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
    </div>
  );
};

export default Search;
