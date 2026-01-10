import { getUser } from "../getDataFromBackend";

export const getSingleUser = <T>(userId: string) => {
  return getUser<T>(`/auth/${userId}`);
};
