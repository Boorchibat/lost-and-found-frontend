"use client";

import { Button } from "@/components/ui/button";
import { ItemProps } from "@/index"; 
import { getSingleUser } from "@/lib/auth/getUser";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { ContactModal } from "../ContactModal";

export const ReportCard = (props: ItemProps) => {
  const [userData, setUserData] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [openContact, setOpenContact] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!props.User) {
      setUserLoading(false);
      return;
    }

    let userId: string | undefined;
    if (typeof props.User === "string") {
      userId = props.User;
    } else if (props.User._id) {
      setUserData(props.User);
      setUserLoading(false);
      return;
    }

    if (!userId) return;

    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const result = await getSingleUser(userId);
        setUserData(result);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [props.User]);

  const handleCardClick = () => {
    if (openContact) return;
    router.push(`/item/${props._id}`);
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userData?._id) {
      router.push(`/account-info/${userData._id}`);
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenContact(true);
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center w-[300px] h-[380px] mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer transform hover:scale-105 transition-transform duration-300 w-[300px] h-[380px] mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col overflow-hidden"
    >
      <div className="h-[18%] w-full bg-gray-50 flex items-center px-4 py-3 border-b border-gray-100">
        <div onClick={handleUserClick} className="cursor-pointer">
          <Image
            src={userData?.profileImage?.url || "/user.svg"}
            alt={userData?.username || "User"}
            width={40}
            height={40}
            className="rounded-full bg-gray-200"
          />
        </div>
        <div className="ml-3 flex flex-col">
          <h1 className="font-semibold text-gray-800">
            {props.itemname || "Unnamed Item"}
          </h1>
          <span className="text-sm text-gray-500">
            {props.createdAt
              ? new Date(props.createdAt).toDateString()
              : "Unknown date"}
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
          <p className="text-sm text-gray-500">
            {props.location || "Unknown location"}
          </p>
        </div>
        <div className="flex-1 mt-2">
          <h1 className="font-semibold text-gray-700">Description:</h1>
          <p className="text-sm text-gray-600 line-clamp-3">
            {props.description || "No description available."}
          </p>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            onClick={handleContactClick}
            className="rounded-lg bg-gradient-to-r from-blue-400 to-green-400 text-white hover:scale-105 transition-transform duration-300"
          >
            Contact
          </Button>
        </div>
        <ContactModal
          data={props}
          handleClose={() => setOpenContact(false)}
          open={openContact}
        />
      </div>
    </div>
  );
};
