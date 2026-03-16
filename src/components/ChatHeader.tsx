import { Leaf, Presentation } from 'lucide-react';

export function ChatHeader() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-xl bg-dark/80 border-b border-dark-border">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-teal/10 flex items-center justify-center">
            <Leaf className="w-4 h-4 text-brand-teal" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-light text-white/90 leading-tight">
              Triveda Research
            </h1>
            <p className="text-xs text-white/30 font-body">
              Chat with the knowledge base
            </p>
          </div>
        </div>
        <a
          href="https://triveda-presentation.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/40 hover:text-brand-teal hover:bg-brand-teal/10 transition-colors font-body"
        >
          <Presentation className="w-3.5 h-3.5" />
          View Presentation
        </a>
      </div>
    </header>
  );
}
