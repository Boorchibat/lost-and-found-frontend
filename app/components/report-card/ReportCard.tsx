"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export const ReportCard = () => {
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadMessage("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadMessage("❌ File must be an image.");
      return;
    }
    setUploadMessage("✅ Image uploaded successfully!");
  };

  return (
    <div className="w-[80%] lg:w-[60%] h-auto bg-yellow-100 rounded-2xl flex flex-col items-center p-4 md:p-6 mt-6">
      
      <div className="flex flex-col w-full gap-4 md:gap-6">
        <div className="flex mt-[20px] flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Name:</h1>
          <Input className="w-full sm:w-3/5 border-1 border-black md:w-2/3 p-2" />
        </div>

        <div className="flex mt-[20px] flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Item:</h1>
          <Input className="w-full border-1 border-black sm:w-3/5 md:w-2/3 p-2" />
        </div>

        <div className="flex mt-[20px] flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Location:</h1>
          <Input className="w-full sm:w-3/5 border-1 border-black md:w-2/3 p-2" />
        </div>

        <div className="flex mt-[20px] flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Date:</h1>
          <Input type="date" className="w-full border-1 border-black sm:w-3/5 md:w-2/3 p-2" />
        </div>

        <div className="flex mt-[20px] flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Item Description:</h1>
          <Input className="w-full sm:w-3/5 border-1 border-black md:w-2/3 p-2" />
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2 sm:gap-4">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Upload Photo:</h1>
          <div className="flex flex-col w-full sm:w-3/5 md:w-2/3">
            <input
              id="upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="upload"
              className="flex items-center justify-center gap-2 border border-gray-500 rounded-md p-2 cursor-pointer"
            >
              <Image src="/upload.svg" alt="Upload" width={30} height={30} />
              Upload Image
            </label>
            {uploadMessage && (
              <p
                className={`mt-2 font-semibold ${
                  uploadMessage.includes("❌") ? "text-red-600" : "text-green-600"
                }`}
              >
                {uploadMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-8 mt-6 w-full sm:justify-center">
        <Button className="w-full sm:w-44 h-12 hover:bg-green-400 hover:text-black">
          Submit
        </Button>
        <Button className="w-full sm:w-44 h-12 bg-white text-black hover:bg-red-400 hover:text-white">
          Reset
        </Button>
      </div>
    </div>
  );
};
