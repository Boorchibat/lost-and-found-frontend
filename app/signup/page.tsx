import Image from "next/image";
import { SignupCard } from "./components/SignupCard";

const Signup = () => {
  return (
    <div className="w-full h-auto  bg-gradient-to-r from-yellow-500 to-blue-500 p-15 flex justify-center gap-x-20">
      <div className="flex w-full justify-center items-center ">
        <SignupCard />
      </div>
      <Image
        src={"../file.svg"}
        alt="image"
        height={600}
        width={600}
        className="bg-blue-100"
      />
    </div>
  );
};
export default Signup;
