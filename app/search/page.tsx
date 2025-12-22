"use client";
import { useState } from "react";
import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { Searchbar } from "../components/report-page/components/search/Searchbar";
import { Button } from "@/components/ui/button";
const Data = [
  {
    itemname: "Blue Adidas Shoes",
    isFound: "Found",
    User: {
      username: "anna",
      password: "hashed_password_here",
      email: "anna@example.com",
      verificationCode: "912384",
      verificationCodeExpires: new Date("2025-12-25T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile2.jpg",
        public_id: "profile_1700000001",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-main.jpg",
      public_id: "items/shoes-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-1.jpg",
        public_id: "items/shoes-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-2.jpg",
        public_id: "items/shoes-2",
      },
    ],
    description: "Blue Adidas running shoes, size 9.",
    location: "Downtown Park",
    contactNumber: 7035556789,
    contactEmail: "finder2@example.com",
    name: "Anna Smith",
    claims: [],
    status: "found",
    _id: "item_007",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
  {
    itemname: "Blue Adidas Shoes",
    isFound: "Found",
    User: {
      username: "anna",
      password: "hashed_password_here",
      email: "anna@example.com",
      verificationCode: "912384",
      verificationCodeExpires: new Date("2025-12-25T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile2.jpg",
        public_id: "profile_1700000001",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-main.jpg",
      public_id: "items/shoes-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-1.jpg",
        public_id: "items/shoes-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-2.jpg",
        public_id: "items/shoes-2",
      },
    ],
    description: "Blue Adidas running shoes, size 9.",
    location: "Downtown Park",
    contactNumber: 7035556789,
    contactEmail: "finder2@example.com",
    name: "Anna Smith",
    claims: [],
    status: "found",
    _id: "item_006",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
  {
    itemname: "Blue Adidas Shoes",
    isFound: "Found",
    User: {
      username: "anna",
      password: "hashed_password_here",
      email: "anna@example.com",
      verificationCode: "912384",
      verificationCodeExpires: new Date("2025-12-25T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile2.jpg",
        public_id: "profile_1700000001",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-main.jpg",
      public_id: "items/shoes-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-1.jpg",
        public_id: "items/shoes-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-2.jpg",
        public_id: "items/shoes-2",
      },
    ],
    description: "Blue Adidas running shoes, size 9.",
    location: "Downtown Park",
    contactNumber: 7035556789,
    contactEmail: "finder2@example.com",
    name: "Anna Smith",
    claims: [],
    status: "found",
    _id: "item_001",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
  {
    itemname: "Blue Adidas Shoes",
    isFound: "Found",
    User: {
      username: "anna",
      password: "hashed_password_here",
      email: "anna@example.com",
      verificationCode: "912384",
      verificationCodeExpires: new Date("2025-12-25T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile2.jpg",
        public_id: "profile_1700000001",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-main.jpg",
      public_id: "items/shoes-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-1.jpg",
        public_id: "items/shoes-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-2.jpg",
        public_id: "items/shoes-2",
      },
    ],
    description: "Blue Adidas running shoes, size 9.",
    location: "Downtown Park",
    contactNumber: 7035556789,
    contactEmail: "finder2@example.com",
    name: "Anna Smith",
    claims: [],
    status: "found",
    _id: "item_002",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
  {
    itemname: "Blue Adidas Shoes",
    isFound: "Found",
    User: {
      username: "anna",
      password: "hashed_password_here",
      email: "anna@example.com",
      verificationCode: "912384",
      verificationCodeExpires: new Date("2025-12-25T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile2.jpg",
        public_id: "profile_1700000001",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-main.jpg",
      public_id: "items/shoes-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-1.jpg",
        public_id: "items/shoes-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/shoes-2.jpg",
        public_id: "items/shoes-2",
      },
    ],
    description: "Blue Adidas running shoes, size 9.",
    location: "Downtown Park",
    contactNumber: 7035556789,
    contactEmail: "finder2@example.com",
    name: "Anna Smith",
    claims: [],
    status: "found",
    _id: "item_003",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
];

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filterData = Data.filter(
    (item) =>
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );
  return (
    <div className="w-full h-auto bg-gradient-to-r from-yellow-300 to-blue-200 flex flex-col justify-center items-center">
      <div className="mt-[40px] w-full flex flex-col items-center justify-center">
        <h1 className="mb-[20px] font-bold text-[40px]">Search for an Item</h1>
        <Searchbar setQuery={setSearchTerm} />
      </div>
      <div className="mt-[30px] gap-x-20 flex flex-wrap w-[70%] mb-[30px]">
        {filterData.length > 0 ? (
          filterData.map((item) => <ReportCard key={item._id} {...item} />)
        ) : (
          <div className="w-full flex justify-center items-center gap-x-5 mt-[15px]">
            <h1 className="font-bold text-[30px]">No items found...</h1>
            <a href="/">
              <Button className="bg-blue-700 hover:bg-green-500">Return to Home Page</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
export default Search;
