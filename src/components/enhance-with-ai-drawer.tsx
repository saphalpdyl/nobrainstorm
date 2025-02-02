import { ArcherContainer } from "react-archer";
import { DrawerContent, DrawerDescription, DrawerTitle } from "@/components/ui/drawer";
import TextBox from "@/components/text-box";

export default function EnhanceWithAIDrawer() {
  return (
    <DrawerContent className="h-full rounded-none bg-white/20 backdrop-blur-sm border-none font-shantellSans z-[999]">
      <DrawerTitle className="text-center text-3xl">Enhance with AI</DrawerTitle>
      <DrawerDescription asChild className="">
        <div className="flex-1 flex flex-col items-center justify-center">
          <ArcherContainer strokeColor="gray">
            <div className="flex justify-center">
              <TextBox 
                title="Current Version"
                className="border-purple-500"
                titleClassName="text-purple-500"
                text="This is a description of the AI enhancement feature. It will be a brief description of the feature and how it can be used."
                id="root"
                relations={[
                  {
                    targetId: 'element1',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                  },
                  {
                    targetId: 'element2',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                  },
                  {
                    targetId: 'element3',
                    targetAnchor: 'top',
                    sourceAnchor: 'bottom',
                  }
                ]}
              />
            </div>
            <div className="mt-32 flex items-start justify-between gap-10">
              <TextBox 
                className="border-green-500"
                titleClassName="text-green-500"
                title="Concise"
                text="This is a description of the AI enhancement feature. It will be a brief description of the feature and how it can be used."
                id="element1"
                />
              <TextBox 
                className="border-rose-500"
                titleClassName="text-rose-500"
                title="Engaging"
                text="This is a description of the AI enhancement feature. It will be a brief description of the feature and how it can be used."
                id="element2"
              />
              <TextBox 
                className="border-cyan-500"
                titleClassName="text-cyan-500"
                title="Informative"
                text="This is a description of the AI enhancement feature. It will be a brief description of the feature and how it can be used."
                id="element3"
              />
            </div>
          </ArcherContainer>
        </div>
      </DrawerDescription>
    </DrawerContent>
  )
}