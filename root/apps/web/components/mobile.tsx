// components/ScheduleMockup.jsx
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Mobile() {
  return (
 
      <div className="relative w-[280px] sm:w-[320px] rounded-[2rem] bg-black p-2 pt-6 shadow-xl">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-10" />

        {/* Inner screen */}
        <div className="relative z-20 bg-white rounded-xl overflow-hidden p-4 space-y-3">
          {/* Header */}
          <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
            <span className="flex items-center gap-2">
              📅 <span>Schedule</span>
            </span>
            <span className="text-gray-400">See all</span>
          </div>

          {/* Meeting 1 */}
          <Card className="bg-orange-100 border-none">
            <CardContent className="py-3 px-4 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700">
                  Meeting with Kishore
                </h3>
                <span className="text-xs bg-orange-200 text-gray-700 px-2 py-0.5 rounded-full">
                  Marketing
                </span>
              </div>
              <p className="text-xs text-gray-500">8:00 AM - 9:00 AM</p>
              <div className="flex items-center gap-1">
                <Image
                  src="/avatar1.png"
                  width={24}
                  height={24}
                  alt="user"
                  className="rounded-full"
                />
                <Image
                  src="/avatar2.png"
                  width={24}
                  height={24}
                  alt="user"
                  className="rounded-full"
                />
                <span className="text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                  2+
                </span>
              </div>
              <p className="text-xs text-gray-400">on Gmeet</p>
            </CardContent>
          </Card>

          {/* Meeting 2 */}
          <Card className="bg-blue-100 border-none">
            <CardContent className="py-3 px-4 space-y-1">
              <h3 className="text-sm font-semibold text-gray-700">
                Meeting with Manu
              </h3>
              <p className="text-xs text-gray-500">8:00 AM - 9:00 AM</p>
              <div className="flex items-center gap-1">
                <Image
                  src="/avatar3.png"
                  width={24}
                  height={24}
                  alt="user"
                  className="rounded-full"
                />
                <Image
                  src="/avatar4.png"
                  width={24}
                  height={24}
                  alt="user"
                  className="rounded-full"
                />
              </div>
              <p className="text-xs text-gray-400">on Gmeet</p>
            </CardContent>
          </Card>
        </div>
      </div>

   
    
  );
}
