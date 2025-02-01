import UserCanvas from "@/components/user-canvas";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Toaster />
      <UserCanvas />
    </div>
  );
}
