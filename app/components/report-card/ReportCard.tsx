"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PostItem } from "@/lib/item/postItem";
import { uploadToCloudinary } from "@/lib/cloudinary/UploadToCloudinary";
import { useUser } from "@/app/context/UserContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  "other"
];
const physicalTypes = [
  "Backpack",
  "Clothes",
  "Shoes",
  "Hat",
  "Airpods",
  "Laptop Charger",
  "Notebook",
  "other"
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

  if (!user || !token)
    return (
      <div className="h-screen flex items-center justify-center">
        No user found
      </div>
    );

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
          self.findIndex((f) => f.name === file.name && f.size === file.size)
      );
      return unique;
    });

    setUploadMessage("✅ Image(s) added");
    e.target.value = "";
  };

  const nextImage = () =>
    setCarouselIndex((prev) => (prev + 1) % uploadedImages.length);
  const prevImage = () =>
    setCarouselIndex(
      (prev) => (prev - 1 + uploadedImages.length) % uploadedImages.length
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
          if (!images.length) {
            alert("Please upload at least one image");
            return;
          }

          try {
            setSubmitting(true);
            const uploaded = await Promise.all(
              images.map((img) => uploadToCloudinary(img))
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
            setCarouselIndex(0);
            resetForm();
            setImages([]);
            setUploadMessage("");
          } catch (error: any) {
            console.error(error);
            alert(
              error?.response?.data?.error ||
                error?.message ||
                "Failed to report item"
            );
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
          setFieldValue,
        }) => (
          <Form className="w-[95%] lg:w-[60%] flex flex-col items-center gap-6 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 rounded-3xl p-8 mt-6 shadow-xl border border-yellow-300 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 animate-textGlow mb-6 text-center">
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
                          values.color.filter((c) => c !== color)
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
                          values.physical.filter((p) => p !== type)
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
                  />
                  Upload Images
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
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {images.map((file, index) => (
                      <div
                        key={file.name + index}
                        className="w-24 h-24 relative rounded-lg overflow-hidden shadow-md border"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Selected Image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
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
                type="reset"
                className="w-44 h-12 bg-white text-black border border-gray-400 hover:bg-red-400 hover:text-white transition-all duration-300"
                onClick={() => window.location.reload()}
              >
                Reset
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      {showModal && uploadedImages.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 w-80 shadow-2xl relative animate-slideInUp">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500 animate-textGlow">
              Submitted Successfully!
            </h2>
            <p className="text-gray-700 text-center font-bold">
              Your item has been reported. It is under admin review, when it is
              approved it will be available.
            </p>

            <div className="relative w-60 h-60 flex items-center justify-center mt-2">
              {uploadedImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70 transition"
                  >
                    <ArrowRight />
                  </button>
                </>
              )}
              <Image
                src={uploadedImages[carouselIndex]?.url || "/placeholder.png"}
                alt={`Uploaded Image ${carouselIndex + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              {uploadedImages.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-sm font-bold px-2 py-1 rounded-full">
                  {carouselIndex + 1}/{uploadedImages.length}
                </div>
              )}
            </div>

            <Button
              className="mt-4 w-full bg-gradient-to-r from-blue-400 to-green-400 hover:scale-105 transition-transform duration-300"
              onClick={() => setShowModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
