"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  deleteType: () => void;
  error?: string | null;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  borderRadius: 2,
  backgroundColor: "white",
};

export const ModalDelete = ({ open, handleClose, deleteType, error }: ModalProps) => {
  const handleConfirm = () => {
    deleteType();
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-full items-center p-5 gap-4">
          <h1 className="text-lg font-bold">
            Are you sure you want to delete?
          </h1>
          <h1>{error}</h1>
          <div className="flex gap-[50px]">
            <Button
              onClick={handleConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, Delete
            </Button>
            <Button
              onClick={handleClose}
              className="bg-gray-300 text-black hover:bg-gray-400"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
