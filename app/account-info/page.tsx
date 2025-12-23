"use client"
import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { EditProfile } from "../components/profile/EditProfile";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { getItems } from "@/lib/getDataFromBackend";
import { getItemz } from "@/lib/item/getItem";

const page = () => {
  const { token, user  } = useUser();
const [Data, setData] = useState<ItemProps[]>([]);

useEffect(() => {
  if (!token || !user?._id) return;

  getItemz<ItemProps[]>(user._id, token)
    .then(setData)
    .catch(console.error);
}, [token, user?._id]);


  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 flex flex-col h-auto justify-center items-center">
      <h1 className="font-bold text-[40px] mt-[30px]">Profile</h1>
      <EditProfile />
      <div className="mt-10 w-[70%]">
        <h1 className="font-bold text-[30px]">User's listed items:</h1>
      </div>
     <div className="w-[70%] flex rounded-md h-auto mt-[50px] mb-[50px] justify-between flex-wrap">
  {Data.length > 0 ? (
    Data.map((item) => (
      <ReportCard key={item._id} {...item} />
    ))
  ) : <div>User has no listed Items</div>}
</div>

    </div>
  );
};
export default page;
