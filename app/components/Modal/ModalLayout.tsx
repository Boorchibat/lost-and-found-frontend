"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  handleOpen?: () => void;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ModalLayout = (props: ModalProps) => {
  const { open, handleClose } = props;
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadMessage("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadMessage("❌ File must be an image.");
      return;
    }
    setUploadMessage("✅ Image uploaded successfully!");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col w-full items-center p-2 sm:p-4">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
            Update Profile
          </h1>

          <div className="flex flex-col sm:flex-row w-full sm:justify-between mt-4 sm:mt-6 gap-4">
            <h1 className="font-bold w-full sm:w-1/3 text-lg sm:text-xl">
              Profile Image:
            </h1>
            <div className="flex flex-col w-full sm:w-2/3">
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="flex items-center justify-center gap-2 border border-gray-500 rounded-md p-2 cursor-pointer w-full h-10"
              >
                <Image src="/upload.svg" alt="upload" width={30} height={30} />
                Upload Image
              </label>
              {uploadMessage && (
                <p
                  className={`mt-2 font-semibold ${
                    uploadMessage.includes("❌")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {uploadMessage}
                </p>
              )}
            </div>
          </div>

          {/** Name, Role, Email, Contact **/}
          {["Name", "Role", "Email", "Contact"].map((field) => (
            <div
              key={field}
              className="flex flex-col sm:flex-row w-full sm:justify-between mt-4 sm:mt-6 gap-2 sm:gap-4"
            >
              <h1 className="font-bold w-full sm:w-1/3 text-lg sm:text-xl">
                {field}:
              </h1>
              {field === "Role" ? (
                <select className="w-full sm:w-2/3 border border-gray-400 rounded-md p-2 outline-none">
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              ) : (
                <Input className="w-full sm:w-2/3" />
              )}
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:justify-center">
            <Button className="w-full sm:w-44 h-12 bg-black text-white rounded-md hover:bg-green-400 hover:text-black">
              Submit
            </Button>
            <Button
              onClick={handleClose}
              className="w-full sm:w-44 h-12 border-1 border-black bg-white text-black rounded-md hover:bg-red-400 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
