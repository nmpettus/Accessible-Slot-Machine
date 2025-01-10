let audioContext: AudioContext | null = null;

const initAudio = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
};

const createOscillator = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gain = 0.7
) => {
  const ctx = initAudio();
  if (!ctx) return null;
  
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  
  return { oscillator, gainNode };
};

export const playSpinStartSound = () => {
  const ctx = initAudio();
  if (!ctx) return;

  const frequencies = [440, 523, 659];
  frequencies.forEach((freq, i) => {
    setTimeout(() => {
      const sound = createOscillator(freq, 0.15, 'square', 0.5);
      if (!sound) return;
      sound.oscillator.start();
      sound.oscillator.stop(ctx.currentTime + 0.15);
    }, i * 100);
  });
};

export const playReelSpinSound = () => {
  const sound = createOscillator(220, 0.1, 'sawtooth', 0.3);
  if (!sound) return;
  
  sound.oscillator.start();
  sound.oscillator.stop(audioContext!.currentTime + 0.1);
};

export const playWinSound = (matches: number) => {
  const ctx = initAudio();
  if (!ctx) return;

  const frequencies = matches === 3 
    ? [523.25, 659.25, 783.99, 1046.50] // Major chord for jackpot
    : [440, 554.37, 659.25]; // Minor chord for two matches
    
  frequencies.forEach((freq, i) => {
    setTimeout(() => {
      const sound = createOscillator(freq, 0.3, 'sine', 0.6);
      if (!sound) return;
      sound.oscillator.start();
      sound.oscillator.stop(ctx.currentTime + 0.3);
    }, i * 150);
  });
};

export const playLoseSound = () => {
  const sound = createOscillator(196, 0.4, 'triangle', 0.5);
  if (!sound) return;
  
  sound.oscillator.start();
  sound.oscillator.stop(audioContext!.currentTime + 0.4);
};