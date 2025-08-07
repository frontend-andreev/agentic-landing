import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const responses: Record<string, string> = {
  'В чем ключевое отличие вашего подхода от SaaS-платформ?': 'Мы не предлагаем готовое решение "из коробки". Вместо этого мы разрабатываем индивидуального AI-агента под ваш конкретный бизнес. Это означает глубокое понимание ваших продуктов, клиентов и бизнес-процессов.',
  'Как вы гарантируете, что AI поймет специфику моего бизнеса?': 'Мы проводим детальный анализ вашей базы знаний, FAQ, истории диалогов с клиентами. AI обучается на ваших реальных данных и кейсах, что обеспечивает точное понимание специфики вашего бизнеса.',
  'Объясните вашу модель ценообразования.': 'Стоимость рассчитывается индивидуально и зависит от сложности интеграции, объема базы знаний и специфических требований. Обычно проект окупается в первые 2-3 месяца за счет экономии на поддержке.'
};

const prompts = [
  "В чем ключевое отличие вашего подхода от SaaS-платформ?",
  "Как вы гарантируете, что AI поймет специфику моего бизнеса?",
  "Объясните вашу модель ценообразования."
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Привет! Я AI-агент поддержки. Задайте мне любой вопрос о нашем сервисе!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Scroll within the chat container only, not the entire page
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "nearest" // This prevents page scroll
      });
    }
  };

  useEffect(() => {
    // Only scroll to bottom for new messages, not initial load
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = responses[content] || 'Спасибо за ваш вопрос! Для получения детальной консультации рекомендую обсудить ваши потребности индивидуально. Нажмите "Обсудить мой проект" для связи с нами.';
      
      const aiMessage: Message = {
        content: response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(inputValue);
    }
  };

  return (
    <div className="bg-[var(--dark-secondary)]/40 backdrop-blur rounded-2xl p-6 border border-[var(--dark-border)] shadow-2xl">
      <div className="space-y-4 mb-6 min-h-64 max-h-96 overflow-y-auto" data-testid="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start space-x-3 chat-message ${message.sender === 'user' ? 'justify-end' : ''}`}>
            {message.sender === 'ai' && (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
            )}
            <div className={`rounded-2xl px-4 py-3 max-w-xs lg:max-w-md ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white' 
                : 'bg-[var(--dark-tertiary)]/70 text-white border border-[var(--dark-border)]/50'
            }`}>
              <p className="text-sm">{message.content}</p>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">Вы</span>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start space-x-3 chat-message">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="bg-gray-700/50 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Prompts */}
      <div className="mb-4">
        <p className="text-sm text-[var(--text-muted)] mb-3">Популярные вопросы:</p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePromptClick(prompt)}
              className="bg-gray-700/30 hover:bg-gray-700/50 border-gray-600/50 text-xs text-white"
              data-testid={`prompt-${index}`}
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="flex space-x-3">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите ваш вопрос..."
          className="flex-1 bg-gray-700/30 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-blue-400"
          data-testid="chat-input"
        />
        <Button
          onClick={() => sendMessage(inputValue)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6"
          data-testid="send-button"
        >
          <span>→</span>
        </Button>
      </div>
    </div>
  );
}
