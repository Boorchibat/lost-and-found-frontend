import { GetClaimProp } from "@/index";
import { getClaim} from "../getDataFromBackend";

export const getClaimz = async ({ itemId, claimId, token }: GetClaimProp) => {
  if (!claimId) throw new Error("claimId is required");
    if (!itemId) throw new Error("itemId is required");
      if (!token) throw new Error("No token or token is expired");
  return getClaim( `/claim/${itemId}/${claimId}`, token); 
};
