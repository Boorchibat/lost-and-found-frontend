import { getUser } from "../getDataFromBackend";

export const getSingleUser = <T>(userId: string, token: string) => {
  return getUser<T>(`/auth/${userId}`, token);
};
