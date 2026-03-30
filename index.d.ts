export type Image = {
  url: string;
  public_id: string;
};

export type ClaimType = {
  id: string;
  Name: string;
  Claim: string;
  Email: string;
  Number: string;
  User?: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  username: string;
  password: string;
  email: string;
  role: string;
  profileImage: Image;
  name: string;
  number: string;
  createdAt: string;
  _id: string;
  verificationCodeExpires: string;
  isVerified: boolean;
  verfiedAt: Date | null;
};

export type UserProp = {
  username: string;
  password?: string;
  role: string;
  profileImage: Image;
  name: string;
  number: string;
  email: string;
};

export type ItemProps = {
  _id: string;
  itemname: string;
  isFound: "Found" | "In progress";
  User: User;
  mainImage: Image;
  images: Image[];
  description: string;
  location: string;
  contactNumber: number;
  contactEmail: string;
  name: string;
  color: string[];
  physical: string[];
  claims: string[];
  status: string;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type ItemPropsSafe = {
  _id: string;
  itemname: string;
  isFound: string;
  User: string | User;
  mainImage: Image;
  images: Image[];
  description: string;
  location: string;
  contactNumber: number;
  contactEmail: string;
  name: string;
  claims: string[];
  status: string;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type SearchBarProps = {
  setQuery: (value: string) => void;
};

export type SignupPayload = {
  name: string;
  email: string;
  number: string;
  username: string;
  password: string;
  profileImage: string;
};

export type SignupResponse = {
  success: boolean;
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
  };
};

export type UpdateItemPayload = Partial<{
  itemname: string;
  location: string;
  description: string;
  contactNumber: number;
  contactEmail: string;
  mainImage: {
    url: string;
    public_id: string;
  };
  images: {
    url: string;
    public_id: string;
  }[];
  isFound: boolean;
}>;

export type GetClaimProp = {
  claimId: string;
  token: string;
  itemId: string;
};
