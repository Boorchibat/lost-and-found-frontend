import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ReportCard = () => {
  return (
    <div className="w-[300px] h-[350px] bg-red-100 rounded-md">
      <div className="h-[18%] w-full">
        <div className="p-4 flex items-center gap-x-5">
          <Image
            src={"../file.svg"}
            alt="img"
            width={40}
            height={40}
            className="rounded-xl bg-red-100"
          />
          <div className="flex flex-col">
            <h1>Item</h1>
            <h1>date</h1>
          </div>
        </div>
      </div>
      <div className="h-[32%] w-full p-4 flex justify-center items-center">
        hi
      </div>
      <div className="h-[50%] w-full p-4">
        <div className="h-[30%] w-full flex flex-col ">
          <h1>Title</h1>
          <h1>Location</h1>
        </div>
        <div className="h-[40%] w-full flex items-center">
          <h1>Description</h1>
        </div>
        <div className="h-[30%] w-full flex justify-end">
          <Button className="rounded-md hover:bg-white hover:text-black bg-blue-400 text-black">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};
