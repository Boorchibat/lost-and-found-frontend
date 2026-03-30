import { getData } from "./getDataFromBackend";


export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface SignUpPayload extends Record<string, unknown> {
  name: string;
  email: string;
  number: string;
  username: string;
  password: string;
  profileImage: string;
}

export interface SignUpResponse {
  token: string;
  user: User;
}


export const getSignUp = (payload: SignUpPayload): Promise<SignUpResponse> => {
  return getData<SignUpResponse>("/auth/signup", payload);
};
