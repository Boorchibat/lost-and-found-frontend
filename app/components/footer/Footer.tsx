import Image from "next/image";
import { Logo } from "../header/logo/Logo";
import { Contact } from "./componets/Contact";
import { Help } from "./componets/Help";
import { Links } from "./componets/Links";
import { Site } from "./componets/Site";

export const Footer = () => {
  return (
    <div className="w-full flex bg-gradient-to-r from-blue-300 to-yellow-300 h-[180px]">
      <div className="w-[15%]">
         <div className="w-full h-full gap-x-5 flex items-center pl-[100px]">
              <Image src="../lost.svg" alt="image" width={100} height={100} />
            </div>
      </div>
      <div className="w-[15%]">
        <Site />
      </div>
      <div className="w-[20%]">
        <Help />
      </div>
      <div className="w-[15%]">
        <div className="flex flex-col mt-[120px]">
          <h1 className="font-bold">@Copyright 2025 Lost and Found Boorchi Batzorigt</h1>
        </div>
      </div>
      <div className="w-[15%]">
        <Links />
      </div>
      <div className="w-[20%]">
        <Contact />
      </div>
    </div>
  );
};
