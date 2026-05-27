let audioCtx = null;

function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playTone({ frequency = 440, duration = 0.05, volume = 0.3, type = 'sine' } = {}) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export function playTick() {
  playTone({ frequency: 900, duration: 0.04, volume: 0.25, type: 'square' });
}

export function warmUp() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') ctx.resume();
}

const RARITY_REVEAL = {
  consumer:      { frequency: 220, duration: 0.3, volume: 0.2 },
  industrial:    { frequency: 330, duration: 0.4, volume: 0.25 },
  milspec:       { frequency: 440, duration: 0.5, volume: 0.3 },
  restricted:    { frequency: 550, duration: 0.6, volume: 0.35 },
  classified:    { frequency: 660, duration: 0.8, volume: 0.4 },
  covert:        { frequency: 880, duration: 1.0, volume: 0.45 },
  extraordinary: { frequency: 1100, duration: 1.5, volume: 0.5 },
};

export function playReveal(rarity) {
  const config = RARITY_REVEAL[rarity] ?? RARITY_REVEAL.consumer;
  playTone({ ...config, type: 'sine' });
  setTimeout(() => {
    playTone({ frequency: config.frequency * 1.5, duration: config.duration * 0.6, volume: config.volume * 0.4, type: 'triangle' });
  }, 80);
}
