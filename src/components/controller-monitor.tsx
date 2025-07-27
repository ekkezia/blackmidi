import React from 'react';
import { useNoteContext } from '@/contexts/note-context';
import { MIDI_TYPE_STRING } from '@/config/config';

export default function ControllerMonitor() {
  const { controller, savedPreference } = useNoteContext();
  
  // Safely get the MIDI type string
  const getMidiTypeString = () => {
    if (savedPreference.midiType === null || 
        savedPreference.midiType === undefined || 
        isNaN(savedPreference.midiType)) {
      return 'SINE';
    }
    return MIDI_TYPE_STRING[savedPreference.midiType] || 'UNKNOWN';
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