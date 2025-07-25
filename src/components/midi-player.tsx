import React, { useEffect } from 'react';
import { useNoteContext } from '@/contexts/note-context';
import { useWebAudioSynth } from '@/hooks/useWebAudioSynth';

export default function MidiPlayer() {
  const { notes, controller, savedPreference } = useNoteContext();
  const { playNotes, stopAll } = useWebAudioSynth(savedPreference);

  useEffect(() => {
    // console.log('play', notes)
    if (notes.length > 0) playNotes(notes) // add octave later for update but it causes lag for now
    else stopAll();
  }, [notes, playNotes, stopAll]);

  return (
    <div className="p-2 border border-foreground w-[120px] h-12 text-xs overflow-y-scroll">
      <p>{notes.length > 0 && `NOTE: ${notes}`}</p>
      <p>{controller && `CC: ${controller.number}`}</p>
      <p>{controller && `VAL ${controller.value}`}</p>
    </div>
  );
}
