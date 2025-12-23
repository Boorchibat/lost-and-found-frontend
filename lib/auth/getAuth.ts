import { getData } from "../getDataFromBackend";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  user: User;
}

export const getAuth = (payload: SignInPayload): Promise<SignInResponse> => {
  return getData<SignInResponse>("/auth/signin", payload);
};
