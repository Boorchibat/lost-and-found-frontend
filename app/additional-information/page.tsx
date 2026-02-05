import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-yellow-500 to-blue-500">
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Robinson Secondary School
              <span className="block text-gray-100 mt-2 text-2xl sm:text-3xl md:text-4xl">
                Digital Lost & Found System
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              This platform helps students and staff report lost items, browse
              found belongings, and claim items safely. We are here to help you,
              the client, find your item as fast as possible. Thank you for
              using this service and contact us anytime here.
            </p>
            <Link href="/contact">
              <Button className="p-3 bg-green-400 text-white w-[150px] h-[50px] text-[20px] rounded-2xl hover:bg-green-600">Contact</Button>
            </Link>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/robo.jpg"
                alt="Robinson Secondary School"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white">
            How the System Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center text-white space-y-4">
              <span className="text-4xl">📦</span>
              <h3 className="text-xl font-semibold">Report an Item</h3>
              <p className="text-sm">
                Submit reports for lost or found items with details and optional
                images.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center text-white space-y-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-xl font-semibold">Search & Match</h3>
              <p className="text-sm">
                Browse found items or search by category, location, or date to
                find matches.
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center text-white space-y-4">
              <span className="text-4xl">✅</span>
              <h3 className="text-xl font-semibold">Claim Securely</h3>
              <p className="text-sm">
                Verified claims can be picked up safely at the Main Office.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Report Lost or Found Items
            </h2>
            <p>
              Submit detailed reports for lost items or upload found items to
              help reunite them with their owners faster.
            </p>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>• Item type and color</li>
              <li>• Approximate location and date</li>
              <li>• Optional photo upload</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/report.png"
                alt="Report lost items"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-1 lg:order-none">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/claim.png"
                alt="Claiming items"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="space-y-5 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Claiming Your Item
            </h2>
            <p>
              Once a match is found, users submit a claim request. Verified
              claims can be picked up at the Main Office.
            </p>

            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex gap-2">
                <span className="font-semibold">📍 Pickup:</span>
                Main Office / Student Services
              </li>
              <li className="flex gap-2">
                <span className="font-semibold">🕒 Hours:</span>
                During school hours
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
