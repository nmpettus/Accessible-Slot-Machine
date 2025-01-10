import React, { useState, useEffect, useCallback } from 'react';
import { speak, cancelSpeech } from '../utils/speech';
import { 
  playSpinStartSound, 
  playReelSpinSound, 
  playWinSound, 
  playLoseSound 
} from '../utils/sounds';
import { fireConfetti } from '../utils/confetti';
import { Volume2, VolumeX, Coins, Trophy, History } from 'lucide-react';
import { SYMBOLS, calculateWin } from '../utils/gameLogic';

const SPIN_DURATION = 2000;
const REEL_SOUND_INTERVAL = 150;

export function SlotMachine() {
  const [reels, setReels] = useState(['🎰', '🎰', '🎰', '🎰']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [credits, setCredits] = useState(100);
  const [isMuted, setIsMuted] = useState(false);
  const [history, setHistory] = useState<{ symbols: string[], win: number }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  
  const spin = useCallback(() => {
    if (isSpinning || credits < 10) return;
    
    setCredits(prev => prev - 10);
    setIsSpinning(true);
    setLastWin(0);
    
    if (!isMuted) {
      cancelSpeech();
      speak('Spinning the reels');
      playSpinStartSound();
    }

    let reelSoundTimer: NodeJS.Timeout;
    const spinInterval = setInterval(() => {
      setReels(prev => prev.map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]));
      
      if (!isMuted) {
        clearTimeout(reelSoundTimer);
        reelSoundTimer = setTimeout(() => playReelSpinSound(), 0);
      }
    }, 100);

    setTimeout(() => {
      clearInterval(spinInterval);
      clearTimeout(reelSoundTimer);
      
      const finalReels = Array(4).fill(0).map(() => 
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
      );
      setReels(finalReels);
      setIsSpinning(false);
      
      const result = calculateWin(finalReels);
      
      if (result.winAmount > 0) {
        setCredits(prev => prev + result.winAmount);
        setLastWin(result.winAmount);
        if (!isMuted) {
          playWinSound(result.matches);
          speak(result.message);
        }
        fireConfetti(result.matches);
      } else {
        if (!isMuted) {
          playLoseSound();
          speak(result.message);
        }
      }

      setHistory(prev => [{
        symbols: finalReels,
        win: result.winAmount
      }, ...prev].slice(0, 10));
    }, SPIN_DURATION);
  }, [isSpinning, credits, isMuted]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        spin();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [spin]);

  useEffect(() => {
    speak('Welcome to the Accessible Slot Machine! Press Space or click Spin to play. Each spin costs 10 credits. Match two symbols to win 20 credits, three symbols for 50 credits, or four symbols for 100 credits!');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white flex items-center justify-center p-4">
      <div className="bg-purple-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-purple-700/50">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Lucky Slots
            </h1>
            <p className="text-purple-300 text-sm mt-1">Accessible Gaming for Everyone</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-3 rounded-full transition-all hover:bg-purple-700/50 hover:scale-105"
              aria-label="Show history"
            >
              <History size={24} />
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-full transition-all hover:scale-105 ${
                isMuted ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-green-500/80 hover:bg-green-600/80'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className={`bg-purple-900/50 p-6 rounded-xl mb-6 backdrop-blur-sm transition-all duration-300 ${
            showHistory ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}>
            <div className="flex justify-center gap-3 mb-6">
              {reels.map((symbol, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 bg-gradient-to-br from-white to-purple-100 text-3xl flex items-center justify-center rounded-lg shadow-inner transform transition-all duration-200 ${
                    isSpinning ? 'animate-bounce' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="img"
                  aria-label={`Reel ${index + 1}: ${symbol}`}
                >
                  {symbol}
                </div>
              ))}
            </div>

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

            <button
              onClick={spin}
              disabled={isSpinning || credits < 10}
              className={`w-full py-4 px-6 rounded-lg text-white font-bold transition-all transform hover:scale-105 disabled:hover:scale-100 ${
                isSpinning || credits < 10
                  ? 'bg-purple-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg'
              }`}
              aria-label={
                isSpinning
                  ? 'Spinning...'
                  : credits < 10
                  ? 'Not enough credits'
                  : 'Spin the reels'
              }
            >
              {isSpinning ? 'Spinning...' : 'Spin (10 credits)'}
            </button>
          </div>

          <div className={`absolute inset-0 bg-purple-900/50 p-6 rounded-xl backdrop-blur-sm transition-all duration-300 ${
            showHistory ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <h2 className="text-xl font-bold mb-4">Recent Spins</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {history.map((spin, index) => (
                <div key={index} className="flex items-center justify-between bg-purple-800/50 p-3 rounded-lg">
                  <div className="flex gap-2">
                    {spin.symbols.map((symbol, idx) => (
                      <div key={idx} className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
                        {symbol}
                      </div>
                    ))}
                  </div>
                  <span className={spin.win > 0 ? 'text-green-400' : 'text-red-400'}>
                    {spin.win > 0 ? `+${spin.win}` : '-10'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-purple-300 mt-6">
          <p className="mb-2">Press SPACE to spin</p>
          <div className="flex justify-center gap-4">
            <span>2️⃣ Match: 20 🎯</span>
            <span>3️⃣ Match: 50 🎯</span>
            <span>4️⃣ Match: 100 🎯</span>
          </div>
        </div>
      </div>
    </div>
  );
}