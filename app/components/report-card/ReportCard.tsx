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

const ReportSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  itemname: Yup.string().required("Item name is required"),
  location: Yup.string().required("Location is required"),
  date: Yup.string().required("Date is required"),
  description: Yup.string().required("Description is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Contact number is required"),
  contactEmail: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

export const ReportCard = ({
  isFound,
}: {
  isFound: "Found" | "In progress";
}) => {
  const { user, token } = useUser();
  console.log(token)
  const [mainImage, setMainImage] = useState<File | null>(null);
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
    setMainImage(file);
    setUploadMessage("✅ Image selected!");
  };

  if (!user || !token) return <p>Loading...</p>;

  return (
    <Formik
      initialValues={{
        name: "",
        itemname: "",
        location: "",
        date: "",
        description: "",
        contactNumber: "",
        contactEmail: "",
      }}
      validationSchema={ReportSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        if (!mainImage) {
          alert("Please upload an image");
          return;
        }

        try {
          setSubmitting(true);
          const cloudData = await uploadToCloudinary(mainImage);

          const payload = {
            name: values.name,
            itemname: values.itemname,
            location: values.location,
            date: values.date,
            description: values.description,
            contactNumber: Number(values.contactNumber),
            contactEmail: values.contactEmail,
            User: user._id,
            isFound,
            mainImage: {
              url: cloudData.secure_url,
              public_id: cloudData.public_id,
            },
            images: [
              { url: cloudData.secure_url, public_id: cloudData.public_id },
            ],
          };

          await PostItem(payload, token);

          alert("Item reported successfully!");
          resetForm();
          setMainImage(null);
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
      {({ isSubmitting, handleChange, values, errors, touched }) => (
        <Form className="w-[70%] lg:w-[60%] flex flex-col items-center justify-center gap-6 bg-yellow-100 rounded-2xl p-6 mt-6">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Item", name: "itemname", type: "text" },
            { label: "Location", name: "location", type: "text" },
            { label: "Date", name: "date", type: "date" },
            { label: "Description", name: "description", type: "text" },
            { label: "Phone", name: "contactNumber", type: "text" },
            { label: "Email", name: "contactEmail", type: "text" },
          ].map((field) => (
            <div
              key={field.name}
              className="w-full flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <h1 className="font-bold text-lg sm:text-xl md:text-2xl w-32">
                {field.label}:
              </h1>
              <Input
                type={field.type}
                name={field.name}
                value={(values as any)[field.name]}
                onChange={handleChange}
                className="w-full sm:w-3/5 md:w-2/3"
              />
              {touched[field.name as keyof typeof touched] &&
                errors[field.name as keyof typeof errors] && (
                  <p className="text-red-500 text-sm">
                    <ErrorMessage name={field.name} />
                  </p>
                )}
            </div>
          ))}

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl w-32">
              Upload Photo:
            </h1>
            <div className="flex flex-col w-full sm:w-3/5 md:w-2/3">
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="upload"
                className="flex items-center justify-center gap-2 border border-gray-500 rounded-md p-2 cursor-pointer"
              >
                <Image src="/upload.svg" alt="Upload" width={30} height={30} />
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

          <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full justify-center items-center">
            <Button
              type="submit"
              className="w-full sm:w-44 h-12 hover:bg-green-400 hover:text-black"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Reporting..." : "Submit"}
            </Button>
            <Button
              type="reset"
              className="w-full sm:w-44 h-12 bg-white text-black hover:bg-red-400 hover:text-white"
              onClick={() => window.location.reload()}
            >
              Reset
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
