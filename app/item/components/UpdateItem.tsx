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
import { ItemProps, Image as ImageType } from "@/index";
import { UpdateItem } from "@/lib/item/updateItem";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

const COLORS = ["Red","Blue","Yellow","Green","Black","White","Orange","Purple","Gray","Other"];
const PHYSICALS = ["Backpack","Clothes","Shoes","Hat","Airpods","Laptop Charger","Notebook","Other"];

export const ModalUpdateItem = ({ open, handleClose, item }: ModalProps) => {
  const { token } = useUser();
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ImageType[]>(item.images || []);
  const [carouselIndex, setCarouselIndex] = useState(0);

  if (!token) {
    return (
      <div className="p-4">
        You must be logged in. Go back <a className="underline" href="/">Home</a>
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

  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const nextImage = () => setCarouselIndex((prev) => (prev + 1) % uploadedImages.length);
  const prevImage = () => setCarouselIndex((prev) => (prev - 1 + uploadedImages.length) % uploadedImages.length);

  const validationSchema = Yup.object({
    itemname: Yup.string().required("Item name is required"),
    location: Yup.string().required("Location is required"),
    description: Yup.string().required("Description is required"),
    contactNumber: Yup.string().matches(/^\d{7,15}$/, "Invalid phone number").required("Contact number is required"),
    contactEmail: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Name is required"),
    color: Yup.array().min(1, "Select at least one color"),
    physical: Yup.array().min(1, "Select at least one physical type"),
  });

  return (
    <>
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
              color: item.color || [],
              physical: item.physical || [],
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                let uploadedMainImage: ImageType | undefined = item.mainImage;
                if (mainImageFile) {
                  const cloud = await uploadToCloudinary(mainImageFile);
                  uploadedMainImage = { url: cloud.secure_url, public_id: cloud.public_id };
                }

                const newUploadedImages: ImageType[] = [...(item.images || [])];
                if (imageFiles.length > 0) {
                  const cloudFiles = await Promise.all(imageFiles.map((file) => uploadToCloudinary(file)));
                  newUploadedImages.push(...cloudFiles.map((img) => ({ url: img.secure_url, public_id: img.public_id })));
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
                  images: newUploadedImages,
                  color: values.color,
                  physical: values.physical,
                };

                await UpdateItem(payload, item._id, token);

                setUploadedImages(newUploadedImages);
                setCarouselIndex(0);

                handleClose(); // close the update modal
                setShowSuccessModal(true); // show the success modal

              } catch (error: any) {
                setStatus(error?.response?.data?.message || error?.message || "Update failed");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, handleChange, values, errors, touched }) => (
              <Form className="flex flex-col gap-4">
                {[ 
                  { label: "Item Name", name: "itemname" },
                  { label: "Location", name: "location" },
                  { label: "Description", name: "description" },
                  { label: "Name", name: "name" },
                  { label: "Contact Number", name: "contactNumber" },
                  { label: "Contact Email", name: "contactEmail" },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col sm:flex-row items-center gap-4">
                    <h1 className="font-bold w-32">{field.label}:</h1>
                    <Input type="text" name={field.name} value={(values as any)[field.name]} onChange={handleChange} className="flex-1" />
                    {touched[field.name as keyof typeof touched] && errors[field.name as keyof typeof errors] && (
                      <p className="text-red-500 text-sm"><ErrorMessage name={field.name} /></p>
                    )}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">Color:</h1>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map(c => (
                      <label key={c} className="flex items-center gap-1">
                        <input type="checkbox" name="color" value={c} checked={(values as any).color.includes(c)} onChange={handleChange} />
                        {c}
                      </label>
                    ))}
                  </div>
                  {touched.color && errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">Physical:</h1>
                  <div className="flex flex-wrap gap-2">
                    {PHYSICALS.map(p => (
                      <label key={p} className="flex items-center gap-1">
                        <input type="checkbox" name="physical" value={p} checked={(values as any).physical.includes(p)} onChange={handleChange} />
                        {p}
                      </label>
                    ))}
                  </div>
                  {touched.physical && errors.physical && <p className="text-red-500 text-sm">{errors.physical}</p>}
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">Main Image:</h1>
                  <input id="main-upload" type="file" accept="image/*" onChange={handleMainFileUpload} className="hidden" />
                  <label htmlFor="main-upload" className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer hover:border-black">
                    <Image src="/upload.svg" alt="Upload" width={30} height={30} />
                    <span>{mainImageFile ? mainImageFile.name : "Click or drag to upload main image"}</span>
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  <h1 className="font-bold">Additional Images:</h1>
                  <input id="multi-upload" type="file" accept="image/*" multiple onChange={handleMultipleFilesUpload} className="hidden" />
                  <label htmlFor="multi-upload" className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-md p-4 cursor-pointer hover:border-black">
                    <Image src="/upload.svg" alt="Upload" width={30} height={30} />
                    <span>{imageFiles.length > 0 ? `${imageFiles.length} image(s) selected` : "Click or drag to upload additional images"}</span>
                  </label>
                </div>

                <div className="flex gap-4 mt-4 justify-center">
                  <Button type="submit" className="bg-black text-white hover:bg-green-400 hover:text-black" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                  <Button type="button" onClick={handleClose} className="bg-white text-black hover:bg-red-400 hover:text-white">
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {showSuccessModal && uploadedImages.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn" onClick={() => setShowSuccessModal(false)}>
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 w-80 shadow-2xl relative animate-slideInUp" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 animate-textGlow">
              Updated Successfully!
            </h2>
            <p className="text-gray-700 text-center font-bold">
              Your item is now available to view.
            </p>

            <div className="relative w-60 h-60 flex items-center justify-center mt-2">
              {uploadedImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-0 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"><ArrowLeft /></button>
                  <button onClick={nextImage} className="absolute right-0 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"><ArrowRight /></button>
                </>
              )}
              <Image src={uploadedImages[carouselIndex]?.url || "/placeholder.png"} alt={`Uploaded Image ${carouselIndex + 1}`} fill className="object-cover rounded-lg" />
              {uploadedImages.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm font-bold px-2 py-1 rounded-full">
                  {carouselIndex + 1}/{uploadedImages.length}
                </div>
              )}
            </div>

            <Button className="mt-4 w-full bg-gradient-to-r from-blue-400 to-green-400 hover:scale-105 transition-transform duration-300" onClick={() => setShowSuccessModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
