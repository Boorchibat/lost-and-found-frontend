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
  const [showMore, setShowMore] = useState(false);
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
        console.error(error);
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

  const isFound = props.isFound === "Found";

  const descriptionWords = props.description
    ? props.description.split(" ")
    : [];
  const truncatedDescription =
    descriptionWords.length > 50
      ? descriptionWords.slice(0, 50).join(" ") + "..."
      : props.description || "No description available.";

  const showSeeMore = descriptionWords.length > 50;

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
            width={50}
            height={50}
            className="rounded-full bg-gray-200"
          />
        </div>
        <div className="ml-3 flex flex-col overflow-hidden">
          <h1 className="font-semibold text-gray-800 truncate">
            {props.itemname || "Unnamed Item"}
          </h1>
          <span className="text-sm text-gray-500">
            {props.createdAt
              ? new Date(props.createdAt).toDateString()
              : "Unknown date"}
          </span>
        </div>
      </div>

      <div className="h-[48%] w-full p-2">
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-100">
          {props.mainImage?.url ? (
            <Image
              src={props.mainImage.url}
              alt={props.itemname || "Item image"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <div
            className={`absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white rounded-full ${
              isFound ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {isFound ? "Found" : "Lost"}
          </div>
        </div>
      </div>

      <div className="h-[34%] w-full px-4 pb-4 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <h1 className="font-semibold text-gray-700">Description:</h1>
          <p className="text-sm text-gray-600">{showMore ? props.description : truncatedDescription}</p>
          {showSeeMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMore(!showMore);
              }}
              className="text-xs text-blue-500 mt-1 hover:underline"
            >
              {showMore ? "See less" : "See more"}
            </button>
          )}
        </div>

        <div className="flex justify-end mt-2">
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
