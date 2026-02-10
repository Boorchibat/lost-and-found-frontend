"use client";

import Image from "next/image";
import { Site } from "./componets/Site";
import { Help } from "./componets/Help";
import { Links } from "./componets/Links";
import { Contact } from "./componets/Contact";

export const Footer = () => {
  return (
   <footer className="w-full bg-gradient-to-r from-blue-300 to-yellow-300 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-start gap-6">
        <div className="w-full md:w-[15%] flex justify-center md:justify-start items-center mb-4 md:mb-0">
          <Image
            src="/found.svg"
            alt="Lost and Found logo"
            width={100}
            height={100}
            className="w-16 h-16 sm:w-20 sm:h-20"
            priority
          />
        </div>

        <div className="w-full sm:w-1/2 md:w-[15%] flex justify-center md:justify-start mb-4 md:mb-0">
          <Site />
        </div>

        <div className="w-full sm:w-1/2 md:w-[20%] flex justify-center md:justify-start mb-4 md:mb-0">
          <Help />
        </div>

        <div className="w-full md:w-[15%] flex justify-center md:justify-start items-center mb-4 md:mb-0">
          <p className="text-sm font-bold text-center md:text-left">
            © 2025 Lost and Found Boorchi Batzorigt
          </p>
        </div>

        <div className="w-full sm:w-1/2 md:w-[15%] flex justify-center md:justify-start mb-4 md:mb-0">
          <Links />
        </div>

        <div className="w-full sm:w-1/2 md:w-[20%] flex justify-center md:justify-start mb-4 md:mb-0">
          <Contact />
        </div>
      </div>
    </footer>
  );
};
