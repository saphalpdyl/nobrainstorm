import { useEditorStore } from "@/store/editor";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function UserHoverTextButton() {
  const { hoveredNode, setHoveredNode } = useEditorStore();

  return <AnimatePresence>
      {
        hoveredNode && (
          <motion.div 
            animate={{ opacity: 1, y:0 }}
            initial={{ opacity: 0, y: 10 }}
            exit={{ opacity: 0, y: 0 }}
          
            style={{
              top: hoveredNode.y - 32,
              left: hoveredNode.x,
            }}
            className="absolute z-[9999] py-1 px-2 rounded-lg shadow-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="text-yellow-300" size={16}/>
            Enhance with AI
          </motion.div>
        )
      }
    </AnimatePresence>
}