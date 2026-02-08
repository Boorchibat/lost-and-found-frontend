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
  const [feedback, setFeedback] = useState<null | "accepted" | "rejected">(
    null,
  );
  const { token } = useUser();
  const itemId = data._id;

  const handleApprove = async () => {
    if (!token) return;
    try {
      await approveItem(itemId, token);
      setFeedback("accepted");
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
    <div className="border-t border-black">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[30%] p-3 md:border-r border-black">
          <span className="md:hidden text-sm text-gray-500">Name</span>
          <h1 className="font-bold text-lg">{data.name}</h1>
        </div>

        <div className="md:w-[30%] p-3 md:border-r border-black">
          <span className="md:hidden text-sm text-gray-500">Item name</span>
          <h1 className="font-bold text-lg">{data.itemname}</h1>
        </div>

        <div className="md:w-[10%] p-3 md:border-r border-black flex justify-start md:justify-center">
          <div className="flex items-center">
            <span className="md:hidden text-sm text-gray-500 lg:mr-0 mr-[30px]">
              Preview
            </span>
            <Button className="bg-gray-500" onClick={() => setOpen(true)}>
              View
            </Button>
          </div>

          <ModalCard
            data={data}
            open={open}
            handleClose={() => setOpen(false)}
            handleOpen={() => setOpen(true)}
          />
        </div>

        <div className="md:w-[30%] p-3 flex flex-col md:flex-row gap-3 md:justify-evenly items-center relative">
          <Button
            onClick={handleApprove}
            className="bg-green-500 hover:bg-green-700 w-full md:w-auto"
          >
            Approve
          </Button>
          <Button
            onClick={handleReject}
            className="bg-red-500 hover:bg-red-700 w-full md:w-auto"
          >
            Reject
          </Button>
          {feedback && (
            <span className="absolute top-2 right-2 text-2xl">
              {feedback === "accepted" ? "✅" : "❌"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
