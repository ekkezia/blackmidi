'use client';

import { useNoteContext } from '@/contexts/note-context';
import { useMIDIInput } from '@/hooks/useMIDIInput';
import React, { useEffect, useRef } from 'react';
import { QWERTY_KEYS } from '../config/config';

export const MidiLogger = () => {
  const { addNote, removeNote, inputType, setController } = useNoteContext();
  const hasAutoSwitched = useRef(false);
  const pressedKeys = useRef<Set<string>>(new Set());

  useMIDIInput(
    (note) => {
      addNote(note);
    },
    (note) => {
      removeNote(note);
    },
    (controller, value) => {
      setController({ number: controller, value });
    },
    () => {
      // ✅ Only auto-switch to MIDI once
      if (!hasAutoSwitched.current) {
        // setInputType('midi');
        hasAutoSwitched.current = true;
      }
    },
    inputType,
  );

  useEffect(() => {
    if (inputType !== 'keyboard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!pressedKeys.current.has(key) && key in QWERTY_KEYS) {
        pressedKeys.current.add(key);
        const midi = QWERTY_KEYS[key];
        addNote(midi);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (pressedKeys.current.has(key)) {
        pressedKeys.current.delete(key);
        const midi = QWERTY_KEYS[key];
        removeNote(midi);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [addNote, removeNote, inputType]);


  return (
    <></>
  );
};
