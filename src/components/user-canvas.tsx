"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";
import { VennDiagramShape } from "@/components/custom-tldraw-components/venn-diagram";

export default function UserCanvas() {
  return (
    <div className="w-full h-full">
      <Tldraw
        components={{
          MainMenu: () => null,
          PageMenu: () => null,
          ActionsMenu: () => null,
          ZoomMenu: () => null,
          Minimap: () => null,
          QuickActions: () => null,
        }}
        shapeUtils={[ComplexityTimePlot, VennDiagramShape]}
      >
        
      </Tldraw>
    </div>
  );
}