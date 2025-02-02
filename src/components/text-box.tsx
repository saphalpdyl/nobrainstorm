import { cn } from "@/lib/utils";
import { ArcherElement } from "react-archer";

export default function TextBox({
  text,
  id,
  relations,
  title,
  className,
  titleClassName,
}: {
  title?: string;
  text: string;
  id: string;
  className?: string;
  titleClassName?: string;
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
      <div className={cn("min-w-24 max-w-96 bg-white text-gray-600 font-thin text-sm border border-gray-400 p-2 rounded-md", className)}>
        {
          title && <span className={cn("text-xl font-bold underline", titleClassName)}>{ title }</span>
        }
        <p>{ text }</p>
      </div>
    </ArcherElement>
  );
}