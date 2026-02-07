"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PostItem } from "@/lib/item/postItem";
import { uploadToCloudinary } from "@/lib/cloudinary/UploadToCloudinary";
import { useUser } from "@/app/context/UserContext";
import { ArrowLeft, ArrowRight, XCircle } from "lucide-react";
import { getItems } from "@/lib/getDataFromBackend";
import { ItemProps } from "@/index";
import { MatchModal } from "./components/MatchModal";

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Black",
  "White",
  "Purple",
  "Orange",
  "Brown",
  "Gray",
  "other",
];
const physicalTypes = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "Airpods",
  "Laptop Charger",
  "Notebook",
  "other",
];

const ReportSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  itemname: Yup.string().required("Item name is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Contact number is required"),
  contactEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

export const ReportCard = ({
  title,
  isFound,
}: {
  title: string;
  isFound: "Found" | "In progress";
}) => {
  const { user, token } = useUser();
  const [images, setImages] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [Data, setData] = useState<ItemProps[]>([]);
  const [matchedItems, setMatchedItems] = useState<ItemProps[]>([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [pendingSubmit, setPendingSubmit] = useState<
    null | (() => Promise<void>)
  >(null);

  useEffect(() => {
    getItems<ItemProps[]>("/item").then(setData).catch(console.error);
  }, []);

  const foundData = Data.filter((item) => item.isFound === "Found");

  if (!user || !token)
    return (
      <div className="h-screen flex items-center justify-center">
        No user found
      </div>
    );

  const findMatchingItems = (itemname: string) => {
    return foundData.filter(
      (item) =>
        item.itemname.trim().toLowerCase() === itemname.trim().toLowerCase(),
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const invalid = files.find((f) => !f.type.startsWith("image/"));
    if (invalid) {
      setUploadMessage("❌ All files must be images");
      return;
    }
    setImages((prev) => {
      const combined = [...prev, ...files];
      const unique = combined.filter(
        (file, index, self) =>
          index ===
          self.findIndex((f) => f.name === file.name && f.size === file.size),
      );
      return unique;
    });
    setUploadMessage("✅ Image(s) added");
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (images.length <= 1) setUploadMessage("");
  };
  const nextImage = () =>
    setCarouselIndex((prev) => (prev + 1) % uploadedImages.length);
  const prevImage = () =>
    setCarouselIndex(
      (prev) => (prev - 1 + uploadedImages.length) % uploadedImages.length,
    );

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          itemname: "",
          location: "",
          description: "",
          contactNumber: "",
          contactEmail: "",
          color: [] as string[],
          physical: [] as string[],
        }}
        validationSchema={ReportSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const shouldCheckMatches = title === "Report a lost Item";
          const matches = shouldCheckMatches
            ? findMatchingItems(values.itemname)
            : [];

          const submitLogic = async () => {
            if (!images.length) {
              alert("Please upload at least one image");
              return;
            }
            try {
              setUploading(true);
              const uploaded = await Promise.all(
                images.map((img) => uploadToCloudinary(img)),
              );
              setUploadedImages(uploaded);
              const payload = {
                name: values.name,
                itemname: values.itemname,
                location: values.location,
                description: values.description,
                contactNumber: Number(values.contactNumber),
                contactEmail: values.contactEmail,
                User: user._id,
                isFound,
                mainImage: {
                  url: uploaded[0].secure_url,
                  public_id: uploaded[0].public_id,
                },
                images: uploaded.map((img) => ({
                  url: img.secure_url,
                  public_id: img.public_id,
                })),
                color: values.color,
                physical: values.physical,
              };
              await PostItem(payload, token);
              setShowModal(true);
              resetForm();
              setImages([]);
              setUploadMessage("");
            } finally {
              setUploading(false);
              setSubmitting(false);
            }
          };

          if (matches.length > 0) {
            setMatchedItems(matches);
            setShowMatchModal(true);
            setPendingSubmit(() => submitLogic);
            setSubmitting(false);
            return;
          }

          await submitLogic();
        }}
      >
        {({
          isSubmitting,
          handleChange,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form className="w-[95%] lg:w-[60%] flex flex-col items-center gap-6 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 rounded-3xl p-8 mt-6 shadow-xl border border-yellow-300 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 mb-6 text-center">
              {title}
            </h1>

            {[
              { label: "Name", name: "name" },
              { label: "Item", name: "itemname" },
              { label: "Location", name: "location" },
              { label: "Description", name: "description" },
              { label: "Phone", name: "contactNumber" },
              { label: "Email", name: "contactEmail" },
            ].map((field) => (
              <div
                key={field.name}
                className="w-full flex flex-col sm:flex-row items-center gap-4"
              >
                <h1 className="font-semibold text-lg w-32">{field.label}:</h1>
                <Input
                  type="text"
                  name={field.name}
                  value={(values as any)[field.name]}
                  onChange={handleChange}
                  className="w-full sm:w-2/3 border-2 border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-200 rounded-md shadow-sm transition-all duration-300"
                />
                {touched[field.name as keyof typeof touched] &&
                  errors[field.name as keyof typeof errors] && (
                    <p className="text-red-600 text-sm ml-1 mt-1">
                      <ErrorMessage name={field.name} />
                    </p>
                  )}
              </div>
            ))}

            <div className="w-full flex flex-col sm:flex-row items-start gap-4">
              <h1 className="font-semibold text-lg w-32">Color:</h1>
              <div className="flex flex-wrap w-full sm:w-2/3 gap-2">
                {colors.map((color) => (
                  <Button
                    type="button"
                    key={color}
                    variant={
                      values.color.includes(color) ? "default" : "outline"
                    }
                    onClick={() => {
                      if (values.color.includes(color))
                        setFieldValue(
                          "color",
                          values.color.filter((c) => c !== color),
                        );
                      else setFieldValue("color", [...values.color, color]);
                    }}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row items-start gap-4">
              <h1 className="font-semibold text-lg w-32">Physical Type:</h1>
              <div className="flex flex-wrap w-full sm:w-2/3 gap-2">
                {physicalTypes.map((type) => (
                  <Button
                    type="button"
                    key={type}
                    variant={
                      values.physical.includes(type) ? "default" : "outline"
                    }
                    onClick={() => {
                      if (values.physical.includes(type))
                        setFieldValue(
                          "physical",
                          values.physical.filter((p) => p !== type),
                        );
                      else
                        setFieldValue("physical", [...values.physical, type]);
                    }}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row items-start gap-4">
              <h1 className="font-semibold text-lg w-32">Upload Photos:</h1>
              <div className="flex flex-col w-full sm:w-2/3">
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="upload"
                  className="flex items-center justify-center gap-2 border border-gray-400 rounded-lg p-2 cursor-pointer bg-white hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-400 transition-all duration-300 shadow-md"
                >
                  <Image
                    src="/upload.svg"
                    alt="Upload"
                    width={30}
                    height={30}
                  />{" "}
                  Upload Images
                </label>

                {uploadMessage && (
                  <p
                    className={`mt-2 font-semibold ${uploadMessage.includes("❌") ? "text-red-600" : "text-green-600"}`}
                  >
                    {uploadMessage}
                  </p>
                )}

                {uploading && (
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div className="bg-blue-500 h-full animate-progress-loading w-full origin-left"></div>
                  </div>
                )}

                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {images.map((file, index) => (
                      <div
                        key={index}
                        className="w-24 h-24 relative rounded-lg overflow-hidden shadow-md border group"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-full text-red-600 hover:text-red-800 transition z-10"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mt-4">
              <Button
                type="submit"
                className="w-44 h-12 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold hover:scale-105 transition-transform duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Reporting..." : "Submit"}
              </Button>
              <Button
                type="button"
                className="w-44 h-12 bg-white text-black border border-gray-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <style jsx global>{`
        @keyframes progress-loading {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.7);
          }
          100% {
            transform: scaleX(1);
          }
        }
        .animate-progress-loading {
          animation: progress-loading 2s ease-in-out infinite;
        }
      `}</style>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XCircle size={28} />
            </button>
            <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
              Submitted!
            </h2>
            <p className="font-bold mb-[20px] flex justify-center items-center">
              Thank you for helping out our community!
            </p>
            {uploadedImages.length > 0 && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-inner">
                <Image
                  src={uploadedImages[carouselIndex].secure_url}
                  alt="Item"
                  fill
                  className="object-cover"
                />
                {uploadedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </>
                )}
              </div>
            )}
            <Button
              onClick={() => setShowModal(false)}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold"
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {showMatchModal && matchedItems.length > 0 && (
        <MatchModal
          open={showMatchModal}
          items={matchedItems}
          onClose={() => setShowMatchModal(false)}
          onContinue={async () => {
            setShowMatchModal(false);
            if (pendingSubmit) await pendingSubmit();
          }}
        />
      )}
    </>
  );
};
