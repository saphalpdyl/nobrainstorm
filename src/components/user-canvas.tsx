"use client";

import {  createShapeId, DefaultGrid, HTMLContainer, Tldraw, TLGeoShape } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";
import { VennDiagramShape } from "@/components/custom-tldraw-components/venn-diagram";
import UserEditor from "./user-editor";
import UserHoverTextButton from "./user-hover-text-button";
import EnhanceWithAIDrawer from "./enhance-with-ai-drawer";
import { TodoShapeUtil } from "./custom-tldraw-components/todo-list";
import SidebarButtons from "./sidebar-buttons";

// const mockTasks = [
//   {
//     id: '1',
//     title: 'Set up development environment',
//     effort: 'quick',
//     deadline: null,
//   },
//   {
//     id: '2',
//     title: 'Write documentation',
//     effort: 'medium',
//     deadline: '2023-12-31',
//   },
//   {
//     id: '3',
//     title: 'Refactor legacy code',
//     effort: 'large',
//     deadline: '2023-11-15',
//   },
// ];

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
          Grid: props => <DefaultGrid {...props} />,
        }}
        shapeUtils={[ComplexityTimePlot, VennDiagramShape, TodoShapeUtil]}
        onMount={(editor) => {
          editor.updateInstanceState({ isGridMode: true, })
          // editor.createShape({
          //   id: createShapeId(),
          //   type: 'todo-shape',
          //   x: 100,
          //   y: 100,
          //   props: {
          //     w: 300,
          //     h: 500,
          //     tasks: mockTasks, // Pass mock data
          //   },
          // })
        }}
      >
        <SidebarButtons />
        <EnhanceWithAIDrawer />
        <UserEditor />
        <UserHoverTextButton />
      </Tldraw>
    </div>
  );
}