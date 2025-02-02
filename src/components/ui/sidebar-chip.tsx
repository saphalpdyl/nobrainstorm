import { cn } from "@/lib/utils";
import { CircleCheckBig, Loader } from "lucide-react";
import { ReactNode, useState } from "react";

interface SidebarChipProps {
  icon?: ReactNode;
  text: string;
  className?: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
}

export default function SidebarChip({ icon = <CircleCheckBig size={16} />, text, className, onClick, disabled = false }: SidebarChipProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if ( loading ) return;
    
    setLoading(true);
    await onClick();
    setLoading(false);
  }
  
  return (
    <div 
      onClick={handleClick}
      className={cn("flex cursor-pointer items-end mt-24 gap-2 bg-blue-500 text-white font-bold -rotate-90 transform origin-top-left hover:translate-x-1 transition-all px-2 pb-1 pt-4 rounded-b-lg", className, disabled && "bg-gray-300 cursor-not-allowed")}>
      {loading ? <Loader className="animate-spin" size={16} /> : icon}
      <span>{text}</span>
    </div>
  );
}