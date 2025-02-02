import { CircleCheckBig, Star, Settings, Bell, LineChart } from "lucide-react";
import SidebarChip from "@/components/ui/sidebar-chip"; // Adjust the import path as needed
import { useEditorStore } from "@/store/editor";
import { generateApproach } from "@/actions/approach";
import { createShapeId, TLShapeId, useEditor } from "tldraw";
import { getTextBetweenTags } from "@/lib/utils";
import { text } from "d3";
import { generateTodoList } from "@/actions/summarizer";
import { useFrameStore } from "@/store/frame";
import { generateLineGraph } from "@/actions/line-graph";

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
      
    </div>
  );
}

function ComplexityTimePlotButton() {
  const { hoveredNode } = useEditorStore();
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