"use client";

import { ModalCard } from "@/app/components/Modal/ModalCard";
import { Button } from "@/components/ui/button";
import { ItemProps } from "@/index";
import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { approveItem } from "@/lib/item/AdminApprove";
import { rejectItem } from "@/lib/item/AdminReject";

type ItemPanelProps = {
  data: ItemProps;
  onUpdate: (id: string) => void; 
};

export const ItemPanel = ({ data, onUpdate }: ItemPanelProps) => {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<null | "approved" | "rejected">(null);
  const { token } = useUser();
  const itemId = data._id;

  const handleApprove = async () => {
    if (!token) return;
    try {
      await approveItem(itemId, token);
      setFeedback("approved");
      setTimeout(() => setFeedback(null), 5000);
      onUpdate(itemId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    if (!token) return;
    try {
      await rejectItem(itemId, token);
      setFeedback("rejected");
      setTimeout(() => setFeedback(null), 5000);
      onUpdate(itemId); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full border-t border-black">
      <div className="flex items-center">
        <h1 className="font-bold text-[20px] w-[30%] p-3 border-r border-black">
          {data.name}
        </h1>
        <h1 className="font-bold p-3 border-r w-[30%] border-black text-[20px]">
          {data.itemname}
        </h1>
        <div className="p-3 border-r border-black w-[10%] flex justify-center">
          <Button onClick={() => setOpen(true)} className="bg-gray-500">
            View item
          </Button>
          <ModalCard
            data={data}
            open={open}
            handleClose={() => setOpen(false)}
            handleOpen={() => setOpen(true)}
          />
        </div>
        <div className="w-[30%] flex justify-evenly items-center relative">
          <Button onClick={handleApprove} className="bg-green-500 hover:bg-green-700">
            Approve
          </Button>
          <Button onClick={handleReject} className="bg-red-500 hover:bg-red-700">
            Reject
          </Button>

          {feedback && (
            <span className="absolute top-0 right-0 text-2xl">
              {feedback === "approved" ? "✅" : "❌"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
