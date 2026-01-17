import Image from "next/image";
import { SignupCard } from "./components/SignupCard";

const Signup = () => {
  return (
    <div className="w-full h-auto  bg-gradient-to-r from-yellow-500 to-blue-500 p-15 flex justify-center gap-x-20">
      <div className="flex w-full justify-center items-center ">
        <SignupCard />
      </div>
      <Image
        src="/image2.png"
        alt="image"
        height={600}
        width={850}
        className=" ml-[30px] mb-[50px] mt-[50px] rounded-md flex justify-center items-center"
      />
    </div>
  );
};
export default Signup;
