import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArcherElement } from "react-archer";

export default function TextBox({
  text,
  id,
  relations,
  title,
  className,
  titleClassName,
  onClick,
}: {
  title?: string;
  text: string;
  id: string;
  className?: string;
  titleClassName?: string;
  onClick: () => void;
  relations?: Array<{
    targetId: string;
    targetAnchor: 'top' | 'bottom' | 'left' | 'right';
    sourceAnchor: 'top' | 'bottom' | 'left' | 'right';
    style?: any;
  }>;
}) {  
  return (
    <ArcherElement
      id={id}
      relations={relations}
    >
      <div 
      onClick={onClick}
      className={cn(
        "w-full h-[14rem] p-3 bg-white text-black font-thin text-2xl border border-gray-400 rounded-md flex flex-col overflow-y-auto ",
        className
      )}>
        {title && (
          <div className="p-2 border-b border-gray-200">
            <span className={cn(" font-bold block", titleClassName)}>
              {title}
            </span>
          </div>
        )}
          <div className="pr-4"> {/* Add right padding for scrollbar */}
            <div className="text-xs font-[Poppins]" dangerouslySetInnerHTML={{
              __html: text,
            }}></div>
          </div>
      </div>
    </ArcherElement>
  );
}