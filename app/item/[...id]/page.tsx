"use client";

import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useUser } from "@/app/context/UserContext";
import { Button } from "@/components/ui/button";
import { ModalClaim } from "../components/ModalClaim";
import { ItemProps } from "@/index";
import { getSingleItem } from "@/lib/item/getSingleItemById";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function ItemDetailPage({ params }: PageProps) {
  const { id } = use(params); // ✅ UNWRAP PARAMS
  const { token } = useUser();

  const [item, setItem] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openClaim, setOpenClaim] = useState(false);

  useEffect(() => {
    if (!token || !id) return;

    getSingleItem<ItemProps>(id, token)
      .then(setItem)
      .catch((err) => setError(err.message || "Failed to load item"))
      .finally(() => setLoading(false));
  }, [id, token]);

  if (loading) return <div className="text-center mt-10">Loading item...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!item) return null;
  console.log(item)

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

        <Button onClick={() => setOpenClaim(true)}>
          Make Claim
        </Button>
      </div>

      {openClaim && (
        <ModalClaim open handleClose={() => setOpenClaim(false)} />
      )}
    </div>
  );
}
