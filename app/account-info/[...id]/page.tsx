"use client";

import { useEffect, useState } from "react";
import { getItemz } from "@/lib/item/getItem";
import { ItemProps } from "@/index";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@/app/context/UserContext";
import { EditProfile } from "@/app/components/profile/EditProfile";
import { ReportCard } from "@/app/components/report-page/components/card/ReportCard";
import { Button } from "@/components/ui/button";

const page = () => {
  const { token, user } = useUser();
  const [Data, setData] = useState<ItemProps[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    setItemsLoading(false);

    getItemz<ItemProps[]>(user._id).then(setData).catch(console.error);
  }, [user?._id]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(Data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = Data.slice(startIndex, endIndex);

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
      <div className="mt-10 flex w-full justify-center items-center w-[70%]">
        <h1 className="font-bold text-[30px]">User's listed items:</h1>
      </div>
      <div className="w-[70%] flex rounded-md h-auto mt-[50px] mb-[50px] justify-center items-center flex-wrap">
        {itemsLoading ? (
          <div className="flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex justify-center items-center gap-6">
              {currentItems.map((item) => (
                <ReportCard key={item._id} {...item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-800 mt-6">
            User has no listed items.
          </div>
        )}
      </div>
    </div>
  );
};
export default page;
