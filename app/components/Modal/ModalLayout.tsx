"use client";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, UserProp } from "@/index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "@/app/context/UserContext";
import { UpdateUser } from "@/lib/auth/updateUser";
import { uploadToCloudinary } from "@/lib/cloudinary/UploadToCloudinary";

type ModalProps = {
  open: boolean;
  handleClose: () => void;
  Data: User;
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
};

export const ModalLayout = ({ open, handleClose, Data }: ModalProps) => {
  const [uploadMessage, setUploadMessage] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const { token } = useUser();

  if (!token) {
    return (
      <div className="p-4">
        User not logged in. Go back{" "}
        <a className="underline" href="/">
          Home
        </a>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadMessage("File must be an image");
      return;
    }

    setUploadMessage("Image selected");
    setMainImage(file);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .length(10, "Contact must be 10 digits")
      .required("Contact is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .notRequired()
      .test("password-rules", function (value) {
        if (!value) return true;
        return Yup.string()
          .min(8, "At least 8 characters")
          .matches(/[A-Z]/, "One uppercase letter")
          .matches(/[a-z]/, "One lowercase letter")
          .matches(/[0-9]/, "One number")
          .matches(/[!@#$%^&*(),.?":{}|<>]/, "One special character")
          .isValidSync(value);
      }),
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>

        <Formik
          initialValues={{
            name: Data?.name ?? "",
            username: Data?.username ?? "",
            email: Data?.email ?? "",
            contact: Data?.number ?? "",
            role: Data?.role ?? "",
            password: "",
            profileImage: Data?.profileImage ?? null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setStatus }) => {
            try {
              let uploadedImage = values.profileImage;

              if (mainImage) {
                const cloud = await uploadToCloudinary(mainImage);
                uploadedImage = {
                  url: cloud.secure_url,
                  public_id: cloud.public_id,
                };
              }

              const payload: UserProp = {
                name: values.name,
                username: values.username,
                email: values.email,
                number: values.contact,
                role: values.role,
                profileImage: uploadedImage,
              };

              if (values.password) {
                payload.password = values.password;
              }

              await UpdateUser(payload, Data._id, token);
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
          {({ isSubmitting, status }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="font-semibold">Profile Image</label>
                <input
                  id="upload"
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="upload"
                  className="flex items-center gap-2 border p-2 rounded-md cursor-pointer mt-2"
                >
                  <Image
                    src="/upload.svg"
                    alt="upload"
                    width={24}
                    height={24}
                  />
                  Upload Image
                </label>
                {uploadMessage && (
                  <p className="mt-1 text-sm">{uploadMessage}</p>
                )}
              </div>

              {[
                { name: "name", label: "Name" },
                { name: "username", label: "Username" },
                { name: "email", label: "Email" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="font-semibold">{f.label}</label>
                  <Field as={Input} name={f.name} />
                  <ErrorMessage
                    name={f.name}
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>
              ))}

              <div>
                <label className="font-semibold">New Password</label>
                <Field
                  as={Input}
                  name="password"
                  type="password"
                  placeholder="Leave blank to keep current password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Contact</label>
                <Field as={Input} name="contact" />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label className="font-semibold">Role</label>
                <Field
                  as="select"
                  name="role"
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Select role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {status && (
                <div className="text-red-600 text-sm text-center mt-2">
                  {status}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Save"}
                </Button>
                <Button type="button" variant="outline" onClick={handleClose}>
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
