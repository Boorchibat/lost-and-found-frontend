"use client";

import { Button } from "@/components/ui/button";
import { ItemProps } from "@/index";
import Image from "next/image";

export const ReportCard = (props: ItemProps) => {
  return (
    <a href={`/item/${props._id}`}>
      <div className="w-[300px] h-[350px] mt-[30px] bg-red-100 rounded-md border border-black flex flex-col">
        <div className="h-[18%] w-full">
          <div className="p-4 flex items-center gap-x-5">
            <Image
              src={props.User?.profileImage?.url || "/user.svg"}
              alt={props.User?.username || "Loading user"}
              width={40}
              height={40}
              className="rounded-xl bg-red-100"
            />
            <div className="flex flex-col">
              <h1 className="font-bold">{props.itemname || "Unnamed Item"}</h1>
              <h1 className="text-sm text-gray-600">
                {props.createdAt
                  ? new Date(props.createdAt).toDateString()
                  : "Unknown date"}
              </h1>
            </div>
          </div>
        </div>

        <div className="h-[32%] w-full p-4 flex justify-center items-center">
          {props.mainImage?.url ? (
            <Image
              src={props.mainImage.url}
              alt={props.itemname || "Item image"}
              width={150}
              height={100}
              className="object-cover rounded-md"
            />
          ) : (
            <div className="w-[150px] h-[100px] bg-gray-300 flex items-center justify-center rounded-md">
              No Image
            </div>
          )}
        </div>
        <div className="h-[50%] w-full p-4 flex flex-col justify-between">
          <div>
            <h1 className="font-semibold">Location:</h1>
            <h1 className="text-sm">{props.location || "Unknown location"}</h1>
          </div>
          <div className="flex-1 mt-2">
            <h1 className="font-semibold">Description:</h1>
            <p className="text-sm">
              {props.description || "No description available."}
            </p>
          </div>
          <div className="flex justify-end mt-2">
            <Button className="rounded-md hover:bg-white hover:text-black bg-blue-400 text-black">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </a>
  );
};
