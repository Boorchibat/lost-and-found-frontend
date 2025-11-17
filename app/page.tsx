import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Home = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-yellow-500 to-blue-500">
      <div className="flex flex-col w-[50%] mb-[200px]  text-left ml-[200px]">
        <h1 className="text-[90px] font-bold text-white">
          Find & Recover with efficiency
        </h1>
        <p className="text-left items-start text-white">
          Experience effortless recovery and relief with Lost and found
        </p>
      </div>
      <div className="flex flex-col w-[50%] mb-[200px] justify-center items-center">
        <div className="flex flex-col">
          <Button className="p-10 flex gap-x-5 hover:bg-white hover:text-gray-800 w-[200px] bg-gradient-to-r from-red-500 to-white-200 text-[25px]">
            <h1>Lost</h1> <Image width={40} height={40} src="../lost.svg" alt="image"/>
          </Button>
          <Button className="p-10 flex gap-x-5 hover:bg-white hover:text-gray-800 w-[200px] mt-[20px] bg-gradient-to-r from-green-500 to-white-200 text-[25px]">
            <h1>Found</h1> <Image width={40} height={40} src="../found.svg" alt="image"/>
          </Button>
          <Button className="p-10 flex gap-x-5 hover:bg-white hover:text-gray-800 w-[200px] mt-[20px] bg-gradient-to-r from-gray-500 to-white-200 text-[25px]">
            <h1>Search</h1> <Image width={40} height={40} src="../search.svg" alt="image"/>
          </Button>
        </div>
        <div>hji</div>
      </div>
    </div>
  );
};

export default Home;
