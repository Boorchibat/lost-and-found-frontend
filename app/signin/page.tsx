
import Image from "next/image";
import { PasswordCard } from "./components/PasswordCard";


const page = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-r from-yellow-500 to-blue-500 p-5 flex justify-center gap-x-10">
      <div className="hidden lg:block w-full h-full flex justify-center items-center ">
        <Image
          src="/image2.png"
          alt="image"
          height={600}
          width={850}
          className="bg-blue-100 mt-[100px] ml-[50px] rounded-md flex justify-center items-center"
        />
      </div>
      <div className="flex w-full  justify-center items-center ">
        <PasswordCard />
      </div>
    </div>
  );
};

export default page;
