"use client";

import Image from "next/image";
import { use, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";
import { useUser } from "@/app/context/UserContext";
import { useRouter } from "next/navigation";

import { getSingleItem } from "@/lib/item/getSingleItemById";
import { DeleteItem } from "@/lib/item/deleteItem";

import { ClaimCard } from "../components/ClaimCard";
import { ItemProps } from "@/index";
import { CarouselModal } from "../components/Carousel";
import { ModalUpdateItem } from "../components/UpdateItem";
import { ModalClaim } from "../components/ModalClaim";
import { ModalDelete } from "@/app/components/Modal/ModalDelete";
import { ClaimModal } from "../components/ClaimModal";

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
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [openClaimDetailsModal, setOpenClaimDetailsModal] = useState(false);

  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const CLAIMS_PER_PAGE = 6;

  const fetchItem = useCallback(() => {
    if (!id) return;
    setLoading(true);
    getSingleItem<ItemProps>(id)
      .then(setItem)
      .catch((err) => setError(err.message || "Failed to load item"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress />
    </div>
  );

  if (error || !item) return (
    <div className="text-center bg-gradient-to-r from-yellow-500 to-blue-400 mt-10 p-10">
      {error || "Item not found"}
    </div>
  );

  const images = [item.mainImage, ...(item.images || [])];
  const dateOnly = new Date(item.createdAt).toISOString().split("T")[0];
  const isOwner = item.User?._id === user?._id;

  const totalClaims = item.claims?.length || 0;
  const totalPages = Math.ceil(totalClaims / CLAIMS_PER_PAGE);
  const paginatedClaims = item.claims?.slice(
    currentPage * CLAIMS_PER_PAGE,
    currentPage * CLAIMS_PER_PAGE + CLAIMS_PER_PAGE,
  );

  const handleOpenClaimDetails = (claimId: string) => {
    setSelectedClaimId(claimId);
    setOpenClaimDetailsModal(true);
  };

  const handleDelete = async () => {
    if (!token || !item._id) return;
    try {
      setDeleteError(null);
      await DeleteItem(item._id, token);
      setOpenDelete(false);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      setDeleteError(err?.response?.data?.message || err?.message || "Failed to delete item");
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-blue-400 min-h-screen py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div
          className="relative w-full h-96 rounded-xl overflow-hidden shadow-xl cursor-pointer"
          onClick={() => setIsCarouselOpen(true)}
        >
          <Image
            src={images[0]?.url || "/file.svg"}
            alt={item.itemname}
            fill
            className="object-cover"
          />
        </div>

        <CarouselModal
          images={images}
          isOpen={isCarouselOpen}
          onClose={() => setIsCarouselOpen(false)}
        />

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{item.itemname}</h1>
          <p className="text-gray-700 text-lg">{item.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
            <div><h3 className="font-semibold">📧 Email</h3><p>{item.contactEmail}</p></div>
            <div><h3 className="font-semibold">📞 Phone</h3><p>{item.contactNumber}</p></div>
            <div><h3 className="font-semibold">📅 Date Reported</h3><p>{dateOnly}</p></div>
            <div><h3 className="font-semibold">🔎 Status</h3><p>{item.isFound}</p></div>
            <div><h3 className="font-semibold">🎨 Colors</h3><p>{item.color?.join(", ") || "Unknown"}</p></div>
            <div><h3 className="font-semibold">👟 Physical Type</h3><p>{item.physical?.join(", ") || "Other"}</p></div>
            <div><h3 className="font-semibold">📍 Location</h3><p>{item.location}</p></div>
          </div>

          <div className="flex flex-wrap gap-4 mt-6">
            {user && !isOwner && (
              <Button onClick={() => setOpenClaim(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                Make Claim
              </Button>
            )}
            {user && isOwner && (
              <>
                <Button onClick={() => setOpenUpdate(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  Update Item
                </Button>
                <Button onClick={() => setOpenDelete(true)} className="bg-red-500 hover:bg-red-600 text-white">
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {item.claims && isOwner && item.claims.length > 0 && (
          <div className="rounded-2xl shadow-lg p-6 space-y-4">
            <h2 className="text-2xl bg-white p-6 rounded-md font-bold">Claims</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {paginatedClaims?.map((claimId) => (
                <div 
                  key={claimId} 
                  onClick={() => handleOpenClaimDetails(claimId)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <ClaimCard itemId={item._id} claimId={claimId} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6 bg-white p-4 rounded-lg">
                <Button
                  disabled={currentPage === 0}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="font-medium">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <Button
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}

        {openClaim && user && (
          <ModalClaim 
            open={openClaim} 
            handleClose={() => setOpenClaim(false)} 
            itemId={item._id} 
            userId={user._id} 
            onSuccess={fetchItem} 
          />
        )}

        {openUpdate && (
          <ModalUpdateItem 
            open={openUpdate} 
            handleClose={() => { setOpenUpdate(false); fetchItem(); }} 
            item={item} 
          />
        )}

        {openDelete && (
          <ModalDelete 
            open={openDelete} 
            handleClose={() => setOpenDelete(false)} 
            deleteType={handleDelete} 
            error={deleteError} 
          />
        )}

        {openClaimDetailsModal && selectedClaimId && (
          <ClaimModal
            open={openClaimDetailsModal}
            handleClose={() => { setOpenClaimDetailsModal(false); setSelectedClaimId(null); }}
            itemId={item._id}
            claimId={selectedClaimId}
          />
        )}
      </div>
    </div>
  );
}
