"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ModalLayout } from "../Modal/ModalLayout";

export const EditProfile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="w-[90%] lg:w-[50%] mt-[40px] h-[700px] flex flex-col rounded-md border-2 border-black items-center">
      <Image
        className="bg-red-100 rounded-full mt-[30px]"
        src={"../insta.svg"}
        alt="img"
        height={100}
        width={100}
      />
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[30px]">
        <h1 className="font-bold text-[20px]">Name:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">Name</h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Status:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">Name</h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Email:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">Name</h1>
      </div>
      <div className="flex flex-col md:w-[60%]  w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Contact Information:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md  p-2 mt-[10px]">Name</h1>
      </div>
      <div className="mt-[30px] w-full flex justify-center">
        <Button
          onClick={handleOpen}
          className="w-[80%] md:w-[60%] h-[50px] bg-white text-black hover:bg-black hover:text-white"
        >
          Edit Profile
        </Button>
      </div>
      <ModalLayout open={open} handleClose={handleClose} handleOpen={handleOpen}/>
    </div>
  );
};
