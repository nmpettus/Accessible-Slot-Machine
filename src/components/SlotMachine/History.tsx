import React from 'react';

interface HistoryProps {
  history: Array<{ symbols: string[]; win: number }>;
  show: boolean;
}

export function History({ history, show }: HistoryProps) {
  return (
    <div className={`absolute inset-0 bg-slate-900/50 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
      show ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <h2 className="text-xl font-bold mb-4">Recent Spins</h2>
      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {history.map((spin, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg">
            <div className="flex gap-2">
              {spin.symbols.map((symbol, idx) => (
                <div key={idx} className="w-8 h-8 bg-slate-700/50 rounded flex items-center justify-center">
                  {symbol}
                </div>
              ))}
            </div>
            <span className={spin.win > 0 ? 'text-emerald-400' : 'text-red-400'}>
              {spin.win > 0 ? `+${spin.win}` : '-10'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}