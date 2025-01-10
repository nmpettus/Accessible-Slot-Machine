import confetti from 'canvas-confetti';

export const fireConfetti = (matches: number) => {
  const duration = matches === 4 ? 5000 : matches === 3 ? 3000 : 1500;
  const particleCount = matches === 4 ? 200 : matches === 3 ? 100 : 50;

  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount,
  };

  const fire = (particleRatio: number, opts: confetti.Options) => {
    confetti({
      ...defaults,
      ...opts,
      origin: { x: Math.random(), y: Math.random() * 0.3 + 0.5 },
      particleCount: Math.floor(particleCount * particleRatio),
    });
  };

  const interval = setInterval(() => {
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, 250);

  setTimeout(() => {
    clearInterval(interval);
  }, duration);
};