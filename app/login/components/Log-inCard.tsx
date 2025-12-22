"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth/sign-in";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { VerificationModal } from "./verifyModal";
import ClipLoader from "react-spinners/ClipLoader";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginCard = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const data = await signIn(values);

            if (data.requiresVerification) {
              setVerificationEmail(data.email || values.email);
              setModalOpen(true);
              return;
            }

            if (!data.token || !data.user)
              throw new Error("Invalid login response");

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.dispatchEvent(new Event("storage"));

            router.push("/");
          } catch (error: any) {
            console.error("LOGIN ERROR:", error);
            alert(error?.response?.data?.message || "Login failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="w-[50%] h-[90%] flex flex-col p-5 items-center bg-yellow-100 rounded-md">
            <h1 className="font-bold text-[30px]">Log In</h1>

            <div className="w-full mt-5 p-5">
              <h1 className="text-[20px]">Email:</h1>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="w-full mt-5 p-5">
              <h1 className="text-[20px]">Password:</h1>
              <Input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-10">
              {isSubmitting ? (
                <ClipLoader color="#36D7B7" size={50} />
              ) : (
                <Button type="submit" className=" w-full">
                  Sign in
                </Button>
              )}

              <a href="/sign">
                <h1 className="text-[15px] font-bold underline mt-[20px]">
                  Sign up
                </h1>
              </a>
            </div>
          </Form>
        )}
      </Formik>
      <VerificationModal
        email={verificationEmail}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};
