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
  name: Yup.string().required(),
  itemname: Yup.string().required(),
  location: Yup.string().required(),
  date: Yup.string().required(),
  description: Yup.string().required(),
  contactNumber: Yup.string().required(),
  contactEmail: Yup.string().required(),
});

export const ReportCard = ({
  isFound,
}: {
  isFound: "Found" | "In progress";
}) => {
  const { user } = useUser();
  const [mainImage, setMainImage] = useState<File | null>(null);

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
        try {
          if (!user?._id) throw new Error("User not authenticated");
          if (!mainImage) throw new Error("Image required");

          const cloud = await uploadToCloudinary(mainImage);

          const payload = {
            name: values.name,
            itemname: values.itemname,
            location: values.location,
            date: values.date,
            description: values.description,
            contactNumber: Number(values.contactNumber),
            contactEmail: values.contactEmail,
            User: user._id,
            isFound: isFound === "Found",
            mainImage: {
              url: cloud.secure_url,
              public_id: cloud.public_id,
            },
            images: [
              { url: cloud.secure_url, public_id: cloud.public_id },
            ],
          };

          await PostItem(payload);

          resetForm();
          setMainImage(null);
          alert("Item reported successfully");
        } catch (error: any) {
          alert(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form className="w-[70%] lg:w-[60%] flex flex-col gap-6 bg-yellow-100 p-6">
          <Input name="name" value={values.name} onChange={handleChange} />
          <Input name="itemname" value={values.itemname} onChange={handleChange} />
          <Input name="location" value={values.location} onChange={handleChange} />
          <Input name="date" type="date" value={values.date} onChange={handleChange} />
          <Input name="description" value={values.description} onChange={handleChange} />
          <Input name="contactNumber" value={values.contactNumber} onChange={handleChange} />
          <Input name="contactEmail" value={values.contactEmail} onChange={handleChange} />

          <input type="file" onChange={(e) => setMainImage(e.target.files?.[0] || null)} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Reporting..." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
