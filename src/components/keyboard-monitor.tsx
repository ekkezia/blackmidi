import React, { useEffect } from 'react';
import { useNoteContext } from '@/contexts/note-context';
import { useWebAudioSynth } from '@/hooks/useWebAudioSynth';

export default function KeyboardMonitor() {
  const { notes, controller, preference } = useNoteContext();
  const { playNotes, stopAll } = useWebAudioSynth(preference);

  // TODO: move this somewhere
  useEffect(() => {
    // console.log('play', notes)
    if (notes.length > 0) playNotes(notes) // add octave later for update but it causes lag for now
    else stopAll();
  }, [notes, playNotes, stopAll]);

  return (
    <div className="p-2 border border-foreground w-[120px] h-12 text-xs overflow-y-scroll">
      <p>{notes.length > 0 && `NOTE: ${notes}`}</p>
      <p>{controller && notes.length <= 0 && `CC: ${controller.number}`}</p>
      <p>{controller && `VAL ${controller.value}`}</p>
    </div>
  );
}
