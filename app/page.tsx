"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "./context/UserContext";

export const Home = () => {
  const {token} = useUser()
  console.log(token)
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center bg-gradient-to-r from-yellow-500 to-blue-500 px-4 md:px-16 py-10">
      <div className="flex flex-col w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Find & Recover with Efficiency
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white max-w-lg mx-auto md:mx-0">
          Experience effortless recovery and relief with Lost and Found
        </p>
      </div>

      <div className="flex flex-col w-full md:w-1/2 justify-center items-center gap-6">
        <a href="/lost">
          <Button className="flex items-center justify-center w-[80%] gap-x-3 sm:gap-x-5 px-6 py-4 sm:px-10 sm:py-6 w-40 sm:w-48 bg-gradient-to-r from-red-500 to-red-300 text-lg sm:text-xl hover:bg-white hover:text-gray-800">
            <span>Lost</span>
            <Image width={40} height={40} src="/lost.svg" alt="Lost" />
          </Button>
        </a>
        <a href="/found">
          <Button className="flex items-center justify-center gap-x-3 sm:gap-x-5 px-6 py-4 sm:px-10 sm:py-6 w-40 sm:w-48 bg-gradient-to-r from-green-500 to-green-300 text-lg sm:text-xl hover:bg-white hover:text-gray-800">
            <span>Found</span>
            <Image width={40} height={40} src="/found.svg" alt="Found" />
          </Button>
        </a>
        <a href="/search">
          <Button className="flex items-center justify-center gap-x-3 sm:gap-x-5 px-6 py-4 sm:px-10 sm:py-6 w-40 sm:w-48 bg-gradient-to-r from-gray-500 to-gray-300 text-lg sm:text-xl hover:bg-white hover:text-gray-800">
            <span>Search</span>
            <Image width={40} height={40} src="/search.svg" alt="Search" />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default Home;
