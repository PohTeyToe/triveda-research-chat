import { useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatHeader } from './components/ChatHeader';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { StarterQuestions } from './components/StarterQuestions';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, isLoading, error, sendMessage, dismissError } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, isLoading]);

  return (
    <div className="h-dvh flex flex-col">
      <ChatHeader />

      {messages.length === 0 && !isLoading ? (
        <StarterQuestions onSelect={sendMessage} />
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageBubble message={msg} />
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-dark-elevated border border-dark-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-brand-teal/50 animate-pulse"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-4 mb-2"
          >
            <div className="max-w-3xl mx-auto bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 flex items-center justify-between">
              <p className="text-sm text-red-400 font-body">{error}</p>
              <button
                onClick={dismissError}
                className="text-red-400/60 hover:text-red-400 ml-3 text-sm"
              >
                x
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
