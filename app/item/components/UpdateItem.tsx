"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "@/app/context/UserContext";
import { uploadToCloudinary } from "@/lib/cloudinary/UploadToCloudinary";
import { ItemProps, Image as ImageType, } from "@/index";
import { UpdateItem } from "@/lib/item/updateItem";
import Image from "next/image";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  item: ItemProps;
};

const style = {
  position: "absolute" as const,
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
  maxHeight: "90vh",
  overflowY: "auto",
};

export const ModalUpdateItem = ({ open, handleClose, item }: ModalProps) => {
  const { token } = useUser();
  const [uploadMessage, setUploadMessage] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  if (!token) {
    return (
      <div className="p-4">
        You must be logged in. Go back{" "}
        <a className="underline" href="/">
          Home
        </a>
      </div>
    );
  }

  const handleMainFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadMessage("❌ Main image must be an image file");
      return;
    }
    setMainImageFile(file);
    setUploadMessage("✅ Main image selected!");
  };

  const handleMultipleFilesUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      setUploadMessage("❌ All selected files must be images.");
      return;
    }

    setImageFiles(validFiles);
    setUploadMessage(`✅ ${validFiles.length} image(s) selected!`);
  };

  const validationSchema = Yup.object({
    itemname: Yup.string().required("Item name is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    contactNumber: Yup.string()
      .matches(/^\d{7,15}$/, "Invalid phone number")
      .required("Contact number is required"),
    contactEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    name: Yup.string().required("Name is required"),
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1 className="text-2xl font-bold text-center mb-6">Update Item</h1>

        <Formik
          initialValues={{
            itemname: item.itemname,
            location: item.location,
            description: item.description,
            contactNumber: item.contactNumber,
            contactEmail: item.contactEmail,
            name: item.name,
            isFound: item.isFound,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              let uploadedMainImage: ImageType | undefined = item.mainImage;
              if (mainImageFile) {
                const cloud = await uploadToCloudinary(mainImageFile);
                uploadedMainImage = {
                  url: cloud.secure_url,
                  public_id: cloud.public_id,
                };
              }

              const uploadedImages: ImageType[] = item.images || [];
              if (imageFiles.length > 0) {
                const cloudFiles = await Promise.all(
                  imageFiles.map((file) => uploadToCloudinary(file))
                );
                uploadedImages.push(
                  ...cloudFiles.map((img) => ({
                    url: img.secure_url,
                    public_id: img.public_id,
                  }))
                );
              }

              const payload: Partial<ItemProps> = {
                itemname: values.itemname,
                location: values.location,
                description: values.description,
                contactNumber: Number(values.contactNumber),
                contactEmail: values.contactEmail,
                name: values.name,
                isFound: values.isFound,
                mainImage: uploadedMainImage,
                images: uploadedImages,
              };

              await UpdateItem(payload, item._id, token);
              handleClose();
            } catch (error: any) {
              const backendMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Update failed";
              setStatus(backendMessage);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting,
            handleChange,
            values,
            errors,
            touched,
            status,
          }) => (
            <Form className="flex flex-col gap-4">
              {[
                { label: "Item Name", name: "itemname" },
                { label: "Location", name: "location" },
                { label: "Description", name: "description" },
                { label: "Name", name: "name" },
                { label: "Contact Number", name: "contactNumber" },
                { label: "Contact Email", name: "contactEmail" },
              ].map((field) => (
                <div
                  key={field.name}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <h1 className="font-bold w-32">{field.label}:</h1>
                  <Input
                    type="text"
                    name={field.name}
                    value={(values as any)[field.name]}
                    onChange={handleChange}
                    className="flex-1"
                  />
                  {touched[field.name as keyof typeof touched] &&
                    errors[field.name as keyof typeof errors] && (
                      <p className="text-red-500 text-sm">
                        <ErrorMessage name={field.name} />
                      </p>
                    )}
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Main Image:</h1>
                <input
                  id="main-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleMainFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="main-upload"
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer hover:border-black"
                >
                  <Image
                    src="/upload.svg"
                    alt="Upload"
                    width={30}
                    height={30}
                  />
                  <span>
                    {mainImageFile
                      ? mainImageFile.name
                      : "Click or drag to upload main image"}
                  </span>
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

              <div className="flex flex-col gap-2">
                <h1 className="font-bold">Additional Images:</h1>
                <input
                  id="multi-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleFilesUpload}
                  className="hidden"
                />
                <label
                  htmlFor="multi-upload"
                  className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer hover:border-black"
                >
                  <Image
                    src="/upload.svg"
                    alt="Upload"
                    width={30}
                    height={30}
                  />
                  <span>
                    {imageFiles.length > 0
                      ? `${imageFiles.length} image(s) selected`
                      : "Click or drag to upload additional images"}
                  </span>
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

              {status && <p className="text-red-500 text-center">{status}</p>}

              <div className="flex gap-4 mt-4 justify-center">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-green-400 hover:text-black"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
                <Button
                  type="button"
                  onClick={handleClose}
                  className="bg-white text-black hover:bg-red-400 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
