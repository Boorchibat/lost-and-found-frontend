"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClaim } from "@/lib/claim/createClaim";
import { useUser } from "@/app/context/UserContext";
import { useState } from "react";

type ModalClaimProps = {
  open: boolean;
  handleClose: () => void;
  itemId: string;
  userId: string;
  onSuccess?: () => void;
};

const ClaimSchema = Yup.object({
  Name: Yup.string().min(2, "Name is too short").required("Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Number: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  claimText: Yup.string()
    .min(10, "Claim must be at least 10 characters")
    .required("Claim text is required"),
});

export const ModalClaim = ({
  open,
  handleClose,
  itemId,
  userId,
  onSuccess,
}: ModalClaimProps) => {
  const { token } = useUser();
  const [submitted, setSubmitted] = useState(false); // new state

  return (
    <Modal
      open={open}
      onClose={() => {
        setSubmitted(false); // reset when closing
        handleClose();
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="flex items-center justify-center p-4"
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          width: { xs: "100%", sm: 500, md: 700 },
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="flex flex-col w-full items-center gap-6">
          <h1 className="font-bold text-2xl sm:text-3xl">Make a Claim</h1>

          {submitted ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-green-600 text-lg font-bold">
                Claim submitted successfully ✅
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  handleClose();
                }}
                className="border border-black bg-black text-white rounded-md px-4 py-2 hover:bg-green-400 hover:text-black"
              >
                Close
              </Button>
            </div>
          ) : (
            <Formik
              initialValues={{
                Name: "",
                Email: "",
                Number: "",
                claimText: "",
              }}
              validationSchema={ClaimSchema}
              onSubmit={async (
                values,
                { setSubmitting, resetForm, setStatus }
              ) => {
                if (!token) {
                  setStatus("You must be logged in to submit a claim.");
                  setSubmitting(false);
                  return;
                }

                try {
                  const payload = {
                    itemId,
                    userId,
                    Name: values.Name,
                    Email: values.Email,
                    Number: values.Number,
                    claimText: values.claimText,
                  };
                  await createClaim(payload, itemId, token);

                  resetForm();
                  onSuccess?.();
                  setSubmitted(true); // show submitted state
                } catch (error: any) {
                  const backendMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to submit claim";
                  setStatus(backendMessage);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, status }) => (
                <Form className="flex flex-col w-full gap-4">
                  <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
                    <h1 className="font-bold text-lg sm:w-[150px]">Name:</h1>
                    <Field
                      as={Input}
                      name="Name"
                      placeholder="Name..."
                      className="flex-1"
                    />
                  </div>
                  <ErrorMessage
                    name="Name"
                    component="p"
                    className="text-red-500 text-sm"
                  />

                  <div className="flex flex-col w-full gap-2">
                    <h1 className="font-bold text-lg">Claim:</h1>
                    <Field
                      as="textarea"
                      name="claimText"
                      placeholder="Type your claim here..."
                      className="w-full h-36 border rounded-md p-3 resize-none focus:outline-none focus:ring-2"
                    />
                    <ErrorMessage
                      name="claimText"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
                    <h1 className="font-bold text-lg sm:w-[150px]">Email:</h1>
                    <Field
                      as={Input}
                      name="Email"
                      type="email"
                      placeholder="Email..."
                      className="flex-1"
                    />
                    <ErrorMessage
                      name="Email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row w-full gap-4 items-start">
                    <h1 className="font-bold text-lg sm:w-[150px]">
                      Phone Number:
                    </h1>
                    <Field
                      as={Input}
                      name="Number"
                      type="tel"
                      placeholder="Number..."
                      className="flex-1"
                    />
                    <ErrorMessage
                      name="Number"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {status && (
                    <p className="text-red-500 text-center mt-2">{status}</p>
                  )}

                  <div className="flex flex-col sm:flex-row w-full gap-4 justify-center mt-4">
                    <Button
                      type="submit"
                      className="flex-1 w-full sm:w-auto border border-black bg-black text-white rounded-md hover:bg-green-400 hover:text-black"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                    <Button
                      onClick={handleClose}
                      className="flex-1 w-full sm:w-auto border border-black bg-white text-black rounded-md hover:bg-red-400 hover:text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </Box>
    </Modal>
  );
};
