import Image from "next/image";
import React from "react";
import { LoginCard } from "./components/Log-inCard";

const Login = () => {
  return (
    <div className="w-full h-screen  bg-gradient-to-r from-yellow-500 to-blue-500 p-15 flex justify-center gap-x-20">
      <Image
        src={"../file.svg"}
        alt="image"
        height={600}
        width={600}
        className="bg-blue-100"
      />
      <div className="flex w-full justify-center items-center ">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
