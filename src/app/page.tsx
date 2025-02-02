"use client";

import UserCanvas from "@/components/user-canvas";
import { Toaster } from "@/components/ui/toaster";
import { Drawer } from "@/components/ui/drawer";
import Image from "next/image";
import EnhanceWithAIDrawer from "@/components/enhance-with-ai-drawer";
import { useEditorStore } from "@/store/editor";

export default function Home() {
  const { setIsEnhanceChatOpen, setTextToEnhance, isEnhanceChatOpen } = useEditorStore();
  
  return (
    <div className="h-screen w-screen">
      <div className="absolute top-0 left-0 z-10 p-2 flex items-center font-bold font-shantellSans text-2xl text-zinc-700">
        <Image src="/logo.svg" alt="Company Logo" height={50} width={50} />
        nobrainstorm.ai
      </div>
      <Toaster />
      <Drawer open={isEnhanceChatOpen} onClose={() => {
        setIsEnhanceChatOpen(false)
        setTextToEnhance(null);
      }}>
        <UserCanvas />
      </Drawer>
    </div>
  );
}