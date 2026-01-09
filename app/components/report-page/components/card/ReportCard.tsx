"use client";

import { Button } from "@/components/ui/button";
import { ItemProps } from "@/index";
import Image from "next/image";

export const ReportCard = (props: ItemProps) => {
  return (
    <a href={`/item/${props._id}`} className="transform hover:scale-105 transition-transform duration-300">
      <div className="w-[300px] h-[380px] mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col overflow-hidden">
        <div className="h-[18%] w-full bg-gray-50 flex items-center px-4 py-3 border-b border-gray-100">
          <Image
            src={props.User?.profileImage?.url || "/user.svg"}
            alt={props.User?.username || "User"}
            width={40}
            height={40}
            className="rounded-full bg-gray-200"
          />
          <div className="ml-3 flex flex-col">
            <h1 className="font-semibold text-gray-800">{props.itemname || "Unnamed Item"}</h1>
            <span className="text-sm text-gray-500">
              {props.createdAt ? new Date(props.createdAt).toDateString() : "Unknown date"}
            </span>
          </div>
        </div>

        <div className="h-[35%] w-full p-4 flex justify-center items-center">
          {props.mainImage?.url ? (
            <Image
              src={props.mainImage.url}
              alt={props.itemname || "Item image"}
              width={180}
              height={120}
              className="object-cover rounded-lg shadow-sm"
            />
          ) : (
            <div className="w-[180px] h-[120px] bg-gray-200 flex items-center justify-center rounded-lg">
              No Image
            </div>
          )}
        </div>

        <div className="h-[47%] w-full px-4 pb-4 flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-gray-700">Location:</h1>
            <p className="text-sm text-gray-500">{props.location || "Unknown location"}</p>
          </div>
          <div className="flex-1 mt-2">
            <h1 className="font-semibold text-gray-700">Description:</h1>
            <p className="text-sm text-gray-600 line-clamp-3">
              {props.description || "No description available."}
            </p>
          </div>
          <div className="flex justify-end mt-3">
            <Button className="rounded-lg bg-gradient-to-r from-blue-400 to-green-400 text-white hover:scale-105 transition-transform duration-300">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </a>
  );
};
