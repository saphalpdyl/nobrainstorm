import { useEditorStore } from "@/store/editor";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DrawerTrigger } from "@/components/ui/drawer";

export default function UserHoverTextButton() {
  const { hoveredNode, setTextToEnhance, setIsEnhanceChatOpen } = useEditorStore();

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
            className="absolute py-1 px-2 rounded-lg shadow-md bg-indigo-500 hover:bg-indigo-600 text-white font-semibold  cursor-pointer"
            onClick={() => {
              setTextToEnhance((hoveredNode.props as any).text)
            }}
          > 
          <DrawerTrigger asChild onClick={() => setIsEnhanceChatOpen(true)}>
            <div onClick={() => setIsEnhanceChatOpen(true)} className="flex items-center gap-2">
              <Sparkles className="text-yellow-300" size={16}/>
              Enhance with AI
            </div>
          </DrawerTrigger>
          </motion.div>
        )
      }
    </AnimatePresence>
}