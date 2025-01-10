import React from 'react';
import { History, Volume2, VolumeX } from 'lucide-react';

interface ControlsProps {
  isMuted: boolean;
  showHistory: boolean;
  onToggleMute: () => void;
  onToggleHistory: () => void;
}

export function Controls({ isMuted, showHistory, onToggleMute, onToggleHistory }: ControlsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onToggleHistory}
        className="p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 transition-all hover:bg-slate-700/50 hover:scale-105 active:scale-95"
        aria-label="Show history"
      >
        <History className="w-5 h-5" />
      </button>
      <button
        onClick={onToggleMute}
        className={`p-3 rounded-xl backdrop-blur-sm border border-white/10 transition-all hover:scale-105 active:scale-95 ${
          isMuted 
            ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
            : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400'
        }`}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
}