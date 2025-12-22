type Image = {
  url: string;
  public_id: string;
};

type User = {
  username: string;
  password: string;
  email: string;
  verificationCode: string;
  verificationCodeExpires: Date;
  isVerified: boolean;
  role: string;
  profileImage: Image;
};

type ItemProps = {
  itemname: string;
  isFound: string;
  User: User;
  mainImage: Image;
  images: Image[];
  description: string;
  location: string;
  contactNumber: number;
  contactEmail: string;
  name: string;
  claims: string[];
  status: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
type SearchBar = {
  setQuery: string;
};
type SignupPayload = {
  name: string;
  email: string;
  number: string;
  username: string;
  password: string;
  profileImage: string;
};
type SignInPayload = {
  email: string;
  password: string;
};
type SignInResponse = {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
  requiresVerification?: boolean;
  message?: string;
  email?: string;
};
type verfiyProps = {
  token: string;
  user: {
    email: string;
    username: string;
    isVerified: boolean;
  };
};
