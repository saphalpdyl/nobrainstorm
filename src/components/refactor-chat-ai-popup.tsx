import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { generateAskAIRespones } from '@/actions/ask-ai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useEditorStore } from '@/store/editor';

const RefactorChatPopup = ({ isOpen, onClose, initialText, onAccept }: {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  onAccept: (text: string) => void;
}) => {
  const { setIsRefactorChatOpen } = useEditorStore();
  
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentText, setCurrentText] = useState(initialText);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    let initialMessage: ChatCompletionMessageParam[] = []
    if ( messages.length === 0 ) {
      initialMessage.push({
        role: "user",
        content: `This is my text before refactoring. Every modification must stem from the text following this text. \n ${initialText}`
      });
    }
    
    // Add user message
    const newMessages: ChatCompletionMessageParam[] = [
      ...messages,
      ...initialMessage,
      { role: 'user', content: inputMessage }
    ];

    // Simulate AI response (in a real app, this would call your AI service)
    const aiResponse = await generateAskAIRespones([
      ...messages,
      ...newMessages,
    ]);
    newMessages.push({ role: 'assistant', content: aiResponse.choices[0].message.content ?? "Sorry, I didn't understand that" });

    setMessages(newMessages);
    setInputMessage('');
    setCurrentText(aiResponse!.choices![0]!.message!.content); // Extract the modified text
  };

  return (
    <Dialog open={isOpen} onOpenChange={(x) => {
      if ( x === false ) {
        setIsRefactorChatOpen(false);
        setMessages([]);
        setInputMessage('');
        setCurrentText('');
        onClose();
      }
    }}>
      <DialogContent className="z-[999]">
        <DialogHeader>
          <DialogTitle>Refactor Text</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-96 ">
          <ScrollArea className="flex-grow p-4 border rounded-md mb-4">
            <span className='text-gray-500 italic'>{ initialText }</span>
            
            {messages.slice(1).map((message, index) => {
              return <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' 
                    ? 'text-blue-600'
                    : message.role === 'system'
                    ? 'text-gray-500 italic'
                    : 'text-green-600'
                }`}
              >
                <strong>{message.role === 'assistant' ? 'AI' : message.role === 'user' ? 'You' : 'System'}:</strong>
                <p className="mt-1">{message.content as string}</p>
              </div>
          })}
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your instructions..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button type='submit' onClick={() => onAccept(currentText)}>
            Accept Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RefactorChatPopup;