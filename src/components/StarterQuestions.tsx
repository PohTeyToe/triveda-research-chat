import { motion } from 'framer-motion';
import { Leaf, Zap, Target, Database, Users, Shield } from 'lucide-react';

const QUESTIONS = [
  { icon: Leaf, text: 'What is Triveda and how did you arrive at this direction?' },
  { icon: Zap, text: 'Why were 16+ features killed from the current app?' },
  { icon: Target, text: 'How does the three-tradition architecture work?' },
  { icon: Database, text: "What's the Database+LLM approach and why does it matter?" },
  { icon: Users, text: 'Who is the target audience?' },
  { icon: Shield, text: 'What were the main counterarguments?' },
];

interface Props {
  onSelect: (question: string) => void;
}

export function StarterQuestions({ onSelect }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <h2 className="font-heading text-2xl font-light text-white/80 mb-2">
          Explore the Research
        </h2>
        <p className="text-sm text-white/30 font-body max-w-md">
          29 documents · ~100K words of product exploration, architectural
          decisions, and strategic analysis
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
        {QUESTIONS.map(({ icon: Icon, text }, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(text)}
            className="text-left p-4 rounded-xl bg-dark-elevated border border-dark-border hover:border-brand-teal/30 hover:bg-dark-surface transition-colors group"
          >
            <Icon className="w-4 h-4 text-brand-teal/50 group-hover:text-brand-teal mb-2 transition-colors" />
            <p className="text-sm text-white/60 group-hover:text-white/80 font-body leading-snug transition-colors">
              {text}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
