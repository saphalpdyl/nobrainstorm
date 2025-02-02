import { ArcherContainer } from "react-archer";
import { DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import TextBox from "@/components/text-box";
import { useEffect, useState } from "react";

import { generateExplanation } from "@/actions/explain-with-ai"
import { useEditorStore } from "@/store/editor";
import { Stream } from "openai/streaming.mjs";
import { ChatCompletionChunk } from "openai/resources/index.mjs";
import { cleanMarkdown, removeBrTags } from "@/lib/utils";
import { useEditor, createShapeId } from "tldraw";

type ExplanationType = "concise" | "elaborative" | "general";

export default function EnhanceWithAIDrawer() {
  const [conciseExplanation, setConciseExplanation] = useState("");
  const [elaborateExplanation, setElaborateExplanation] = useState("");
  const [generalExplanation, setGeneralExplanation] = useState("");
  const [selectedExplanation, setSelectedExplanation] = useState<ExplanationType | null>(null);

  const editor = useEditor();
  
  const { textToEnhance, hoveredNode, setIsEnhanceChatOpen } = useEditorStore(); 

  useEffect(() => {
    if (!textToEnhance) return;

    setConciseExplanation("");
    setElaborateExplanation("");
    setGeneralExplanation("");
    setSelectedExplanation(null);
    
    void async function() {
      try {

        const _ = await Promise.all([
          handleEnhanceWithAI("concise"),
          handleEnhanceWithAI("elaborative"),
          handleEnhanceWithAI("general"),
        ]);
      } finally {
      }
    }();
    
  }, [textToEnhance]);
  
  const handleEnhanceWithAI = async (mode: ExplanationType) => {
    if (!textToEnhance) return;

    const explanationResponse = await generateExplanation(`Answer in ${mode} mode. \n ${textToEnhance}`);
    for await (const chunk of explanationResponse as Stream<ChatCompletionChunk>) {
      if (mode === "concise")
        setConciseExplanation(explanation => cleanMarkdown(explanation + chunk.choices[0]?.delta.content || ""));
      else if (mode === "elaborative")
        setElaborateExplanation(explanation => cleanMarkdown(explanation + chunk.choices[0]?.delta.content || ""));
      else if (mode === "general")
        setGeneralExplanation(explanation => cleanMarkdown(explanation + chunk.choices[0]?.delta.content || ""));
    }
  }

  const handleSelectExplanation = (type: ExplanationType) => {
    setSelectedExplanation(type);
  }

  const handleApplySelection = () => {
    if (!selectedExplanation) return;

    // Get the text
    const text = selectedExplanation === "concise" ? conciseExplanation : selectedExplanation === "elaborative" ? elaborateExplanation : generalExplanation;

    const shapeId = createShapeId();
    
    // If you need to update the shape later
    editor.createShape({
      id: shapeId,
      type: "geo",
      x: hoveredNode?.x ?? 100, 
      y: hoveredNode?.y ?? 100 + 80,
      props: {
        text: removeBrTags(text),
        w: 600,
        align: "start",
      },
    });

    setIsEnhanceChatOpen(false);
  }
  
  if (!textToEnhance) return null;
  
  return (
    <DrawerContent className="h-full rounded-none bg-white/20 backdrop-blur-sm border-none font-shantellSans z-[999]">
      <DrawerTitle className="text-center text-3xl">Enhance with AI</DrawerTitle>
      <DrawerDescription asChild className="">
        <ArcherContainer 
          strokeColor="gray"
          strokeWidth={2}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center justify-center gap-32 px-32">
              <div className="flex-1 w-full flex flex-col items-center gap-10">
                <TextBox 
                  title="Current Version"
                  className="border-purple-500"
                  titleClassName="text-purple-500"
                  text={textToEnhance}
                  id="root"
                  onClick={() => {}}
                  relations={[
                    {
                      targetId: 'element1',
                      targetAnchor: 'left',
                      sourceAnchor: 'right',
                      style: { strokeWidth: 2 }
                    },
                    {
                      targetId: 'element2',
                      targetAnchor: 'left',
                      sourceAnchor: 'right',
                      style: { strokeWidth: 2 }
                    },
                    {
                      targetId: 'element3',
                      targetAnchor: 'left',
                      sourceAnchor: 'right',
                      style: { strokeWidth: 2 }
                    }
                  ]}
                />
                <Button 
                  onClick={handleApplySelection}
                  disabled={!selectedExplanation}
                  className=" p-6 text-3xl font-shantellSans cursor-pointer bg-purple-500 text-white hover:bg-pruple-600"
                >
                  {!selectedExplanation ? "Select an explanation" : "Create a text box"}
                </Button>
              </div>
              <div className="flex-1 w-full mt-16 flex flex-col items-start justify-between gap-10">
                <div className="w-full relative">
                  <TextBox 
                    className={`border-green-500 ${selectedExplanation === 'concise' ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}
                    titleClassName="text-green-500"
                    title="Concise"
                    text={conciseExplanation}
                    id="element1"
                    onClick={() => handleSelectExplanation('concise')}
                  />
                  {selectedExplanation === 'concise' && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-green-500 rounded-full" />
                  )}
                </div>
                <div className="w-full relative">
                  <TextBox 
                    className={`border-rose-500 ${selectedExplanation === 'general' ? 'ring-2 ring-rose-500 ring-offset-2' : ''}`}
                    titleClassName="text-rose-500"
                    title="General"
                    text={generalExplanation}
                    id="element2"
                    onClick={() => handleSelectExplanation('general')}
                  />
                  {selectedExplanation === 'general' && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-rose-500 rounded-full" />
                  )}
                </div>
                <div className="w-full relative">
                  <TextBox 
                    className={`border-cyan-500 ${selectedExplanation === 'elaborative' ? 'ring-2 ring-cyan-500 ring-offset-2' : ''}`}
                    titleClassName="text-cyan-500"
                    title="Elaborative"
                    text={elaborateExplanation}
                    id="element3"
                    onClick={() => handleSelectExplanation('elaborative')}
                  />
                  {selectedExplanation === 'elaborative' && (
                    <div className="absolute -right-2 -top-2 w-4 h-4 bg-cyan-500 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ArcherContainer>
      </DrawerDescription>
    </DrawerContent>
  )
}