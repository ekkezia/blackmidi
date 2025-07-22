import { useEffect, useRef } from 'react';

type ActiveOsc = {
  osc: OscillatorNode;
  gain: GainNode;
};

export function useWebAudioSynth() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillators = useRef<Record<number, ActiveOsc>>({});

  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const unlockAudio = () => {
      if (ctx.state === 'suspended') ctx.resume();
    };
    window.addEventListener('click', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      stopAll(); // stop notes on cleanup
      ctx.close();
    };
  }, []);

  const stopAll = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    for (const midi in activeOscillators.current) {
      const { osc, gain } = activeOscillators.current[+midi];
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.05);
    }
    activeOscillators.current = {};
  };

  const playNotes = (midiArray: number[], octave: number = 0) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    const incomingNotes = new Set(midiArray);
    const currentlyPlaying = Object.keys(activeOscillators.current).map(Number);

    // 🔴 Stop notes that are no longer in the array
    for (const midi of currentlyPlaying) {
      if (!incomingNotes.has(midi)) {
        const { osc, gain } = activeOscillators.current[midi + (octave * 12)];
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.stop(ctx.currentTime + 0.05);
        delete activeOscillators.current[midi + (octave * 12)];
      }
    }

    // 🟢 Start new notes that are not already playing
    for (const midi of midiArray) {
      if (!activeOscillators.current[midi]) {
        const freq = 440 * Math.pow(2, (midi - 69) / 12); // MIDI to Hz
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth'; // You can change to 'square', 'triangle', etc.
        osc.frequency.value = freq;
        gain.gain.value = 0.15;

        osc.connect(gain).connect(ctx.destination);
        osc.start();

        activeOscillators.current[midi] = { osc, gain };
      }
    }
  };

  return { playNotes, stopAll };
}
