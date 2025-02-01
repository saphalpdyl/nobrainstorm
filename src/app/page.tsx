import UserCanvas from "@/components/user-canvas";
import { Toaster } from "@/components/ui/toaster";

import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 z-10 p-2 flex items-center font-bold font-shantellSans text-2xl text-zinc-700">
        <Image src="/logo.svg"  alt="Company Logo" height={50} width={50} />
        nobrainstorm.ai
      </div>
      <Toaster />
      <UserCanvas />
    </div>
  );
}
