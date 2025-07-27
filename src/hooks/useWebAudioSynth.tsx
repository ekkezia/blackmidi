import { MIDI_TYPE_STRING } from '@/config/config';
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
  const masterGainRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const feedbackRef = useRef<GainNode | null>(null);
  const currentWaveType = useRef<OscillatorType>('sawtooth');

  // 🧱 Setup audio context and nodes - ONLY ONCE
  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.5;
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // Create delay effect
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.0; // Default delay
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3; // Default feedback
    
    // Connect delay chain: delay -> feedback -> delay (feedback loop)
    delay.connect(feedback);
    feedback.connect(delay);
    
    // Delay output goes to master gain
    delay.connect(masterGain);
    
    delayRef.current = delay;
    feedbackRef.current = feedback;

    console.log('Audio context initialized with delay effect');

    const unlockAudio = async () => {
      if (ctx.state === 'suspended') {
        await ctx.resume();
        console.log('AudioContext unlocked');
      }
    };
    
    window.addEventListener('click', unlockAudio, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudio);
      stopAll();
      ctx.close();
    };
  }, []);

  // 🎚️ Update both gain and delay
  useEffect(() => {
    console.log('=== PREFERENCE UPDATE DEBUG ===');
    console.log('Raw preference object:', preference);

    // Update GAIN
    if (masterGainRef.current && typeof preference.gain === 'number' && !isNaN(preference.gain)) {
      try {
        const mappedGain = map(preference.gain, -127, 127, 0.1, 1.0);
        masterGainRef.current.gain.value = mappedGain;
        console.log('✅ Updated master gain:', preference.gain, '→', mappedGain);
      } catch (error) {
        console.log('❌ Error updating gain:', error);
      }
    }

    // Update DELAY
    if (delayRef.current && typeof preference.delay === 'number' && !isNaN(preference.delay)) {
      try {
        const mappedDelay = map(preference.delay, -127, 127, 0, 1.0); // 0.05s to 1s delay
        delayRef.current.delayTime.value = mappedDelay;
        console.log('✅ Updated delay time:', preference.delay, '→', mappedDelay, 'seconds');
      } catch (error) {
        console.log('❌ Error updating delay:', error);
      }
    }

    // Update FEEDBACK (using gain for now, but could be separate)
    if (feedbackRef.current && typeof preference.gain === 'number' && !isNaN(preference.gain)) {
      try {
        const mappedFeedback = map(preference.gain, -127, 127, 0, 0.6); // Conservative feedback
        feedbackRef.current.gain.value = mappedFeedback;
        console.log('✅ Updated feedback:', preference.gain, '→', mappedFeedback);
      } catch (error) {
        console.log('❌ Error updating feedback:', error);
      }
    }

    // Update MIDI TYPE (waveform)
    if (typeof preference.midiType === 'number' && !isNaN(preference.midiType)) {
      try {
        // Map MIDI type to waveform
        const waveIndex = Math.abs(preference.midiType) % MIDI_TYPE_STRING.length;
        const newWaveType = MIDI_TYPE_STRING[waveIndex];
        
        currentWaveType.current = newWaveType;
        console.log('✅ Updated wave type:', preference.midiType, '→', newWaveType, `(index: ${waveIndex})`);
        
        // Update all currently playing oscillators
        for (const midi in activeOscillators.current) {
          const { osc } = activeOscillators.current[+midi];
          try {
            osc.type = newWaveType;
          } catch (e) {
            // Oscillator might be in a state where type can't be changed
            console.log('Could not update oscillator type for MIDI', midi);
          }
        }
        
        console.log('✅ Updated', Object.keys(activeOscillators.current).length, 'active oscillators to', newWaveType);
      } catch (error) {
        console.log('❌ Error updating MIDI type:', error);
      }
    }

    console.log('=== END DEBUG ===');
  }, [preference]);

  const stopAll = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    for (const midi in activeOscillators.current) {
      const { osc, gain } = activeOscillators.current[+midi];
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.stop(ctx.currentTime + 0.05);
      } catch (e) {
        // Oscillator might already be stopped
      }
    }
    activeOscillators.current = {};
  };

  const playNotes = async (midiArray: number[], octave: number = 0) => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    
    if (!ctx || !masterGain) {
      console.error('Audio not initialized');
      return;
    }
  
    if (ctx.state === 'suspended') {
      await ctx.resume();
      console.log("AudioContext resumed");
    }

    console.log('Playing notes:', midiArray, 'Master gain:', masterGain.gain.value, 'Individual note gain: 0.1');
  
    const incomingNotes = new Set(midiArray.map(midi => midi + octave * 12));
    const currentlyPlaying = Object.keys(activeOscillators.current).map(Number);
  
    // Stop notes that are no longer being played
    for (const midi of currentlyPlaying) {
      if (!incomingNotes.has(midi)) {
        const activeOsc = activeOscillators.current[midi];
        if (activeOsc) {
          try {
            activeOsc.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
            activeOsc.osc.stop(ctx.currentTime + 0.05);
            delete activeOscillators.current[midi];
          } catch (e) {
            delete activeOscillators.current[midi];
          }
        }
      }
    }
  
    // Start new notes
    for (const midi of midiArray) {
      const adjustedMidi = midi + octave * 12;
      if (!activeOscillators.current[adjustedMidi]) {
        const freq = 440 * Math.pow(2, (adjustedMidi - 69) / 12);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
  
        osc.type = currentWaveType.current ?? 'sine';
        osc.frequency.value = freq;
        gain.gain.value = 0.1; // Reduced individual note volume so master gain has more effect
  
        // Connect to both direct output (dry) and delay (wet)
        osc.connect(gain);
        if (masterGainRef.current) {
          gain.connect(masterGainRef.current); // Direct/dry signal
        }
        if (delayRef.current) {
          gain.connect(delayRef.current); // Delayed/wet signal
        }
  
        osc.start();
        console.log(`Started note: MIDI ${adjustedMidi}, Freq: ${freq.toFixed(2)}Hz`);
  
        activeOscillators.current[adjustedMidi] = { osc, gain };
      }
    }
  };
  
  return { playNotes, stopAll };
}