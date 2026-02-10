"use client";

import Image from "next/image";
import { SignupCard } from "./components/SignupCard";

const Signup = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-500 to-blue-500 p-6 flex flex-col md:flex-row justify-center items-center gap-8">
    <div className="w-full md:w-1/2">
          <SignupCard />
        </div>

      <div className="hidden md:block">
        <Image
          src="/image2.png"
          alt="Signup illustration"
          height={600}
          width={850}
          className="rounded-md"
        />
      </div>
    </div>
  );
};

export default Signup;
