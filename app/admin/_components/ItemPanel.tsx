"use client";
import { ModalCard } from "@/app/components/Modal/ModalCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ItemPanel = (data: ItemProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="w-full border-t-1 border-black">
      <div className="flex items-center">
        <h1 className="font-bold text-[20px] w-[30%] p-3 border-r border-black">
          {data.name}
        </h1>
        <h1 className="font-bold p-3 border-r w-[30%] border-black text-[20px]">
          {data.itemname}
        </h1>
        <div className="p-3 border-r border-black w-[10%] flex justify-center">
          <Button onClick={handleOpen} className="bg-gray-500">
            View item
          </Button>
          <ModalCard
            data={data}
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </div>
        <div className="w-[30%] flex justify-evenly items-center">
          <Button className="bg-green-500 hover:bg-green-700">Accept</Button>{" "}
          <Button className="bg-red-500 hover:bg-red-700">Reject</Button>
        </div>
      </div>
    </div>
  );
};
