"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";
import { getClaimz } from "@/lib/claim/getClaims";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { ClaimType, User } from "@/index";

type Props = {
  claimId: string;
  itemId: string;
};

export const ClaimCard = ({ claimId, itemId }: Props) => {
  const { token } = useUser();

  const [loadingClaim, setLoadingClaim] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [claimData, setClaimData] = useState<ClaimType | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  // Fetch claim data
  useEffect(() => {
    if (!claimId || !itemId || !token) return;

    const fetchClaim = async () => {
      setLoadingClaim(true);
      try {
        const data = (await getClaimz({ itemId, claimId, token })) as ClaimType;
        setClaimData(data);
      } catch (err) {
        console.error("Error fetching claim:", err);
        setClaimData(null);
      } finally {
        setLoadingClaim(false);
      }
    };

    fetchClaim();
  }, [claimId, itemId, token]);

  // Fetch user data
  useEffect(() => {
    const userId = claimData?.User;
    if (!userId || !token) return;

    const fetchUser = async () => {
      setLoadingUser(true);
      try {
        const data = (await getSingleUser(userId)) as User;
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUserData(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [claimData?.User, token]);

  if (loadingClaim || loadingUser) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (!claimData) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <h1 className="font-bold text-xl text-gray-600">
          No claims made for this item yet
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full sm:w-[360px] md:w-[360px] lg:w-[360px] h-auto bg-white rounded-xl shadow-md border overflow-hidden m-auto">
      <div className="h-[50px] w-full bg-gray-100 flex items-center gap-4 px-4">
        <Image
          src={userData?.profileImage?.url ?? "/user.svg"}
          alt="User profile"
          className="w-10 h-10 rounded-full object-cover border"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="font-semibold text-[18px] text-gray-900">
            {userData?.username ?? "Unknown User"}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-5 w-full">
        <h1 className="font-bold text-[22px] text-gray-800">
          {claimData.Name}
        </h1>

        <p className="text-sm text-gray-600">
          {claimData.Claim ?? "No description provided"}
        </p>

        <h2 className="text-[15px] font-bold mt-[20px]">Contact Information:</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-bold">Email:</p>
            <p>{claimData.Email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Number:</p>
            <p>{claimData.Number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};