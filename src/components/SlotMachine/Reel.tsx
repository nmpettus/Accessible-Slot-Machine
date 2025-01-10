import React from 'react';

interface ReelProps {
  symbol: string;
  index: number;
  isSpinning: boolean;
}

export function Reel({ symbol, index, isSpinning }: ReelProps) {
  return (
    <div
      className={`relative w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 text-3xl flex items-center justify-center rounded-xl shadow-inner transform transition-all duration-200 ${
        isSpinning ? 'animate-bounce' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      role="img"
      aria-label={`Reel ${index + 1}: ${symbol}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl" />
      <span className="relative z-10">{symbol}</span>
    </div>
  );
}