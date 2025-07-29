// Controller monitor is located at the top of the screen
import React from 'react';
import { useNoteContext } from '@/contexts/note-context';
import { MIDI_TYPE_STRING } from '@/config/config';
import { map } from '@/utils/utils';

export default function ControllerMonitor() {
  const { controller, preference } = useNoteContext();
  
  // Safely get the MIDI type string
  const getMidiTypeString = () => {
    if (preference.midiType === null || 
        preference.midiType === undefined || 
        isNaN(preference.midiType)) {
      return 'UNKNOWN';
    } else {
      const mappedMidiType = map(preference.midiType, -127, 127, 0, 127)
      const midiTypeIdx = Math.floor(mappedMidiType / 2) % MIDI_TYPE_STRING.length;
      return MIDI_TYPE_STRING[midiTypeIdx] || 'UNKNOWN';
    }
  };

  return (
    <div className="p-2 border border-foreground w-[120px] h-12 text-xs overflow-y-scroll">
      <ul className='h-[18px] overflow-hidden uppercase'>
        {getMidiTypeString()}
      </ul>
      <p>{controller ? `CC: ${controller.number}` : 'No Controller'}</p>
      <p>{controller ? `VAL ${controller.value}` : ''}</p>
    </div>
  );
}