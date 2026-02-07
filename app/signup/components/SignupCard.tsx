"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";

interface SignUpPayload {
  name: string;
  email: string;
  number: string;
  username: string;
  password: string;
  profileImage: string;
}

const SignupSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
});

export const SignupCard = () => {
  const router = useRouter();
  const { setUser, setToken } = useUser();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        number: "",
        username: "",
        password: "",
        profileImage: "/user.svg",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values: SignUpPayload, { setSubmitting, setFieldError }) => {
        try {
          const data = await signUp(values);
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          router.push("/");
        } catch (error: any) {
          const backendMessage =
            error?.response?.data?.message || error?.message || "Signup failed";
          setFieldError("password", backendMessage);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, isSubmitting }) => (
        <Form className="w-full max-w-md sm:max-w-sm bg-yellow-100 rounded-xl p-6 sm:p-4 shadow-md mx-2">
          <h1 className="text-2xl sm:text-xl font-bold text-center mb-5">Create Account</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input name="name" value={values.name} onChange={handleChange} placeholder="Name" />
            {touched.name && errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input
              name="number"
              value={values.number}
              onChange={handleChange}
              placeholder="111-111-1111"
            />
            {touched.number && errors.number && (
              <p className="text-red-500 text-xs mt-1">{errors.number}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <Input
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder="Username"
            />
            {touched.username && errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="w-full py-2 sm:py-1" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>

          <p className="text-center mt-4 text-sm sm:text-xs">
            Already have an account?{" "}
            <a href="/login" className="underline font-medium">
              Sign in
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
};
