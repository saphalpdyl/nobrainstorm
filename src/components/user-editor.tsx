import { useEditorStore } from "@/store/editor";
import { useEffect } from "react";
import { TLEventInfo, useEditor, type TLShape } from "tldraw";

export default function UserEditor() {
  const editor = useEditor();
  const { setHoveredNode } = useEditorStore();

  useEffect(() => {
    const handlePointerMove = (e: TLEventInfo) => {
      if ( e.name === "pointer_down" ) {
        // Loop through all the text object in the editor
        // const shapesAtPoint = editor.getShapesAtPoint({
        //   x: e.point.x,
        //   y: e.point.y,
        // });

        const shapesAtPoint = editor.getSelectedShapes();


        // find from back of the list
        let hoveredTextShape: TLShape | null = null;

        for ( let i = shapesAtPoint.length - 1; i >= 0; i-- ) {
          if ( shapesAtPoint[i].type === "text" || shapesAtPoint[i].type === "geo" ) {
            hoveredTextShape = shapesAtPoint[i];
            break;
          }
        }

        setHoveredNode(hoveredTextShape);
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