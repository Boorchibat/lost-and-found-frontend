"use client";

import Image from "next/image";
import { useEffect, useState, use } from "react";
import { Button } from "@/components/ui/button";
import { ModalClaim } from "../components/ModalClaim";
import { ItemProps } from "@/index";
import { getSingleItem } from "@/lib/item/getSingleItemById";
import CircularProgress from "@mui/material/CircularProgress";
import { useUser } from "@/app/context/UserContext";
import { ModalUpdateItem } from "../components/UpdateItem";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ItemDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { user } = useUser();

  const [item, setItem] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openClaim, setOpenClaim] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    if (!id) return;

    getSingleItem<ItemProps>(id)
      .then(setItem)
      .catch((err) => setError(err.message || "Failed to load item"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  const isOwner = item?.User === user?._id;

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  if (!item) {
    return <div className="text-center mt-10">Item not found</div>;
  }
  console.log(item);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="relative w-full h-96 rounded-xl overflow-hidden">
        <Image
          src={item.mainImage?.url || "/file.svg"}
          alt={item.itemname}
          fill
          className="object-cover"
        />
      </div>

      <div className="mt-6 space-y-4">
        <h1 className="text-4xl font-bold">{item.itemname}</h1>
        <p className="text-gray-700">{item.description}</p>
        <div className="w-[40%] flex bg-red-100">
          {user ? (
            <Button onClick={() => setOpenClaim(true)}>Make Claim</Button>
          ) : (
            <p className="text-sm text-red-500">
              You have to be logged in to make a claim.
            </p>
          )}
          {user && isOwner ? (
            <Button onClick={() => setOpenUpdate(true)}>Update Item</Button>
          ) : null}
        </div>
      </div>

      {user && openClaim && (
        <ModalClaim
          open={openClaim}
          handleClose={() => setOpenClaim(false)}
          itemId={item._id}
          userId={user._id}
          onSuccess={() => console.log("Claim submitted")}
        />
      )}
      {user && isOwner && (
        <ModalUpdateItem
          open={openUpdate}
          handleClose={() => setOpenUpdate(false)}
          item={item}
        />
      )}
    </div>
  );
}
