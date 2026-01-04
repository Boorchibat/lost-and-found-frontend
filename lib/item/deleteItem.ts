import { Delete } from "../getDataFromBackend";
import { SignInResponse } from "@/index";

export const DeleteItem = (
  itemid: string,
  token: string
): Promise<SignInResponse> => {
  return Delete<SignInResponse>(`/item/${itemid}`, token);
};
