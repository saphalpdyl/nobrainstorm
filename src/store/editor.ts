import { TLShape } from "tldraw";
import { create } from "zustand";

interface EditorStore {
  hoveredNode: TLShape | null;
  setHoveredNode: (node: TLShape | null) => void;

  isEnhanceChatOpen: boolean;
  setIsEnhanceChatOpen: (isOpen: boolean) => void;

  textToEnhance: string | null;
  setTextToEnhance: (text: string | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // The current selected node
  hoveredNode: null,
  // The current selected node
  setHoveredNode: (node: TLShape | null) => set({ hoveredNode: node }),

  isEnhanceChatOpen: false,
  setIsEnhanceChatOpen: (isOpen: boolean) => set({ isEnhanceChatOpen: isOpen }),

  textToEnhance: null,
  setTextToEnhance: (text: string | null) => set({ textToEnhance: text }),
}));