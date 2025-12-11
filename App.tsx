import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { InputArea } from './components/InputArea';
import { MessageBubble } from './components/MessageBubble';
import { Message, AgentType } from './types';
import { sendMessageToGemini } from './services/gemini';
import { Activity } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'System initialized. I am the Hospital Coordinator. How can I assist you today?',
      metadata: {
        coordinator_thought: 'System Startup',
        target_agent: AgentType.COORDINATOR,
        response_content: 'System initialized. I am the Hospital Coordinator. I can route your requests to **Patient Management**, **Medical Records**, **Staff Management**, or **Billing**. How can I assist you today?',
        generated_document: null
      },
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Call API
    const response = await sendMessageToGemini(text);

    setIsLoading(false);

    if (response) {
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response.response_content,
        metadata: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
    } else {
      // Error fallback
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Sorry, I couldn't connect to the multi-agent network.",
        metadata: {
            coordinator_thought: "Connection failure",
            target_agent: AgentType.COORDINATOR,
            response_content: "Sorry, I couldn't connect to the multi-agent network.",
            generated_document: null
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen relative">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white p-4 border-b border-slate-200 flex items-center justify-between sticky top-0 z-20">
          <div className="font-bold text-slate-800">Health-Agent-Core</div>
          <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Online
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-3 text-slate-400 animate-pulse ml-4">
                <Activity size={18} className="animate-spin" />
                <span className="text-sm font-medium">Coordinator is triaging request...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}