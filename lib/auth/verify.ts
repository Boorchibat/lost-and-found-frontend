import { User } from "@/index";
import { postData } from "../getDataFromBackend";

export interface VerifyPayload {
  email: string;
  code: string;
}

export interface VerifyResponse {
  message: string;
  token: string;
  user: User;
}

export const verifyCode = (
  payload: VerifyPayload
): Promise<VerifyResponse> => {
  return postData<VerifyResponse, VerifyPayload>(
    "/auth/verify-email",
    payload
  );
};