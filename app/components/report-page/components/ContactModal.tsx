"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ItemProps } from "@/index";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  data: ItemProps;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  p: 0,
  borderRadius: 12,
  outline: "none",
};

export const ContactModal = ({ open, handleClose, data }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={style}
        className="bg-white shadow-lg rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="p-6 flex flex-col gap-4">
          <h1 className="text-xl font-semibold text-gray-800 justify-center items-center" id="modal-title">
            Contact {data.name || "the seller"}
          </h1>
          <p className=" font-bold text-[15px]" id="modal-description">
            You can reach them at:
          </p>
          <div className="flex flex-col gap-2">
            {data.contactEmail && (
              <p className="text-gray-700">
                📧 Email:{" "}
                <a
                  href={`mailto:${data.contactEmail}`}
                  className="text-blue-500 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {data.contactEmail}
                </a>
              </p>
            )}
            {data.contactNumber && (
              <p className="text-gray-700">
                📞 Phone:{" "}
                <a
                  href={`tel:${data.contactNumber}`}
                  className="text-blue-500 underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {data.contactNumber}
                </a>
              </p>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="mt-4 bg-gradient-to-r from-blue-500 to-green-400 text-white hover:scale-105 transition-transform duration-300"
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
