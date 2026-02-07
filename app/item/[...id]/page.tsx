"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, use } from "react";
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
  const [imageIndex, setImageIndex] = useState(0);
  const CLAIMS_PER_PAGE = 6;

  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

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

  if (loading)
    return (
      <div className="w-full h-screen flex items-center bg-gradient-to-r from-yellow-500 to-blue-400 justify-center">
        <CircularProgress />
      </div>
    );

  if (error || !item)
    return (
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
    currentPage * CLAIMS_PER_PAGE + CLAIMS_PER_PAGE
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

  const truncatedDescription =
    item.description.length > 100 && !descriptionExpanded
      ? item.description.slice(0, 100) + "..."
      : item.description;

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-blue-400 min-h-screen py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-6">
          <div
            className="relative w-full h-100 rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => setIsCarouselOpen(true)}
          >
            <Image
              src={images[imageIndex]?.url || "/file.svg"}
              alt={item.itemname}
              fill
              className="object-contain"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            <h3 className="font-semibold text-lg">🎨 Colors</h3>
            <p>{item.color?.join(", ") || "Unknown"}</p>

            <h3 className="font-semibold text-lg">👟 Physical Type</h3>
            <p>{item.physical?.join(", ") || "Other"}</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900">{item.itemname}</h1>

          <p className="text-gray-700 text-lg">
            {truncatedDescription}
            {item.description.length > 100 && (
              <button
                onClick={() => setDescriptionExpanded((prev) => !prev)}
                className="ml-2 text-blue-600 font-semibold"
              >
                {descriptionExpanded ? "See Less" : "See More"}
              </button>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
            <div>
              <h3 className="font-semibold">📧 Email</h3>
              <p>{item.contactEmail}</p>
            </div>
            <div>
              <h3 className="font-semibold">📞 Phone</h3>
              <p>{item.contactNumber}</p>
            </div>
            <div>
              <h3 className="font-semibold">📅 Date Reported</h3>
              <p>{dateOnly}</p>
            </div>
            <div>
              <h3 className="font-semibold">🔎 Status</h3>
              <p>{item.isFound}</p>
            </div>
            <div>
              <h3 className="font-semibold">📍 Location</h3>
              <p>{item.location}</p>
            </div>
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
      </div>

      {item.claims && isOwner && item.claims.length > 0 && (
        <div className="rounded-2xl bg-gray-500 shadow-lg p-6 space-y-4 mt-8">
          <h2 className="text-2xl bg-white p-6 rounded-md font-bold">Claims</h2>
          <div className="flex flex-wrap gap-6 mt-4 justify-evenly">
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
          handleClose={() => {
            setOpenUpdate(false);
            fetchItem();
          }}
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
          handleClose={() => {
            setOpenClaimDetailsModal(false);
            setSelectedClaimId(null);
          }}
          itemId={item._id}
          claimId={selectedClaimId}
        />
      )}

      <CarouselModal
        images={images}
        isOpen={isCarouselOpen}
        onClose={() => setIsCarouselOpen(false)}
      />
    </div>
  );
}
