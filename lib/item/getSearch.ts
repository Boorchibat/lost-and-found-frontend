import { postSearch } from "../getDataFromBackend";
import { ItemProps } from "@/index";

export interface SearchQueryPayload {
  query: string;
}
export const PostSearch = (payload: SearchQueryPayload) => {
  return postSearch<ItemProps[], SearchQueryPayload>("/item/search", payload);
};