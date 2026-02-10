import Image from "next/image";

const page = () => {
  return (
    <main className="w-full min-h-screen bg-gradient-to-r from-yellow-500 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-20">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-white/70 rounded-2xl shadow-lg p-6 flex flex-col items-center text-black space-y-5">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <Image
              src="/me.webp"
              alt="Your Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">Boorchi Batzorigt</h2>
          <h2 className="text-lg font-bold">Full stack Developer</h2>
          <ul className="space-y-2 text-center">
            <li>
              📧{" "}
              <a
                href="mailto:boorchibat@gmail.com"
                className="underline hover:text-blue-600"
              >
                boorchibat@gmail.com
              </a>
            </li>
            <li>
              📞{" "}
              <a
                href="tel:7038327954"
                className="underline hover:text-blue-600"
              >
                703-832-7954
              </a>
            </li>

            <li>
              💻{" "}
              <a
                href="https://github.com/boorchibat"
                target="_blank"
                className="underline hover:text-blue-600"
              >
                GitHub: boorchibat
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white/70 rounded-2xl shadow-lg p-6 flex flex-col items-center text-black space-y-5">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            <Image
              src="/roboram.png"
              alt="School Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">Robinson Secondary School</h2>
          <ul className="space-y-2 text-center">
            <li>
              📧{" "}
              <a
                href="mailto:kma@fcps.edu "
                className="underline hover:text-blue-600"
              >
                kma@fcps.edu{" "}
              </a>
            </li>
            <li>
              📞{" "}
              <a
                href="tel:703-426-2100"
                className="underline hover:text-blue-600"
              >
                703-555-1234
              </a>
            </li>
            <li>
              🌐{" "}
              <a
                href="https://robinsonss.fcps.edu/"
                target="_blank"
                className="underline hover:text-blue-600"
              >
                Robinson Secondary website
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default page;
