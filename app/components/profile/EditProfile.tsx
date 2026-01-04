"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ModalLayout } from "../Modal/ModalLayout";
import { User } from "@/index";
import { ModalDelete } from "../Modal/ModalDelete";
import { useUser } from "@/app/context/UserContext";
import { DeleteUser } from "@/lib/auth/deleteUser";

type EditProfileProps = {
  userData: User;
};

export const EditProfile = (userData: EditProfileProps) => {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { token, logout } = useUser();
  const Data = userData.userData;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDelete = async () => {
    if (!token || !Data?._id) return;
    try {
      await DeleteUser(Data?._id, token);
      handleCloseDelete();
      logout();
      
    } catch (err) {
      console.error(err);
    }
  };
  console.log(userData)
  return (
    <div className="w-[90%] lg:w-[50%] mt-[40px] h-[700px] flex flex-col rounded-md border-2 border-black items-center">
      <div className="w-full flex items-center justify-center mt-[50px] relative py-4">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image
            src={Data?.profileImage?.url ?? "/user.svg"}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full object-cover sm:w-24 sm:h-24 w-20 h-20"
          />
        </div>
        <Button
          onClick={handleOpenDelete}
          className="absolute right-4 sm:right-6 bg-transparent hover:bg-transparent flex justify-center items-center"
        >
          <Image
            src="/trash.svg"
            width={48}
            height={48}
            alt="trash"
            className="w-12 h-12 sm:w-16 sm:h-16"
          />
        </Button>
      </div>

      <div className="flex flex-col md:w-[60%] w-[80%] mt-[30px]">
        <h1 className="font-bold text-[20px]">Name:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
          {Data ? Data.name : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%] w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Status:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
          {Data ? Data.role : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%] w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Email:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
          {Data ? Data.email : "Loading..."}
        </h1>
      </div>
      <div className="flex flex-col md:w-[60%] w-[80%] mt-[15px]">
        <h1 className="font-bold text-[20px]">Contact Information:</h1>
        <h1 className="text-[20px] w-full bg-white rounded-md p-2 mt-[10px]">
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
      <ModalDelete
        handleClose={handleCloseDelete}
        open={openDelete}
        deleteType={handleDelete}
      />
    </div>
  );
};
