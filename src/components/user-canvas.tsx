"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";

export default function UserCanvas() {
  return (
    <div className="w-full h-full">
      <Tldraw
        shapeUtils={[ComplexityTimePlot]}
      >
        
      </Tldraw>
    </div>
  );
}