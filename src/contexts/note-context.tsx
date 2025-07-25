import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type TPreference = {
  scrollV: number;
  hue: number;
  grayscale: number;
  invert: number;
  reverb: number;
  delay: number;
  distortion: number;
  gain: number;
}

type NoteContextType = {
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  inputType: 'midi' | 'keyboard';
  setInputType: (type: 'midi' | 'keyboard') => void;
  notes: number[];
  addNote: (note: number, isArray?: boolean) => void;
  removeNote: (note: number) => void;
  octave: number;
  increaseOctave: (octave: number) => void;
  decreaseOctave: (octave: number) => void;
  controller: { number: number, value: number };
  setController: (controller: { number: number, value: number }) => void;
  lock: boolean;
  setLock: (show: boolean) => void;
  hasSaved: boolean;
  setHasSaved: (hasSaved: boolean) => void;
  savedPreference: TPreference;
  setSavedPreference: React.Dispatch<React.SetStateAction<TPreference>>;
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [showHelp, setShowHelp] = useState<boolean>(true);
  const [inputType, setInputType] = useState<'midi' | 'keyboard'>('midi');
  const [notes, setNotes] = useState<number[]>([]);
  const [controller, setController] = useState({ number: 0, value: 0 });
  const [lock, setLock] = useState(false);
  const [octave, setOctave] = useState(0);

  const [hasSaved, setHasSaved]= useState(false); // save to local storage
  const [savedPreference, setSavedPreference] = useState({ scrollV: 0, hue: 0, grayscale: 0, invert: 0, reverb: 0, delay: 0, distortion: 0, gain: 0 }); // TO BE CHANGED to just preference

  useEffect(() => {
    // on first load, check local storage for saved preferences
    const savedScrollV = localStorage.getItem('scrollV');
    const savedHue = localStorage.getItem('hue');
    const savedGrayscale = localStorage.getItem('grayscale');
    const savedInvert = localStorage.getItem('invert');
    const savedReverb = localStorage.getItem('reverb');
    const savedDelay = localStorage.getItem('delay');
    const savedDistortion = localStorage.getItem('distortion');
    const savedGain = localStorage.getItem('gain');

    setSavedPreference({
      scrollV: savedScrollV ? parseInt(savedScrollV, 10) : 0,
      hue: savedHue ? parseInt(savedHue, 10) : 0,
      grayscale: savedGrayscale ? parseInt(savedGrayscale, 10) : 0,
      invert: savedInvert ? parseInt(savedInvert, 10) : 0,
      reverb: savedReverb ? parseInt(savedReverb, 10) : 0,
      delay: savedDelay ? parseInt(savedDelay, 10) : 0,
      distortion: savedDistortion ? parseInt(savedDistortion, 10) : 0,
      gain: savedGain ? parseInt(savedGain, 10) : 0,
    });
  }, []);

  useEffect(() => {
    if (hasSaved) {
      setTimeout(() => {
        setHasSaved(false)
      }, 500);
    }
  }, [hasSaved])

  const addNote = (note: number, isArray = true) => {
    if (isArray) {
      setNotes((prev) => (prev.includes(note) ? prev : [...prev, note]));
    } else {
      setNotes([note]);
    }
  };

  const removeNote = (note: number) => {
      setNotes((prev) => prev.filter((n) => n !== note));
  };

  const increaseOctave = (octave: number) => {
    if (octave < 3)
      setOctave((prev) => prev + 1);
  };

  const decreaseOctave = (octave: number) => {
    if (octave > -3)
      setOctave((prev) => prev - 1);
  };


  return (
    <NoteContext.Provider value={{ showHelp, setShowHelp, inputType, setInputType, notes, addNote, removeNote, controller, setController, lock, setLock, octave, increaseOctave, decreaseOctave, savedPreference, setSavedPreference, hasSaved, setHasSaved }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = (): NoteContextType => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};

const startNote = 48;
const referenceNotes = ['C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3', 'Ab3', 'A3', 'Bb3', 'B3'];
export const convertNote = (note: number) => {
  const index = note - startNote;
  if (index >= 0 && index < referenceNotes.length) {
    return referenceNotes[index];
  }
  return null;
};
