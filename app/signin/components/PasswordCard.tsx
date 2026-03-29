"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordless } from "@/lib/auth/passwordless";
import { verifyCode } from "@/lib/auth/verify";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const PasswordCard = () => {
  const router = useRouter();
  const { setUser, setToken } = useUser();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [openClaim, setOpenClaim] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const res = await verifyCode({ email, code });

      setUser(res.user);
      setToken(res.token);

      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token);

      setOpenClaim(false);
      router.push("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid or expired code");
    }
  };

  return (
    <div className="lg:w-[60%] w-[95%] h-[70%] flex flex-col p-5 items-center bg-yellow-100 rounded-md">
      <h1 className="font-bold text-[30px] mt-[40px]">Log In</h1>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await passwordless({ email: values.email });
            setEmail(values.email);
            setOpenClaim(true);
          } catch (err: any) {
            setFieldError(
              "email",
              err?.response?.data?.message || "Failed to send code",
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form className="w-full mt-5 flex flex-col items-center">
            <div className="w-full">
              <h2>Email:</h2>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending code..." : "Send Code"}
            </Button>
          </Form>
        )}
      </Formik>

      {openClaim && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md flex flex-col items-center">
            <h2 className="text-xl font-bold mb-3">
              Enter the 6-digit code sent to {email}
            </h2>
            <Input
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Button className="w-full mt-5" onClick={handleVerify}>
              Verify & Login
            </Button>
            <Button
              variant="ghost"
              className="mt-3"
              onClick={() => setOpenClaim(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
      <div className="w-full flex items-center justify-center mt-[30px] gap-x-5">
        <a href="/login">
          <h1 className="font-bold underline">Log in through password</h1>
        </a>
        <a href="/signup">
          <h1 className="font-bold underline">Create Account</h1>
        </a>
      </div>
    </div>
  );
};
