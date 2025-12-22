"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/auth";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as Yup from "yup";

const SignupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


export const SignupCard = () => {
    const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        number: "",
        username: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await signUp({
            name: values.name,
            email: values.email,
            number: values.number,
            username: values.username,
            password: values.password,
            profileImage: "./user.svg",
          });
          alert("Signup successful!");
        } catch (error: any) {
          console.error("FULL SIGNUP ERROR:", error);

          if (error?.response?.data?.message) {
            alert("Backend error " + error.response.data.message);
          } else if (error?.message) {
            alert("Network/axios error: " + error.message);
          } else {
            alert("Signup failed");
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, isSubmitting }) => (
        <Form className="w-[50%] h-auto flex flex-col p-5 items-center bg-yellow-100 rounded-md">
          <h1 className="font-bold text-[30px]">Sign Up</h1>

          <div className="w-full p-5">
            <h1 className="text-[20px]">Name:</h1>
            <Input name="name" value={values.name} onChange={handleChange} />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="w-full p-5">
            <h1 className="text-[20px]">Personal Email:</h1>
            <Input name="email" value={values.email} onChange={handleChange} />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="w-full p-5">
            <h1 className="text-[20px]">Phone Number:</h1>
            <Input
              type="tel"
              name="number"
              value={values.number}
              onChange={handleChange}
            />
            {touched.number && errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>

          <div className="w-full p-5">
            <h1 className="text-[20px]">Username:</h1>
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="w-full p-5">
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
          <div className="w-full flex justify-around mt-5">
            <Button type="submit" className="w-[40%]" disabled={isSubmitting}>
              {isSubmitting ? "Signing up..." : "Sign up"}
            </Button>
          </div>

          <a href="/signin" className="underline mt-6 cursor-pointer">
            Already have an account?
          </a>
        </Form>
      )}
    </Formik>
  );
};
