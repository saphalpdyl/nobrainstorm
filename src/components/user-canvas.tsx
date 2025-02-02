"use client";

import {  DefaultGrid, Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { ComplexityTimePlot } from "./custom-tldraw-components/complexity-plot";
import { VennDiagramShape } from "@/components/custom-tldraw-components/venn-diagram";
import UserEditor from "./user-editor";
import UserHoverTextButton from "./user-hover-text-button";

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
        shapeUtils={[ComplexityTimePlot, VennDiagramShape]}
        onMount={(editor) => {
          editor.updateInstanceState({ isGridMode: true, })
        }}
      >
        <UserEditor />
        <UserHoverTextButton />
      </Tldraw>
    </div>
  );
}