import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, AgentType } from '../types';
import { AGENTS, getIcon } from '../constants';
import { FileText, ArrowRight, ExternalLink } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  if (isUser) {
    return (
      <div className="flex justify-end mb-6">
        <div className="bg-slate-800 text-white rounded-2xl rounded-tr-sm px-6 py-4 max-w-[80%] shadow-md">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  // Model Message Logic
  const agentKey = message.metadata?.target_agent || AgentType.COORDINATOR;
  const agent = AGENTS[agentKey];
  const reasoning = message.metadata?.coordinator_thought;
  const hasDoc = !!message.metadata?.generated_document;
  const doc = message.metadata?.generated_document;
  const sources = message.metadata?.sources;

  return (
    <div className="flex flex-col mb-8 animate-fade-in">
      {/* Coordinator Reasoning Block - visible as a system log */}
      {reasoning && (
        <div className="flex items-start gap-3 mb-3 ml-2 opacity-80">
          <div className="mt-1">
            <div className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 max-w-xl">
            <span className="font-bold text-slate-600">COORDINATOR:</span> {reasoning}
            <div className="flex items-center gap-1 mt-1 text-blue-600 font-semibold">
              <ArrowRight size={12} />
              Routing to {agent.name}
            </div>
          </div>
        </div>
      )}

      {/* Main Agent Response */}
      <div className="flex gap-4">
        {/* Agent Avatar */}
        <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-sm ${agent.bgColor} ${agent.color}`}>
          {getIcon(agent.iconName, 20)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-bold ${agent.color}`}>{agent.name}</span>
            <span className="text-xs text-slate-400">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-6 py-5 shadow-sm text-slate-800 text-sm md:text-base leading-relaxed">
             <ReactMarkdown 
               components={{
                 ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2 space-y-1" {...props} />,
                 ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2 space-y-1" {...props} />,
                 strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
                 h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-slate-800" {...props} />
               }}
             >
               {message.metadata?.response_content || message.content}
             </ReactMarkdown>

            {/* Generated Document Card */}
            {hasDoc && doc && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg group hover:border-blue-300 transition-colors cursor-pointer">
                <div className="p-2 bg-red-100 text-red-600 rounded">
                  <FileText size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-blue-600">{doc.title}.{doc.type}</p>
                  <p className="text-xs text-slate-500">Generated System Document</p>
                </div>
                <div className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600">
                  Download
                </div>
              </div>
            )}
            
             {/* Sources/Grounding */}
             {sources && sources.length > 0 && (
               <div className="mt-4 pt-4 border-t border-slate-100">
                 <p className="text-xs font-semibold text-slate-500 mb-2">Sources:</p>
                 <div className="flex flex-wrap gap-2">
                   {sources.map((s, idx) => (
                     <a 
                      key={idx} 
                      href={s.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition-colors"
                     >
                       {s.title}
                       <ExternalLink size={10} />
                     </a>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};