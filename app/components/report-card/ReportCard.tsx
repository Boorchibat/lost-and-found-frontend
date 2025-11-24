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
    <div className="w-[60%] border-3 mt-[30px] rounded-md border-black h-[80%] bg-yellow-100 flex flex-col items-center">
      <div
        className="flex flex-col w-[90%]
      "
      >
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Name:</h1>
          <Input className="border-gray-500 w-[500px] p-3" />
        </div>
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Item:</h1>
          <Input className="border-gray-500 w-[500px] p-3" />
        </div>
      </div>
      <div className="flex flex-col mt-[40px]">
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Location:</h1>
          <Input className="border-gray-500 w-[500px] p-3" />
        </div>
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Date:</h1>
          <Input type="date" className="border-gray-500 w-[500px] p-3" />
        </div>
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Item Description:</h1>
          <Input className="border-gray-500 w-[500px] p-3" />
        </div>
        <div className="flex items-center justify-between gap-x-5 w-full mt-[20px] p-5">
          <h1 className="font-bold text-[30px]">Upload Photo:</h1>
          <div className="flex w-full justify-end items-center">
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
              className="border-gray-500 flex justify-center w-[500px] border-1 border-gray-500 rounded-md p-3 cursor:pointer"
            >
             <Image src={"../upload.svg"} alt="image" height={30} width={30}/>
            </label>
            {uploadMessage && (
              <p
                className={`mt-2 font-semibold ${
                  uploadMessage.includes("❌")
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {uploadMessage}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-x-5">
        <Button>Submit</Button>
        <Button>Reset</Button>
      </div>
    </div>
  );
};
