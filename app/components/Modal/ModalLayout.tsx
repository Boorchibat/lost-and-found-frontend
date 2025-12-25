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

export const ModalLayout = ({ open, handleClose, Data }: ModalProps) => {
  const [uploadMessage, setUploadMessage] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const { token } = useUser();

  if (!token)
    return (
      <div>
        User is not logged in. Return home here:{" "}
        <a className="underline" href="/">
          Home
        </a>
      </div>
    );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setUploadMessage("");
      setMainImage(null);
      return;
    }
    if (!file.type.startsWith("image/")) {
      setUploadMessage("❌ File must be an image.");
      return;
    }
    setUploadMessage("✅ Image selected!");
    setMainImage(file);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    role: Yup.string().required("Role is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    contact: Yup.string()
      .required("Contact is required")
      .length(10, "Contact must be exactly 10 characters"),
     password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <div className="flex flex-col w-full items-center p-2 sm:p-4">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-center">
            Update Profile
          </h1>

          <Formik
            initialValues={{
              name: Data?.name || "",
              username: Data?.username || "",
              email: Data?.email || "",
              password: Data?.password || "",
              contact: Data?.number || "",
              role: Data?.role || "",
              profileImage: Data?.profileImage || null,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setSubmitting(true);

                let uploadedImage = values.profileImage;

                if (mainImage) {
                  const cloudData = await uploadToCloudinary(mainImage);
                  uploadedImage = {
                    url: cloudData.secure_url,
                    public_id: cloudData.public_id,
                  };
                }

                const payload: UserProp = {
                  name: values.name,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  number: values.contact,
                  role: values.role,
                  profileImage: uploadedImage,
                };

                console.log("Payload:", payload);

                await UpdateUser(payload, Data._id, token);
                handleClose();
              } catch (error) {
                console.error(error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="w-full mt-4 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-4">
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
                      <Image
                        src="/upload.svg"
                        alt="upload"
                        width={30}
                        height={30}
                      />
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

                {[{ name: "name", label: "Name" },
                  { name: "username", label: "Username" },
                  { name: "email", label: "Email" }].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col sm:flex-row w-full sm:justify-between gap-4"
                  >
                    <h1 className="font-bold w-full sm:w-1/3 text-lg sm:text-xl">
                      {field.label}:
                    </h1>
                    <Field
                      name={field.name}
                      as={Input}
                      className="w-full sm:w-2/3"
                    />
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-4">
                  <h1 className="font-bold w-full sm:w-1/3 text-lg sm:text-xl">
                    Password:
                  </h1>
                  <Field
                    name="password"
                    type="password"
                    as={Input}
                    className="w-full sm:w-2/3"
                    placeholder="********"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-600 text-sm mt-1"
                  />
                </div>

                {[{ name: "contact", label: "Contact" },
                  { name: "role", label: "Role", isSelect: true, options: ["student", "faculty"] }].map((field) => (
                  <div
                    key={field.name}
                    className="flex flex-col sm:flex-row w-full sm:justify-between gap-4"
                  >
                    <h1 className="font-bold w-full sm:w-1/3 text-lg sm:text-xl">
                      {field.label}:
                    </h1>
                    {field.isSelect ? (
                      <Field
                        as="select"
                        name={field.name}
                        className="w-full sm:w-2/3 border border-gray-400 rounded-md p-2 outline-none"
                      >
                        <option value="">Select role</option>
                        {field.options!.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                          </option>
                        ))}
                      </Field>
                    ) : (
                      <Field
                        name={field.name}
                        as={Input}
                        className="w-full sm:w-2/3"
                      />
                    )}
                    <ErrorMessage
                      name={field.name}
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:justify-center">
                  <Button
                    type="submit"
                    className="w-full sm:w-44 h-12 bg-black text-white rounded-md hover:bg-green-400 hover:text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Submit"}
                  </Button>
                  <Button
                    onClick={handleClose}
                    className="w-full sm:w-44 h-12 border-1 border-black bg-white text-black rounded-md hover:bg-red-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};
