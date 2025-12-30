import { getItems} from "../getDataFromBackend";


export const PostItem = () => {
  return getItems("/item");
};

