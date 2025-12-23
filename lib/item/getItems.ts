import { getItems} from "../getDataFromBackend";


export const PostItem = ( token: string) => {
  return getItems("/item", token);
};

