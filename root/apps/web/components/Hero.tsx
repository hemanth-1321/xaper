import Link from "next/link";
import Mobile from "./mobile";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">

      <div className="w-full sm:w-[90%] lg:w-[70%] min-h-screen bg-gradient-to-b from-white to-[#fa9b66] flex justify-center px-4 sm:px-8 rounded-xl pb-10">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 mt-10 sm:mt-16 lg:mt-20">
            Effortless Workflow <span className="text-[#fa9048]">Automation</span> That Works for You
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-700 px-8 sm:px-8 max-w-xl">
            Connect your favorite apps and let Shape AI handle the busywork—so you can focus on what matters most.
          </p>

          <Link href={"/dashboard"}>
          <Button className="mt-20 bg-gradient-to-b from-[#4a4a4a] to-black text-white font-semibold rounded-md px-6 py-2 shadow-md hover:opacity-90 cursor-pointer">
            Get Started
          </Button></Link>

          <div className="mt-10 flex justify-center items-center w-full">
            <Mobile />
          </div>
        </div>
      </div>

      {/* Bottom "Scale with No issues" section */}
      <div className="w-full sm:w-[90%] lg:w-[70%] mt-20 px-6 py-10 bg-gray-50 rounded-lg shadow-md text-center">
        <h2 className="text-2xl md:text-4xl sm:text-3xl font-bold text-gray-800 mb-4">
          Scale with <span className="text-red-500">No</span> Issues
        </h2>
        <p className="text-gray-600 max-w-full mx-auto text-base sm:text-lg leading-relaxed">
          Xaper can handle load times up to 99.99% of the time — the rest of the time, well, GOD is against us.
        </p>
      </div>

    </div>
  );
}
