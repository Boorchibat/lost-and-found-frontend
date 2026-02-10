"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useUser } from "@/app/context/UserContext";
import { uploadToCloudinary } from "@/lib/cloudinary/UploadToCloudinary";
import { ItemProps, Image as ImageType } from "@/index";
import { UpdateItem } from "@/lib/item/updateItem";
import Image from "next/image";
import { XCircle, CheckCircle2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";

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
  width: "95%",
  maxWidth: 700,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  maxHeight: "90vh",
  overflowY: "auto",
};

const COLORS = [
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Black",
  "White",
  "Gray",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "other",
];
const PHYSICALS = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "AirPods",
  "Laptop Charger",
  "Notebook",
  "other",
];

export const ModalUpdateItem = ({ open, handleClose, item }: ModalProps) => {
  const { token } = useUser();
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [persistedImages, setPersistedImages] = useState<ImageType[]>(
    item.images || [],
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validationSchema = Yup.object({
    itemname: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    contactNumber: Yup.string().required("Required"),
    contactEmail: Yup.string().email("Invalid email").required("Required"),
    name: Yup.string().required("Required"),
  });

  const handleMainFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMainImageFile(file);
  };

  const handleMultipleFilesUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
  };
  const router = useRouter();

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1 className="text-3xl font-extrabold text-center mb-6">
            Update Item
          </h1>
          <Formik
            initialValues={{
              itemname: item.itemname || "",
              location: item.location || "",
              description: item.description || "",
              contactNumber: item.contactNumber?.toString() || "",
              contactEmail: item.contactEmail || "",
              name: item.name || "",
              isFound: item.isFound || "In progress",
              color: item.color || [],
              physical: item.physical || [],
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                let uploadedMainImage = item.mainImage;
                if (mainImageFile) {
                  const cloud = await uploadToCloudinary(mainImageFile);
                  uploadedMainImage = {
                    url: cloud.secure_url,
                    public_id: cloud.public_id,
                  };
                }
                const newImages = [...persistedImages];
                if (imageFiles.length > 0) {
                  const uploads = await Promise.all(
                    imageFiles.map((f) => uploadToCloudinary(f)),
                  );
                  newImages.push(
                    ...uploads.map((u) => ({
                      url: u.secure_url,
                      public_id: u.public_id,
                    })),
                  );
                }
                await UpdateItem(
                  {
                    ...values,
                    contactNumber: Number(values.contactNumber),
                    mainImage: uploadedMainImage,
                    images: newImages,
                  },
                  item._id,
                  token!,
                );
                setShowSuccessModal(true);
                handleClose()
              
              } catch (err) {
                console.error(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, values, isSubmitting, errors }) => (
              <Form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold mb-1">Item Name</p>
                    <Input
                      name="itemname"
                      value={values.itemname}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Location</p>
                    <Input
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Status</p>
                    <select
                      name="isFound"
                      value={values.isFound}
                      onChange={handleChange}
                      className="w-full border rounded-md p-2 bg-white"
                    >
                      <option value="In progress">In progress</option>
                      <option value="Found">Found</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Your Name</p>
                    <Input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Phone</p>
                    <Input
                      name="contactNumber"
                      value={values.contactNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-1">Email</p>
                    <Input
                      name="contactEmail"
                      value={values.contactEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Description</p>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 h-20"
                  />
                </div>
                <div className="flex gap-4 items-start">
                  <div>
                    <p className="text-sm font-bold mb-1">Main Image</p>
                    <label className="relative block w-24 h-24 border-2 border-dashed rounded cursor-pointer overflow-hidden">
                      <Image
                        src={
                          mainImageFile
                            ? URL.createObjectURL(mainImageFile)
                            : item.mainImage?.url || "/file.svg"
                        }
                        alt="Main"
                        fill
                        className="object-cover"
                      />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleMainFileUpload}
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold mb-1">Gallery</p>
                    <div className="flex flex-wrap gap-2">
                      {persistedImages.map((img) => (
                        <div key={img.public_id} className="relative w-16 h-16">
                          <Image
                            src={img.url}
                            alt="Gallery"
                            fill
                            className="object-cover rounded"
                          />
                          <XCircle
                            onClick={() =>
                              setPersistedImages((prev) =>
                                prev.filter(
                                  (i) => i.public_id !== img.public_id,
                                ),
                              )
                            }
                            className="absolute -top-1 -right-1 text-red-500 bg-white rounded-full cursor-pointer"
                            size={18}
                          />
                        </div>
                      ))}
                      {imageFiles.map((file, i) => (
                        <div
                          key={i}
                          className="relative w-16 h-16 border border-blue-400"
                        >
                          <Image
                            src={URL.createObjectURL(file)}
                            alt="New"
                            fill
                            className="object-cover rounded"
                          />
                          <XCircle
                            onClick={() =>
                              setImageFiles((prev) =>
                                prev.filter((_, idx) => idx !== i),
                              )
                            }
                            className="absolute -top-1 -right-1 text-red-500 bg-white rounded-full cursor-pointer"
                            size={18}
                          />
                        </div>
                      ))}
                      <label className="flex items-center justify-center w-16 h-16 border-2 border-dashed rounded cursor-pointer">
                        <UploadCloud className="text-gray-400" size={20} />
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleMultipleFilesUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-xs mb-1">Colors</p>
                    <div className="flex flex-wrap gap-1">
                      {COLORS.map((c) => (
                        <label
                          key={c}
                          className={`text-[15px] p-2 rounded cursor-pointer ${values.color.includes(c) ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                        >
                          <input
                            type="checkbox"
                            name="color"
                            value={c}
                            checked={values.color.includes(c)}
                            onChange={handleChange}
                            className="hidden"
                          />{" "}
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-xs mb-1">Category</p>
                    <div className="flex flex-wrap gap-1">
                      {PHYSICALS.map((p) => (
                        <label
                          key={p}
                          className={`text-[15px] p-2 rounded cursor-pointer ${values.physical.includes(p) ? "bg-green-600 text-white" : "bg-gray-100"}`}
                        >
                          <input
                            type="checkbox"
                            name="physical"
                            value={p}
                            checked={values.physical.includes(p)}
                            onChange={handleChange}
                            className="hidden"
                          />{" "}
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white h-12 rounded-xl"
                >
                  {isSubmitting ? "Updating..." : "Update Item"}
                </Button>
                {Object.keys(errors).length > 0 && (
                  <p className="text-red-500 text-center text-xs">
                    Please fill in all required fields
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <Box sx={{ ...style, maxWidth: 350, textAlign: "center" }}>
          <CheckCircle2 size={50} className="text-green-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold">Updated!</h2>
          <p className="text-gray-600 text-sm mb-4">
            Item details have been saved.
          </p>
          <Button
            onClick={() => setShowSuccessModal(false)}
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};
