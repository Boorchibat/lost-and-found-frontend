"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

import { getSingleItem } from "@/lib/item/getSingleItemById";
import { DeleteItem } from "@/lib/item/deleteItem";

import { ClaimCard } from "../components/ClaimCard";
import { ModalClaim } from "../components/ModalClaim";
import { ModalUpdateItem } from "../components/UpdateItem";
import { ClaimModal } from "../components/ClaimModal";

import { ItemProps } from "@/index";
import { ModalDelete } from "@/app/components/Modal/ModalDelete";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ItemDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { user, token } = useUser();
  const router = useRouter();

  const [item, setItem] = useState<ItemProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openClaim, setOpenClaim] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [openClaimModal, setOpenClaimModal] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const CLAIMS_PER_PAGE = 6;

  const handleOpenClaimModal = (claimId: string) => {
    setSelectedClaimId(claimId);
    setOpenClaimModal(true);
  };

  const handleCloseClaimModal = () => {
    setOpenClaimModal(false);
    setSelectedClaimId(null);
  };
  useEffect(() => {
    if (!id) return;

    getSingleItem<ItemProps>(id)
      .then(setItem)
      .catch((err) => setError(err.message || "Failed to load item"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="text-center bg-gradient-to-r from-yellow-500 to-blue-400 mt-10 text-red-500">
        {error}
      </div>
    );
  if (!item)
    return (
      <div className="text-center bg-gradient-to-r from-yellow-500 to-blue-400 mt-10">
        Item not found
      </div>
    );

  const isOwner = item.User?._id === user?._id;

  const handleDelete = async () => {
    if (!token || !item._id) return;

    try {
      setDeleteError(null);
      await DeleteItem(item._id, token);
      setOpenDelete(false);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setDeleteError(
        err?.response?.data?.message || err?.message || "Failed to delete item"
      );
    }
  };

  const totalPages = item.claims
    ? Math.ceil(item.claims.length / CLAIMS_PER_PAGE)
    : 0;
  const paginatedClaims = item.claims?.slice(
    currentPage * CLAIMS_PER_PAGE,
    currentPage * CLAIMS_PER_PAGE + CLAIMS_PER_PAGE
  );
  const mongoDate = item.createdAt;
  const dateOnly = new Date(mongoDate).toISOString().split("T")[0];

  console.log(dateOnly);

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-blue-400">
      <div className="max-w-5xl  mx-auto p-6">
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
          <h1>{item.contactEmail}</h1>
          <h1>{item.contactNumber}</h1>
          <h1>{dateOnly}</h1>
          <h1>{item.isFound}</h1>
          <div className="flex gap-4">
            {user ? (
              <Button onClick={() => setOpenClaim(true)}>Make Claim</Button>
            ) : (
              <p className="text-sm text-red-500">
                You must be logged in to make a claim.
              </p>
            )}

            {user && isOwner && (
              <>
                <Button onClick={() => setOpenUpdate(true)}>Update Item</Button>
                <Button
                  onClick={() => setOpenDelete(true)}
                  className="bg-transparent hover:bg-transparent"
                >
                  <Image src="/trash.svg" alt="trash" width={40} height={40} />
                </Button>
              </>
            )}
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

        {user && isOwner && (
          <ModalDelete
            open={openDelete}
            handleClose={() => setOpenDelete(false)}
            deleteType={handleDelete}
            error={deleteError}
          />
        )}

        {isOwner && (
          <div className="w-full bg-white flex flex-col gap-3 mt-8 p-4 rounded-md">
            {!item.claims || item.claims.length === 0 ? (
              <p className="text-gray-600">No claims made for this item</p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {paginatedClaims?.map((claimId) => (
                    <div
                      key={claimId}
                      onClick={() => handleOpenClaimModal(claimId)}
                      className="cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                      <ClaimCard itemId={item._id} claimId={claimId} />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <Button
                      disabled={currentPage === 0}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {currentPage + 1} of {totalPages}
                    </span>
                    <Button
                      disabled={currentPage + 1 >= totalPages}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {openClaimModal && selectedClaimId && user && (
          <ClaimModal
            open={openClaimModal}
            handleClose={handleCloseClaimModal}
            itemId={item._id}
            claimId={selectedClaimId}
          />
        )}
      </div>
    </div>
  );
}
