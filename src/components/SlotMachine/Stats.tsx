import React from 'react';
import { Coins, Trophy } from 'lucide-react';

interface StatsProps {
  credits: number;
  lastWin: number;
}

export function Stats({ credits, lastWin }: StatsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Coins className="text-yellow-400" size={24} />
        <span className="text-xl font-bold">{credits}</span>
      </div>
      {lastWin > 0 && (
        <div className="flex items-center gap-2 text-green-400">
          <Trophy size={24} />
          <span className="text-xl font-bold">+{lastWin}</span>
        </div>
      )}
    </div>
  );
}