import { HeaderButton } from "./buttons/HeaderButton";
import { Button } from "@/components/ui/button";


export const HeaderInfo = () => {
  return (
    <div className="w-full  h-full flex items-center justify-evenly">
      <div className="flex w-[80%] justify-evenly">
        <HeaderButton label="Home" />
        <HeaderButton label="Lost" />
        <HeaderButton label="Report Lost" />
        <HeaderButton label="Found" />
        <HeaderButton label="Report Found" />
        <HeaderButton label="Profile" />
         <HeaderButton label="Search" />
      </div>
      <div className=" flex w-[20%]">
         <Button className="bg-gray-500 w-[70%] flex justify-center">Sign out</Button>
      </div>
    </div>
  );
};
