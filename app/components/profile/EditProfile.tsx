"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ModalLayout } from "../Modal/ModalLayout";
import { User } from "@/index";

type EditProfileProps = {
  userData: User;
};

export const EditProfile = (userData: EditProfileProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const Data = userData.userData;

  return (
    <div className="w-[90%] lg:w-[50%] mt-[40px] h-[700px] flex flex-col rounded-md border-2 border-black items-center">
      <Image
        src={Data?.profileImage?.url ?? "./user.svg"}
        alt="Profile"
        width={100}
        height={100}
      />
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[30px]">
        Name:
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
          {Data ? Data.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Status:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
           {Data ? Data.role : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Email:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
          {Data ? Data.email : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Contact Information:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md  p-2 mt-[10px]">
          {Data ? Data.number : "Loading..."}
        </h1>
      </div>
      <div className="mt-[30px] w-full flex justify-center">
        <Button
          onClick={handleOpen}
          className="w-[80%] md:w-[60%] h-[50px] bg-white text-black hover:bg-black hover:text-white"
        >
          Edit Profile
        </Button>
      </div>
      <ModalLayout Data={Data} open={open} handleClose={handleClose} />
    </div>
  );
};
