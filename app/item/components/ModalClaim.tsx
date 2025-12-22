"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
};

export const ModalClaim = ({ open, handleClose }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center p-4"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: "100%", sm: 500, md: 700 }, // responsive widths
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="flex flex-col w-full items-center gap-6">
          <h1 className="font-bold text-2xl sm:text-3xl">Make a Claim</h1>

          <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
            <h1 className="font-bold text-lg sm:w-[150px]">Name:</h1>
            <Input placeholder="Name..." className="flex-1" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <h1 className="font-bold text-lg">Claim:</h1>
            <textarea
              className="w-full h-36 border rounded-md p-3 resize-none focus:outline-none focus:ring-2"
              placeholder="Type your claim here..."
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
            <h1 className="font-bold text-lg sm:w-[150px]">Email:</h1>
            <Input placeholder="Email..." type="email" className="flex-1" />
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
            <h1 className="font-bold text-lg sm:w-[150px]">Phone Number:</h1>
            <Input placeholder="Number..." type="tel" className="flex-1" />
          </div>

          <div className="flex flex-col sm:flex-row w-full gap-4 justify-center mt-4">
            <Button className="flex-1 w-full sm:w-auto border border-black bg-black text-white rounded-md hover:bg-green-400 hover:text-black">
              Submit
            </Button>
            <Button
              onClick={handleClose}
              className="flex-1 w-full sm:w-auto border border-black bg-white text-black rounded-md hover:bg-red-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
