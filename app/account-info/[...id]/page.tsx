"use client";

import { useEffect, useState } from "react";
import { getItemz } from "@/lib/item/getItem";
import { ItemProps } from "@/index";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@/app/context/UserContext";
import { EditProfile } from "@/app/components/profile/EditProfile";
import { ReportCard } from "@/app/components/report-page/components/card/ReportCard";

const page = () => {
  const { token, user } = useUser();
  const [Data, setData] = useState<ItemProps[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if ( !user?._id) return;
    setItemsLoading(false);

    getItemz<ItemProps[]>(user._id).then(setData).catch(console.error);
  }, [ user?._id]);

  useEffect(() => {
    if (!user?._id) return;

    setUserLoading(false);
    const fetchUser = async () => {
      try {
        const data = await getSingleUser(user._id);
        setUserData(data);
      } catch (error) {
        console.error("Error retrieving user data", error);
      }
    };

    fetchUser();
  }, [token, user?._id]);
  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 flex flex-col h-auto justify-center items-center">
      <h1 className="font-bold text-[40px] mt-[30px]">Profile</h1>
      {itemsLoading ? (
        <CircularProgress />
      ) : (
        <EditProfile userData={userData} />
      )}
      <div className="mt-10 w-[70%]">
        <h1 className="font-bold text-[30px]">User's listed items:</h1>
      </div>
      <div className="w-[70%] flex rounded-md h-auto mt-[50px] mb-[50px] justify-between flex-wrap">
        {userLoading ? (
          <CircularProgress />
        ) : Data.length > 0 ? (
          Data.map((item) => <ReportCard key={item._id} {...item} />)
        ) : (
          <div>User has no listed Items</div>
        )}
      </div>
    </div>
  );
};
export default page;
