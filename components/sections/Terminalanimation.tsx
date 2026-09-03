import React, { useState, useEffect } from 'react';

const TerminalAnimation = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const fullText = `$ whoami
Senior Full-Stack Engineer

$ services
- Mobile App Development (iOS/Android)
- Web Applications 
- API & Backend Architecture
- AI/ML Feature Integration

$ case_studies
Google Play, App Store, Huawei AppGallery deployed
5+ years in Agile environments
Specialized in React, Laravel, Node.js

$ get_in_touch
Ready for your next project

$ _`;

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 20);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, fullText]);

  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
      {/* Terminal content */}
      <div className="w-full h-full p-6 flex flex-col bg-gradient-to-b from-black to-black/80">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-500/20">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <span className="text-xs text-green-400/60 ml-2 font-mono">portfolio.terminal</span>
        </div>

        {/* Terminal text output */}
        <div className="flex-1 overflow-y-auto">
          <pre className="font-mono text-[11px] leading-5 whitespace-pre-wrap break-words text-green-300">
            <span className="text-green-400">
              {displayedText}
              {!isComplete && <span className="animate-pulse">▌</span>}
            </span>
          </pre>
        </div>

        {/* Glow effects */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl -z-10"></div>
      </div>

      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TerminalAnimation;