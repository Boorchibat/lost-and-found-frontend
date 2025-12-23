"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModalClaim } from "./components/ModalClaim";
import { useUser } from "../context/UserContext";
import { getItemz } from "@/lib/item/getItem";
const page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
   const { token, user  } = useUser();
  const [Data, setData] = useState<ItemProps[]>([]);
  
  useEffect(() => {
    if (!token || !user?._id) return;
  
    getItemz<ItemProps[]>(user._id, token)
      .then(setData)
      .catch(console.error);
  }, [token, user?._id]);
  console.log(Data)
  
  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6 shadow-lg bg-gradient-to-t from-yellow-500 to-blue-400">
      <div className="flex flex-col gap-4">
        <Image
          src={"./file.svg"}
          alt={"image"}
          className="w-full h-fit object-cover rounded-xl shadow-md"
          height={100}
          width={100}
        />
      </div>
      <div className="bg-white rounded-xl h-fit shadow-md border border-gray-200 p-5 w-full hover:shadow-lg transition">
        <div className="flex items-center gap-3 border-b pb-4">
          <Image
            src={"./file.svg"}
            alt={"User profile image"}
            className="w-12 h-12 rounded-full object-cover border"
            height={200}
            width={200}
          />
          <p className="text-gray-800 text-lg font-semibold">Posted by me</p>
        </div>
        <div className="mt-4">
          <h1 className="text-3xl font-bold text-gray-900 break-words">Book</h1>
          <p className="text-black text-lg text-base break-words mt-1 w-full">
            asjdoajdojasasdhashdasnkdlnaskaklsjdklasjdkladasdjaksjdkasjdkjaskldkasjdkjaskdjaskldjklasjdkl
          </p>
        </div>
        <div className="mt-5 space-y-2 text-gray-700">
          <div className="flex gap-x-3">
            <p>
              <span className="font-semibold text-[20px] text-gray-900">Status:</span>
            </p>
            <p>
              <span className="font-bold text-[20px] text-gray-900">Found</span>
            </p>
          </div>

          <div className="flex gap-x-3">
            <p>
              <span className="font-semibold text-[20px] text-gray-900 break-words">Location:</span>
            </p>
            <p>
              <span className="font-bold text-[20px] text-gray-900">Robo</span>
            </p>
          </div>
         <div className="flex gap-x-3">
            <p>
              <span className="font-semibold text-[20px] text-gray-900">Contact Email:</span>
            </p>
            <p>
              <span className="font-bold text-[20px] text-gray-900">123</span>
            </p>
          </div>
          <div className="flex gap-x-3">
            <p>
              <span className="font-semibold text-[20px] text-gray-900">Contact Number:</span>
            </p>
            <p>
              <span className="font-bold text-[20px] text-gray-900">123</span>
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <div className="flex gap-x-5 justify-center items-center">
            <p className="text-md text-black">Listed:</p>
            <p>date</p>
          </div>

          <Button
            onClick={handleOpen}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Make claim
          </Button>
        </div>
        <ModalClaim
          open={open}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};
export default page;
