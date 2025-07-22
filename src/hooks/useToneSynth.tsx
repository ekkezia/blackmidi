// hooks/useToneSynth.ts
import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';

export function useToneSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const synthRef = useRef<Tone.PolySynth | null>(null);

  useEffect(() => {
    const startAudio = async () => {
      await Tone.start();
    };
  
    window.addEventListener("click", startAudio, { once: true });
    return () => window.removeEventListener("click", startAudio);
  }, []);
  
  const initSynth = () => {
    if (!synthRef.current) {
      synthRef.current = new Tone.PolySynth({
        maxPolyphony: 10, // or 8, 12 depending on how many you want
        voice: Tone.Synth
      }).toDestination();
    }
  };

  const playNote = async (midiOrArray: number | number[], duration = '8n', releaseDuration = 500) => {
    initSynth();

    // If this is a single note (not an array of multiple notes), release all other active voices first
    if (!Array.isArray(midiOrArray)) {
      synthRef.current!.releaseAll();
    }

    const notes = Array.isArray(midiOrArray)
      ? midiOrArray.map((midi) => Tone.Frequency(midi, 'midi').toNote())
      : [Tone.Frequency(midiOrArray, 'midi').toNote()];

      notes.forEach(note => synthRef.current!.triggerAttack(note, releaseDuration / 100));
      setIsPlaying(true);

        // Release after specified duration
      setTimeout(() => {
        notes.forEach(note => synthRef.current!.triggerRelease(note, releaseDuration / 100));
        setIsPlaying(false);
      }, releaseDuration);

  };

  const stopPlaying = (midiOrArray: number | number[]) => {
    if (!synthRef.current) return;

    const notes = Array.isArray(midiOrArray)
      ? midiOrArray.map((midi) => Tone.Frequency(midi, 'midi').toNote())
      : [Tone.Frequency(midiOrArray, 'midi').toNote()];

    synthRef.current!.triggerRelease(notes);
    setIsPlaying(false);
  };

  return { playNote, stopPlaying, isPlaying };
}
