import React from 'react';

interface SpinButtonProps {
  isSpinning: boolean;
  credits: number;
  onClick: () => void;
}

export function SpinButton({ isSpinning, credits, onClick }: SpinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isSpinning || credits < 10}
      className={`relative w-full py-4 px-6 rounded-xl text-white font-bold transition-all transform hover:scale-102 active:scale-98 disabled:hover:scale-100 overflow-hidden ${
        isSpinning || credits < 10
          ? 'bg-slate-700/50 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-lg hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600'
      }`}
      aria-label={
        isSpinning
          ? 'Spinning...'
          : credits < 10
          ? 'Not enough credits'
          : 'Spin the reels'
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      <span className="relative">
        {isSpinning ? 'Spinning...' : 'Spin (10 credits)'}
      </span>
    </button>
  );
}