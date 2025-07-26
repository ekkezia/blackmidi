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
  
  const effectChain = useRef<{
    delay: DelayNode;
    feedback: GainNode;
    masterGain: GainNode;
    // Reverb related nodes are commented out for simplicity,
    // as loading an impulse response is needed for them to work.
    // If you want reverb, you'll need to add that logic.
    // reverb: ConvolverNode;
    // reverbWet: GainNode;
    // reverbDry: GainNode;
  }>(null!);

  // 🎚️ Update effects based on preference
  useEffect(() => {
    if (!audioCtxRef.current || !effectChain.current) return; // Add check for effectChain.current

    // Update delay time
    if (effectChain.current.delay) {
      // Map delay from preference range to a reasonable time (e.g., 0 to 0.8 seconds)
      effectChain.current.delay.delayTime.value = map(preference.delay, -127, 127, 0, 0.8);
      // Feedback gain for delay
      effectChain.current.feedback.gain.value = 0.5; // Adjustable feedback amount
    }

    // Update master gain
    if (effectChain.current.masterGain) {
      // Map gain from preference range to a reasonable audio gain (0 to 0.7)
      effectChain.current.masterGain.gain.value = map(preference.gain, -127, 127, 0, 0.7);
    }
  }, [preference]);

  // 🧱 Setup audio context and nodes
  useEffect(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    // You would typically load an impulse response for a ConvolverNode
    // const reverbWet = ctx.createGain();
    // const reverbDry = ctx.createGain();
    // const reverb = ctx.createConvolver();

    const delay = ctx.createDelay();
    delay.delayTime.value = 0; // Initial delay time

    const feedback = ctx.createGain();
    feedback.gain.value = 0; // Initial feedback amount

    const masterGain = ctx.createGain();
    masterGain.gain.value = map(preference.gain, -127, 127, 0, 0.7); // Initial master gain
    
    // Connect the masterGain to the speakers
    masterGain.connect(ctx.destination);

    // Setup the delay feedback loop
    delay.connect(feedback);
    feedback.connect(delay); // Feedback loop for delay

    effectChain.current = {
      delay,
      feedback,
      masterGain,
      // reverb, reverbWet, reverbDry are commented out for now
    };
    
    // Unlock audio context on user interaction for browsers that require it
    const unlockAudio = () => {
      if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          console.log('AudioContext resumed successfully');
        }).catch(e => console.error('Error resuming AudioContext:', e));
      }
    };
    window.addEventListener('click', unlockAudio, { once: true });
    window.addEventListener('keydown', unlockAudio, { once: true }); // Also unlock on keydown

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      stopAll();
      ctx.close().then(() => {
        console.log('AudioContext closed successfully');
      }).catch(e => console.error('Error closing AudioContext:', e));
    };
  }, []); // Empty dependency array means this runs once on mount

  const stopAll = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    for (const midi in activeOscillators.current) {
      const { osc, gain } = activeOscillators.current[+midi];
      // Smoothly ramp down the gain to avoid clicks
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      // Stop the oscillator after the gain ramp
      osc.stop(ctx.currentTime + 0.05);
    }
    activeOscillators.current = {}; // Clear active oscillators
  };

  const playNotes = (midiArray: number[], octave: number = 0) => {
    if (!audioCtxRef.current || !effectChain.current) return;

    const ctx = audioCtxRef.current;
    const { delay, masterGain, feedback } = effectChain.current;
  
    const incomingNotes = new Set(midiArray.map(midi => midi + octave * 12)); // Calculate absolute MIDI notes
    const currentlyPlaying = Object.keys(activeOscillators.current).map(Number);
  
    // Stop notes that are no longer in the incoming midiArray
    for (const midi of currentlyPlaying) {
      if (!incomingNotes.has(midi)) {
        const { osc, gain } = activeOscillators.current[midi]; // Use the direct midi key
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        osc.stop(ctx.currentTime + 0.05);
        delete activeOscillators.current[midi];
      }
    }
  
    // Play new notes
    for (const midi of incomingNotes) {
      if (!activeOscillators.current[midi]) {
        const freq = 440 * Math.pow(2, (midi - 69) / 12); // Use absolute midi for frequency calculation
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
  
        osc.type = 'sawtooth'; // Or 'sine', 'square', 'triangle'
        osc.frequency.value = freq;
        gain.gain.value = 0.15; // Initial gain for each note
  
        // Connect the oscillator through the effects chain
        // Dry signal path: osc -> gain -> masterGain
        osc.connect(gain);
        gain.connect(masterGain); 

        // Wet signal path (for delay): osc -> gain -> delay -> masterGain (via feedback loop)
        // You can adjust the send amount to the delay
        const delaySendGain = ctx.createGain();
        delaySendGain.gain.value = 0.5; // Amount of signal sent to delay
        gain.connect(delaySendGain);
        delaySendGain.connect(delay);
        
        // Connect the delay output to the master gain
        // This connection is crucial for hearing the delayed sound
        delay.connect(masterGain); 
        // Also connect the feedback loop to the delay
        feedback.connect(delay); // Ensure feedback feeds back into delay
        
        osc.start();
        activeOscillators.current[midi] = { osc, gain };
      }
    }
  };
  
  return { playNotes, stopAll };
}