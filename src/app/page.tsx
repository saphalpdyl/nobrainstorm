"use client";

import UserCanvas from "@/components/user-canvas";
import { Toaster } from "@/components/ui/toaster";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";

import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 z-10 p-2 flex items-center font-bold font-shantellSans text-2xl text-zinc-700">
        <Image src="/logo.svg"  alt="Company Logo" height={50} width={50} />
        nobrainstorm.ai
      </div>
      <Toaster />
      <Drawer>
        <UserCanvas />
        <DrawerContent className="h-full rounded-none bg-white/20 backdrop-blur-sm border-none font-shantellSans z-[999]">
          <DrawerTitle className="text-center text-3xl">Enhance with AI</DrawerTitle>
          <DrawerDescription className="flex-1 flex flex-col items-center justify-center">
            Hello from the 
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
