import React from 'react';
import { Controls } from './Controls';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  isMuted: boolean;
  showHistory: boolean;
  onToggleMute: () => void;
  onToggleHistory: () => void;
}

export function Header({ isMuted, showHistory, onToggleMute, onToggleHistory }: HeaderProps) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Lucky Slots
          </h1>
          <p className="text-cyan-300/80 text-sm">Accessible Gaming for Everyone</p>
        </div>
      </div>
      <Controls
        isMuted={isMuted}
        showHistory={showHistory}
        onToggleMute={onToggleMute}
        onToggleHistory={onToggleHistory}
      />
    </div>
  );
}