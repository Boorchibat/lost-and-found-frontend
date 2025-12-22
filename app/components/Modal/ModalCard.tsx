"use client";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { ReportCard } from "../report-page/components/card/ReportCard";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  p: 4,
  borderRadius: 2,
};

export const ModalCard = (props: ModalProps) => {
  const { open, handleClose } = props;


  return (
    <div className="flex bg-gradient-to-r from-yellow-500 to-blue-400">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col w-full items-center p-5">
            <ReportCard/>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
