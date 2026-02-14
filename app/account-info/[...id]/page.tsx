"use client";

import { useEffect, useState } from "react";
import { getItemz } from "@/lib/item/getItem";
import { ItemProps } from "@/index";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";
import { EditProfile } from "@/app/components/profile/EditProfile";
import { ReportCard } from "@/app/components/report-page/components/card/ReportCard";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const userIdParam = params?.id as string;

  const [data, setData] = useState<ItemProps[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemsLoading(true);
        if (!userIdParam) return;

        const result = await getItemz<ItemProps[]>(userIdParam);
        setData(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error(error);
        setData([]);
      } finally {
        setItemsLoading(false);
      }
    };

    fetchItems();
  }, [userIdParam]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userIdParam) {
        setUserData(null);
        setUserLoading(false);
        return;
      }
      try {
        setUserLoading(true);
        const result = await getSingleUser(userIdParam);
        setUserData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [userIdParam]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 flex flex-col items-center">
      <h1 className="font-bold text-[40px] mt-[30px]">Profile</h1>

      {userLoading ? <CircularProgress /> : <EditProfile userData={userData} />}

      <div className="mt-10 w-[70%] text-center">
        <h1 className="font-bold text-[30px]">User&apos;s listed items:</h1>
      </div>

      <div className="w-[70%] mt-[50px] mb-[50px]">
        {itemsLoading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {currentItems.map((item) => (
                <ReportCard key={item._id} {...item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
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

export default Page;
