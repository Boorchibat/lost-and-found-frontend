import React from "react";
import { ItemPanel } from "./ItemPanel";
import { ItemOrder } from "./ItemOrder";
const SampleData = [
  {
    itemname: "Black Nike Backpack",
    isFound: "In progress",
    User: {
      username: "borchi",
      password: "hashed_password_here",
      email: "borchi@example.com",
      verificationCode: "839201",
      verificationCodeExpires: new Date("2025-12-20T23:59:59Z"),
      isVerified: true,
      role: "user",
      profileImage: {
        url: "https://res.cloudinary.com/demo/image/upload/v1700000000/profile.jpg",
        public_id: "profile_1700000000",
      },
    },
    mainImage: {
      url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/backpack-main.jpg",
      public_id: "items/backpack-main",
    },
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/backpack-1.jpg",
        public_id: "items/backpack-1",
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/v1710000000/items/backpack-2.jpg",
        public_id: "items/backpack-2",
      },
    ],
    description:
      "Black Nike backpack with a laptop sleeve and water bottle pocket.",
    location: "Fairfax High School Gym",
    contactNumber: 7035551234,
    contactEmail: "finder@example.com",
    name: "John Doe",
    claims: [],
    status: "pending",
    _id: "item_002",
    createdAt: new Date("2025-12-01T10:30:00Z"),
    updatedAt: new Date("2025-12-05T14:45:00Z"),
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
];

export const AdminPanel = () => {
  return (
    <div className="w-[70%] h-auto bg-white rounded-md flex flex-col">
      <ItemOrder />

      {SampleData.map((item) => (
        <ItemPanel key={item._id} {...item}  />
      ))}
    </div>
  );
};
