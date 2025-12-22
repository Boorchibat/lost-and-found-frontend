import { postData } from "../getDataFromBackend";
export interface VerifyCodePayload {
  email: string;
  code: string;
}

export interface VerifyCodeResponse {
  token: string;
  user: {
    email: string;
    username: string;
    isVerified: boolean;
  };
}
export const verifyCode = (payload: VerifyCodePayload) =>
  postData<VerifyCodeResponse, VerifyCodePayload>("/auth/verify", payload);
