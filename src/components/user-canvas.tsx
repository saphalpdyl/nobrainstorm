"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";

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
        shapeUtils={[ComplexityTimePlot]}
      >
        
      </Tldraw>
    </div>
  );
}