import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  isBot: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, isBot }) => {
  return (
    <div className={`flex items-start space-x-2 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isBot ? 'bg-blue-100' : 'bg-green-100'
      }`}>
        <p className="text-gray-800">{content}</p>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};