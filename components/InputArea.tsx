import React, { useState, KeyboardEvent } from 'react';
import { Send, Mic } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-10 w-full max-w-4xl mx-auto shadow-lg rounded-t-xl">
      <div className="relative flex items-center gap-2">
        <button 
          className="p-3 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          title="Voice input not implemented in demo"
        >
          <Mic size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about patient records, bills, staff schedules..."
          className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={`p-3 rounded-full text-white transition-all shadow-md ${
            !input.trim() || isLoading 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
      <div className="text-center mt-2 text-xs text-slate-400">
        AI-generated content may be inaccurate. Check important information.
      </div>
    </div>
  );
};