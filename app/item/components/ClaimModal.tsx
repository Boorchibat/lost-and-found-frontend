"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { getSingleUser } from "@/lib/auth/getUser";
import { getClaimz } from "@/lib/claim/getClaims";
import Image from "next/image";
import { deleteClaim } from "@/lib/claim/deleteClaim";
import { ModalDelete } from "@/app/components/Modal/ModalDelete";

type ModalClaimProps = {
  open: boolean;
  handleClose: () => void;
  itemId: string;
  claimId: string;
  onSuccess?: () => void;
};

export const ClaimModal = ({
  open,
  handleClose,
  claimId,
  itemId,
  onSuccess,
}: ModalClaimProps) => {
  const { token } = useUser();

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [claimData, setClaimData] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    if (!claimId || !itemId || !token) return;

    const fetchClaim = async () => {
      try {
        setLoading(true);
        const data = await getClaimz({ itemId, claimId, token });
        setClaimData(data);
      } finally {
        setLoading(false);
      }
    };

    fetchClaim();
  }, [claimId, itemId, token]);

  useEffect(() => {
    if (!claimData?.User) return;

    const fetchUser = async () => {
      const data = await getSingleUser(claimData.User);
      setUserData(data);
    };

    fetchUser();
  }, [claimData?.User]);

  const handleDeleteClaim = async () => {
    if (!token || !claimId || !itemId) return;

    try {
      setDeleting(true);
      await deleteClaim({ itemId, claimId, token });
      onSuccess?.();
      handleClose();
    } finally {
      setDeleting(false);
    }
  };
  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (!claimData) {
    return (
      <div className="w-full flex justify-center py-10">
        <p className="text-gray-600">Claim not found</p>
      </div>
    );
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-center justify-center p-4"
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: { xs: "100%", sm: 500, md: 700 },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Claim Details</h2>
            <Button
              variant="ghost"
              onClick={() => setOpenDelete(true)}
              disabled={deleting}
            >
              <Image src="/trash.svg" alt="trash" width={60} height={60} />
            </Button>
          </div>

          {userData && (
            <div className="flex items-center gap-4 mb-6">
              <Image
                src={userData.profileImage?.url || "/user.svg"}
                alt={userData.username}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{userData.username}</p>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex gap-2">
              <span className="font-semibold min-w-[80px]">Name:</span>
              <span>{claimData.Name}</span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold min-w-[80px]">Email:</span>
              <a
                href={`mailto:${claimData.Email}`}
                className="text-blue-600 hover:underline"
              >
                {claimData.Email}
              </a>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold min-w-[80px]">Phone:</span>
              <a
                href={`tel:${claimData.Number}`}
                className="text-blue-600 hover:underline"
              >
                {claimData.Number}
              </a>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold min-w-[80px]">Message:</span>
              <span className="whitespace-pre-wrap">{claimData.Claim}</span>
            </div>
          </div>
        </Box>
      </Modal>

      <ModalDelete
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        deleteType={handleDeleteClaim}
      />
    </>
  );
};
