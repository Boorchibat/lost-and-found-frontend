import { ReportCard } from "../components/report-page/components/card/ReportCard";
import { EditProfile } from "../components/profile/EditProfile";
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
    _id: "item_003",
    createdAt: new Date("2025-11-25T08:15:00Z"),
    updatedAt: new Date("2025-12-02T16:20:00Z"),
  },
];

const page = () => {
  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 flex flex-col h-auto justify-center items-center">
      <h1 className="font-bold text-[40px] mt-[30px]">Profile</h1>
      <EditProfile />
      <div className="mt-10 w-[70%]">
        <h1 className="font-bold text-[30px]">User's listed items:</h1>
      </div>
      <div className="w-[70%] flex rounded-md  h-auto mt-[50px] mb-[50px] justify-between flex-wrap">
        {Data.map((item) => (
          <ReportCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};
export default page;
