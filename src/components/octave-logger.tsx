import React from 'react';
import { useNoteContext } from '@/app/contexts/note-context';

export default function OctaveLogger() {
  const { octave } = useNoteContext();

  return (
    <div className="p-2 border border-foreground w-[120px] h-12 text-xs overflow-y-hidden">
      <p>{`OCTAVE: ${octave}`}</p>
    </div>
  );
}
