import { CircleCheckBig, Star, Settings, Bell, LineChart, Brush } from "lucide-react";
import SidebarChip from "@/components/ui/sidebar-chip"; // Adjust the import path as needed
import { useEditorStore } from "@/store/editor";
import { generateApproach } from "@/actions/approach";
import { AssetRecordType, createShapeId, exportToBlob, TLShapeId, useEditor } from "tldraw";
import { getTextBetweenTags } from "@/lib/utils";
import { text } from "d3";
import { generateTodoList } from "@/actions/summarizer";
import { useFrameStore } from "@/store/frame";
import { generateLineGraph } from "@/actions/line-graph";
import { analyzeImage, encodeImage } from "@/actions/image";

export default function SidebarButtons() {
  const { hoveredNode } = useEditorStore();
  const editor = useEditor()
  
  return (
    <div className="absolute top-32 -left-7 flex flex-col gap-4 p-4">
      <SidebarChip 
        onClick={async () => {
          const hoveredNodeRef = hoveredNode;
          
          const response = await generateApproach((hoveredNodeRef?.props as any).text);
          const approaches = getTextBetweenTags(response.choices[0].message.content ?? "", "Approach");

          const parsedApproaches = JSON.parse(approaches);

          parsedApproaches.Approaches.forEach((approach: string[], index: number) => {
            const shapeId = createShapeId();
        
            // Calculate the position for the approach shape
            const approachX = hoveredNodeRef!.x + 1000;
            const approachY = 100 + 550 * index;
        
            // Create the approach shape
            editor.createShape({
              id: shapeId,
              type: 'geo',
              x: approachX,
              y: approachY,
              opacity: 0.6,
              props: {
                w: 1200,
                h: 500,
                text: approach.join("\n\n"),
                align: "start",
              },
            });
        
            // Calculate the start and end points for the arrow
            //@ts-ignore
            const startX = hoveredNodeRef!.x + (hoveredNodeRef?.props.w ?? 0); // Right edge of the hoveredNode
            //@ts-ignore
            const startY = hoveredNodeRef!.y + (hoveredNodeRef?.props.h ?? 0) / 2; // Middle of the hoveredNode
            const endX = approachX; // Left edge of the approach shape
            const endY = approachY + (500 / 2); // Middle of the approach shape
        
            // Create the arrow shape
            editor.createShape({
              id: createShapeId(),
              type: 'arrow',
              props: {
                start: { x: startX, y: startY }, // Start at the right edge of the hoveredNode
                end: { x: endX, y: endY }, // End at the left edge of the approach shape
                arrowheadStart: 'none', // No arrowhead at the start
                arrowheadEnd: 'arrow', // Arrowhead at the end
              },
            });
          });
        
        }}
        icon={<Star size={16} />} 
        className="bg-rose-500" 
        text="Generate approaches" 
        disabled={!hoveredNode}
        />
      <SidebarChip 
        onClick={async () => {
          const hoveredNodeRef = hoveredNode;

          const response = await generateTodoList((hoveredNodeRef?.props as any).text);
          const tasks = getTextBetweenTags(response.choices[0].message.content ?? "", "JSON");
          const parsedTasks = JSON.parse(tasks);

          // Only filter the required keys in the tasks
          const filteredTasks = parsedTasks.tasks.map((task: any) => {
            return {
              id: task.id,
              title: task.title,
              effort: task.effort,
              deadline: task.deadline ?? "",
              priority: task.priority,
            }
          });
          
          editor.createShape({
            id: createShapeId(),
            type: 'todo-shape',
            x: hoveredNodeRef!.x + 500,
            y: hoveredNodeRef!.y,
            props: {
              w: 600,
              h: 500,
              tasks: filteredTasks,
            },
          });

        }}
        icon={<CircleCheckBig size={16} />} 
        className="mt-32"
        text="Generate Todolist" 
        disabled={!hoveredNode}
      />
      <ComplexityTimePlotButton />
      <ScribbleToArtButton />
    </div>
  );
}

function ComplexityTimePlotButton() {
  const { selectedObjectIds } = useFrameStore();
  const editor = useEditor();
  
  const isSelectedObjectsTextAndMoreThanTwo = selectedObjectIds.length >= 2 && selectedObjectIds.every((id: TLShapeId) => {
    const shape = editor.getShape(id);
    return shape?.type === "text" || shape?.type === "geo";
  });
  
  return <SidebarChip 
    onClick={async () => {
      const textsOfShapes = selectedObjectIds.map((id: TLShapeId) => {
        const shape = editor.getShape(id);
        return (shape?.props as any).text;
      });

      const hoveredNodeRef = editor.getShape(selectedObjectIds[0]);

      const response = await generateLineGraph(textsOfShapes.join("\n\n\n"));      
      const data = getTextBetweenTags(response.choices[0].message.content ?? "", "LINEGRAPH");

      const parsedData = JSON.parse(data);
      console.log(parsedData);

      editor.createShape({
        id: createShapeId(),
        type: 'complexity-time-plot',
        x: hoveredNodeRef!.x + 1000,
        y: hoveredNodeRef!.y,
        props: {
          w: 600,
          h: 500,
          data: JSON.parse(data).graphs[0].data,
        },
      });
    }}
    icon={<LineChart size={16} />} 
    className="mt-32 bg-purple-500"
    text="Approach metric" 
    disabled={!isSelectedObjectsTextAndMoreThanTwo}
  />
}

function ScribbleToArtButton() {
  const { selectedObjectIds } = useFrameStore();
  const editor = useEditor();

  const isSelectedObjectsNonText = selectedObjectIds.length >= 1 && selectedObjectIds.every((id: TLShapeId) => {
    const shape = editor.getShape(id);
    return shape?.type !== "text" && shape?.type !== "geo";
  });

  return (
    <SidebarChip
      onClick={async () => {
        return new Promise(async (resolve, reject) => {
          try {
            const blob = await exportToBlob({
              editor,
              format: "png",
              ids: selectedObjectIds,
            });

            // Creating a FileReader instance
            const reader = new FileReader();

            // Reading the Blob as an ArrayBuffer
            reader.readAsArrayBuffer(blob);

            // Event handler for when the FileReader has finished loading
            reader.onloadend = async function () {
              try {
                // Obtaining the ArrayBuffer
                let buffer = reader.result;

                // Converting ArrayBuffer to Base64 string
                let base64data = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));

                // Logging the Base64 encoded string
                const url = await analyzeImage(base64data);
                const assetId = AssetRecordType.createId();

                editor.createAssets([
                  {
                    id: assetId,
                    type: "image",
                    typeName: "asset",
                    props: {
                      name: "Exported Image",
                      src: url,
                      w: 200,
                      h: 400,
                      mimeType: blob.type,
                      isAnimated: false,
                    },
                    meta: {},
                  },
                ]);

                editor.createShape({
                  id: createShapeId(),
                  type: "image",
                  x: 100,
                  y: 100,
                  props: {
                    w: 500,
                    h: 500,
                    assetId: assetId,
                  },
                });

                editor.deleteShapes(selectedObjectIds);

                // Resolve the promise when everything is successful
                resolve();
              } catch (error) {
                // Reject the promise if there's an error in the onloadend handler
                reject(new Error("Error processing image: "));
              }
            };

            // Handle FileReader errors
            reader.onerror = () => {
              reject(new Error("Failed to read the blob as ArrayBuffer"));
            };
          } catch (error) {
            // Reject the promise if there's an error in the initial blob export
            reject(new Error("Error exporting to blob: "));
          }
        });
      }}
      icon={<Brush size={16} />}
      className="mt-32 bg-orange-500"
      text="Scribble to Art"
      disabled={!isSelectedObjectsNonText}
    />
  );
}