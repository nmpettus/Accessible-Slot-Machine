import React, { useState, useEffect, useCallback } from 'react';
import { speak, cancelSpeech } from '../../utils/speech';
import { 
  playSpinStartSound, 
  playReelSpinSound, 
  playWinSound, 
  playLoseSound 
} from '../../utils/sounds';
import { fireConfetti } from '../../utils/confetti';
import { SYMBOLS, calculateWin } from '../../utils/gameLogic';
import { Header } from './Header';
import { Reel } from './Reel';
import { Stats } from './Stats';
import { SpinButton } from './SpinButton';
import { History } from './History';
import { Footer } from './Footer';

const SPIN_DURATION = 2000;

export function SlotMachine() {
  const [reels, setReels] = useState(['🎰', '🎰', '🎰', '🎰']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [credits, setCredits] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [history, setHistory] = useState<{ symbols: string[], win: number }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  
  // ... rest of the component logic remains the same ...

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="relative max-w-md w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-indigo-500/20 blur-2xl rounded-[32px]" />
        <div className="relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/10 shadow-2xl">
          <Header
            isMuted={isMuted}
            showHistory={showHistory}
            onToggleMute={() => setIsMuted(!isMuted)}
            onToggleHistory={() => setShowHistory(!showHistory)}
          />

          <div className="relative">
            <div className={`bg-slate-800/40 p-6 rounded-2xl mb-6 backdrop-blur-sm transition-all duration-300 ${
              showHistory ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              <div className="flex justify-center gap-3 mb-6">
                {reels.map((symbol, index) => (
                  <Reel
                    key={index}
                    symbol={symbol}
                    index={index}
                    isSpinning={isSpinning}
                  />
                ))}
              </div>

              <Stats credits={credits} lastWin={lastWin} />
              <SpinButton
                isSpinning={isSpinning}
                credits={credits}
                onClick={spin}
              />
            </div>

            <History history={history} show={showHistory} />
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}