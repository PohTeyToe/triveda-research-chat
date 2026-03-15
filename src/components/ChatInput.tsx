import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-10 backdrop-blur-xl bg-dark/80 border-t border-dark-border">
      <div className="max-w-3xl mx-auto px-4 py-3">
        <div className="flex items-end gap-2 bg-dark-surface border border-dark-border rounded-xl px-3 py-2">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the Triveda research..."
            disabled={disabled}
            rows={1}
            className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/25 resize-none outline-none font-body leading-relaxed"
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            className="p-2 rounded-lg text-brand-teal hover:bg-brand-teal/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-white/20 text-center mt-2 font-body">
          Powered by Claude · Grounded in 29 research documents
        </p>
      </div>
    </div>
  );
}
