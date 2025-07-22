import React, { createContext, useContext, useState, ReactNode } from 'react';

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
};

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [showHelp, setShowHelp] = useState<boolean>(true);
  const [inputType, setInputType] = useState<'midi' | 'keyboard'>('keyboard');
  const [notes, setNotes] = useState<number[]>([]);
  const [controller, setController] = useState({ number: 0, value: 0 });
  const [lock, setLock] = useState(false);
  const [octave, setOctave] = useState(0);

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
    <NoteContext.Provider value={{ showHelp, setShowHelp, inputType, setInputType, notes, addNote, removeNote, controller, setController, lock, setLock, octave, increaseOctave, decreaseOctave }}>
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
