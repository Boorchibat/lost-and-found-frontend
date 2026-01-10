import { UserProp } from "@/index";
import { update } from "../getDataFromBackend";

export const UpdateUser = (
  payload: UserProp,
  userId: string,
  token: string
): Promise<UserProp> => {
  return update<UserProp, UserProp>(`/auth/${userId}`, payload, token);
};
