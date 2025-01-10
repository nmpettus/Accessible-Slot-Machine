export interface GameResult {
  matches: number;
  winAmount: number;
  message: string;
}

export const SYMBOLS = ['🍎', '🍋', '🍒', '💎', '🌟', '7️⃣'];

export const calculateWin = (reels: string[]): GameResult => {
  const symbolCounts = new Map<string, number>();
  reels.forEach(symbol => {
    symbolCounts.set(symbol, (symbolCounts.get(symbol) || 0) + 1);
  });

  const maxMatches = Math.max(...symbolCounts.values());
  
  switch (maxMatches) {
    case 4:
      return {
        matches: 4,
        winAmount: 100,
        message: `Mega Jackpot! Four ${reels[0]} symbols! You won 100 credits!`
      };
    case 3:
      return {
        matches: 3,
        winAmount: 50,
        message: `Jackpot! Three ${[...symbolCounts.entries()].find(([_, count]) => count === 3)?.[0]} symbols! You won 50 credits!`
      };
    case 2:
      const symbol = [...symbolCounts.entries()].find(([_, count]) => count === 2)?.[0];
      return {
        matches: 2,
        winAmount: 20,
        message: `Nice! Two ${symbol} symbols! You won 20 credits!`
      };
    default:
      return {
        matches: 0,
        winAmount: 0,
        message: 'Try again!'
      };
  }
};