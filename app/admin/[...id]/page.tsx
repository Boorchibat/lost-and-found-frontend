"use client";

import { useUser } from "@/app/context/UserContext";
import { AdminPanel } from "../_components/AdminPanel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getSingleUser } from "@/lib/auth/getUser";
import CircularProgress from "@mui/material/CircularProgress";

type PageProps = {
  params: {
    userId: string;
  };
};

const Page = ({ params }: PageProps) => {
  const { user, token } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUser = async () => {
      try {
        const data = await getSingleUser(user._id);
        setUserData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user?._id]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-b from-yellow-500 to-blue-400 justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user || !userData || userData.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-blue-400 flex flex-col md:flex-row gap-6 justify-center items-center px-6 text-center">
        <h1 className="text-lg sm:text-xl font-bold max-w-md">
          Sorry, only admins have access to this page.
        </h1>
        <Button
          className="bg-green-500 px-6 py-3 text-black"
          onClick={() => (window.location.href = "/")}
        >
          Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-blue-400 flex flex-col items-center px-4 sm:px-8">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mt-6">
        Admin Panel
      </h1>
      <div className="w-full flex justify-center mt-6 mb-10">
        <div className="w-full max-w-7xl">
          <AdminPanel />
        </div>
      </div>
    </div>
  );
};

export default Page;
