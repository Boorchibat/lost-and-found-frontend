import { postData } from "../getDataFromBackend";

export const signUp = (payload: SignupPayload) =>
  postData("/auth/signup", payload);
