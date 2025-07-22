import { useNoteContext } from '@/contexts/note-context';
import React from 'react';

type InputMode = 'midi' | 'keyboard';

export const InputSelector: React.FC = () => {
  const { inputType, setInputType } = useNoteContext();
  return (
    <div className="mb-4 border border-foreground px-2 py-1 text-xs">
      <span>IN:</span>
      <select
        id="inputMode"
        value={inputType}
        onChange={(e) => setInputType(e.target.value as InputMode)}
        className=""
      >
        <option value="midi">MIDI</option>
        <option value="keyboard">KEYBOARD</option>
      </select>
    </div>
  );
};
