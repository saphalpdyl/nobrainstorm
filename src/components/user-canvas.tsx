"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";

export default function UserCanvas() {
  return (
    <div className="w-full h-full">
      <Tldraw
        shapeUtils={[ComplexityTimePlot]}
        onMount={(editor) => {
          // Mock data for time complexity plot and add shape
            const data = Array.from({ length: 5 }, (_, i) => ({
              name: String.fromCharCode(65 + i),
              complexity: Math.random(),
              time: Math.random(),
            }));

          editor.createShape({
            type: "complexity-time-plot",
            x: 100,
            y: 100,
            props: {
              w: 600,
              h: 400,
              data,
            },
          });
          
        }}
      >
        
      </Tldraw>
    </div>
  );
}