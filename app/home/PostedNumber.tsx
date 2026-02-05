"use client";

import { ItemProps } from "@/index";
import { getItems } from "@/lib/getDataFromBackend";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const PostedNumber = () => {
  const [Data, setData] = useState<ItemProps[]>([]);

  useEffect(() => {
    getItems<ItemProps[]>("/item").then(setData).catch(console.error);
  }, []);

  const FoundData = Data.filter((item) => item.isFound === "Found");
  const LostData = Data.filter((item) => item.isFound === "In progress");
  const lostNumber = LostData.length;
  const FoundNumber = FoundData.length;

  return (
    <div className="w-full flex mt-[100px] flex-col md:flex-row gap-10 justify-center items-center mt-10 px-4">
   
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full md:w-[30%]"
      >
        <a
          href="/lost"
          className="block bg-gray-100 dark:bg-gray-800 rounded-3xl h-[400px] flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-gray-100">
              Lost Items
            </h2>
            <Image src="/lost.svg" alt="lost" height={50} width={50} />
          </div>
          <h1 className="text-5xl md:text-6xl text-red-500 font-extrabold mt-10">
            {lostNumber}
          </h1>
        </a>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full md:w-[30%]"
      >
        <a
          href="/found"
          className="block bg-gray-100 dark:bg-gray-800 rounded-3xl h-[400px] flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-3xl md:text-4xl text-gray-800 dark:text-gray-100">
              Found Items
            </h2>
            <Image src="/found.svg" alt="found" height={50} width={50} />
          </div>
          <h1 className="text-5xl md:text-6xl text-green-500 font-extrabold mt-10">
            {FoundNumber}
          </h1>
        </a>
      </motion.div>
    </div>
  );
};
