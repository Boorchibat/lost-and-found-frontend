"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuth, SignInPayload } from "@/lib/auth/getAuth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/UserContext";
import { signIn } from "@/lib/auth/sign-in";

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginCard = () => {
  const router = useRouter();
  const { setUser, setToken } = useUser();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={async (
        values: SignInPayload,
        { setSubmitting, setFieldError }
      ) => {
        try {
          const data = await signIn(values);

          if (!data.token || !data.user)
            throw new Error("Invalid login response");

          setUser(data.user);
          setToken(data.token);

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          router.push("/");
        } catch (error: any) {
          console.error("LOGIN ERROR:", error);

          const backendMessage =
            error?.response?.data?.message || error?.message || "Login failed";
          setFieldError("password", backendMessage);
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
            <Input name="email" value={values.email} onChange={handleChange} />
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
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          <a href="/signup">
            <h1 className="mt-[30px] underline">Dont have an account yet?</h1>
          </a>
        </Form>
      )}
    </Formik>
  );
};
