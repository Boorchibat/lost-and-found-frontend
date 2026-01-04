import { GetClaimProp } from "@/index";
import { Delete } from "../getDataFromBackend";

export const deleteClaim = async ({ itemId, claimId, token }: GetClaimProp) => {
  if (!claimId) throw new Error("claimId is required");
  if (!itemId) throw new Error("itemId is required");
  if (!token) throw new Error("No token or token is expired");
  return Delete(`/claim/${itemId}/${claimId}`, token);
};
