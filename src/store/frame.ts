import { TLShapeId } from "tldraw";
import { create } from "zustand";

interface FrameStore {
  selectedObjectIds: TLShapeId[];
  setSelectedObjectIds: (ids: TLShapeId[]) => void;
}

export const useFrameStore = create<FrameStore>((set) => ({
  selectedObjectIds: [],
  setSelectedObjectIds: (ids) => set({ selectedObjectIds: ids }),
}));