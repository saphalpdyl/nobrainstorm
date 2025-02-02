import { TLShape } from "tldraw";
import { create } from "zustand";

interface EditorStore {
  hoveredNode: TLShape | null;
  setHoveredNode: (node: TLShape | null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  // The current selected node
  hoveredNode: null,
  // The current selected node
  setHoveredNode: (node: TLShape | null) => set({ hoveredNode: node }),
}));