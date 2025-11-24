import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export const Searchbar = () => {
  return (
    <div className="bg-transparent rounded-lg w-full p-5 flex gap-5 max-w-2xl">
      <Input className="border-1 w-full active:bg-red-100 hover:border-yellow-300 border-gradient-to-r from-green-500 to-red-400" />
      <Button className="px-4 py-2 bg-transparent text-white rounded-md hover:bg-blue-500">
        <Image src={"../search.svg"} alt="image" width={30} height={30} />
      </Button>
    </div>
  );
};
