import { postData } from "../getDataFromBackend";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface SignInPayload {
  email: string;
}

export interface Response {
message: string;
}

export const passwordless = (payload: SignInPayload): Promise<Response> => {
  return postData<Response, SignInPayload>("/auth/passwordless", payload);
};
