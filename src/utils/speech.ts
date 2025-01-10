// Speech utility functions
export const speak = (text: string, rate = 1) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
};

export const cancelSpeech = () => {
  window.speechSynthesis.cancel();
};