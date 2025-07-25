import { TPreference } from '@/contexts/note-context';
import { map } from '@/utils/utils';
import { useEffect, useRef } from 'react';

type ActiveOsc = {
  osc: OscillatorNode;
  gain: GainNode;
};

export function useWebAudioSynth(preference: TPreference) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscillators = useRef<Record<number, ActiveOsc>>({});

  function makeDistortionCurve(amount = 50) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }
  
  const effectChain = useRef<{
    delay: DelayNode;
    feedback: GainNode;
    masterGain: GainNode;
    reverb: ConvolverNode;
    reverbWet: GainNode;
    reverbDry: GainNode;
  }>(null!);

  // 🎚️ Update effects based on preference
  useEffect(() => {
    if (!audioCtxRef.current) return;

    // console.log('use webaudiosynth preference', preference);

    // Update reverb gain
        if (effectChain.current.reverbWet && effectChain.current.reverbDry) {
          const wet = map(preference.reverb, -127, 127, 0, 1);
          effectChain.current.reverbWet.gain.value = wet;
          effectChain.current.reverbDry.gain.value = 1 - wet;
        }
              
    // Update delay time
    if (effectChain.current.delay) {
      effectChain.current.delay.delayTime.value = map(preference.delay, -127, 127, 0, 1);
      effectChain.current.feedback.gain.value = 0.4; // Set feedback gain to a fixed value for now
      // console.log('updating delay time', preference.delay, effectChain.current.delay.delayTime.value);
    }

    // Update master gain
    if (effectChain.current.masterGain) {
      effectChain.current.masterGain.gain.value = map(preference.gain, -127, 127, 0, 0.95);
      // console.log('updating master gain', preference.gain);
    }
  }, [preference]);

  // 🧱 Setup audio context and nodes
  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const reverbWet = ctx.createGain();
    const reverbDry = ctx.createGain();

    const reverb = ctx.createConvolver();

    const delay = ctx.createDelay();
    delay.delayTime.value = 0;

    const feedback = ctx.createGain();
    feedback.gain.value = 0;

    const masterGain = ctx.createGain();
    masterGain.gain.value = map(preference.gain, -127, 127, 0, 0.95);
    masterGain.connect(ctx.destination);

    // Connect delay/feedback loop (optional to use later)
    delay.connect(feedback);
    feedback.connect(delay);

    effectChain.current = {
      delay,
      feedback,
      masterGain,
      reverb,
      reverbWet,
      reverbDry,
    };
    
    const unlockAudio = () => {
      if (ctx.state === 'suspended') ctx.resume();
    };
    window.addEventListener('click', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      stopAll();
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
  
    for (const midi of currentlyPlaying) {
      if (!incomingNotes.has(midi)) {
        const { osc, gain } = activeOscillators.current[midi + octave * 12];
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.stop(ctx.currentTime + 0.05);
        delete activeOscillators.current[midi + octave * 12];
      }
    }
  
    for (const midi of midiArray) {
      if (!activeOscillators.current[midi]) {
        const freq = 440 * Math.pow(2, (midi - 69) / 12);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
  
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        gain.gain.value = 0.15;
  
        // ✅ Connect using the shared delay chain
        const { delay, masterGain } = effectChain.current;
        osc.connect(gain);
        gain.connect(delay);
        delay.connect(masterGain);
  
        osc.start();
        activeOscillators.current[midi] = { osc, gain };
      }
    }
  };
  

  return { playNotes, stopAll };
}
