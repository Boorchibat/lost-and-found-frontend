import { postItems } from "../getDataFromBackend";

export interface ClaimPayload {
itemId: string,
userId: String,
claimText: string,
Name: string,
Email: string,
Number: string
}

export const createClaim = (payload: ClaimPayload, itemId: string, token: string) => {
  return postItems(`/claim/${itemId}`, payload, token);
};

