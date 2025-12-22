import { postData } from "../getDataFromBackend";

export const signIn = (payload: {
  email: string;
  password: string;
}) => postData<SignInResponse, typeof payload>("/auth/signin", payload);
