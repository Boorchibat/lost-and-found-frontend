import { Delete } from "../getDataFromBackend";
import { SignInResponse } from "@/index";

export const DeleteUser = (
  userid: string,
  token: string
): Promise<SignInResponse> => {
  return Delete<SignInResponse>(`/auth/${userid}`, token);
};
