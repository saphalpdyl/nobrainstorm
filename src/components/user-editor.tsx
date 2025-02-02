import { useEditorStore } from "@/store/editor";
import { useEffect } from "react";
import { TLEventInfo, useEditor, type TLShape } from "tldraw";

import { useDebounceCallback } from "usehooks-ts";

export default function UserEditor() {
  const editor = useEditor();
  const { setHoveredNode } = useEditorStore();
  const setDebouncedHoveredNode = useDebounceCallback(setHoveredNode, 200);

  useEffect(() => {
    const handlePointerMove = (e: TLEventInfo) => {
      if ( e.name === "pointer_down" ) {
        // Loop through all the text object in the editor
        const shapesAtPoint = editor.getShapesAtPoint({
          x: e.point.x,
          y: e.point.y,
        });

        // find from back of the list
        let hoveredTextShape: TLShape | null = null;

        for ( let i = shapesAtPoint.length - 1; i >= 0; i-- ) {
          if ( shapesAtPoint[i].type === "text" ) {
            hoveredTextShape = shapesAtPoint[i];
            break;
          }
        }

        setDebouncedHoveredNode(hoveredTextShape);
      }
    }
    
    editor.on("event", handlePointerMove);

    return () => {
      editor.off("event", handlePointerMove);
    }
  }, [editor]);

  useEffect(() => {
    

  }, []);

  return null;
}