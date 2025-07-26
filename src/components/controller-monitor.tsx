import React, { useEffect, useState } from 'react';
import { useNoteContext } from '@/contexts/note-context';
import { cn, map } from '@/utils/utils';
import { MIDI_TYPE_STRING } from '@/config/config';
import { useConfig } from '@/hooks/useConfig';

export default function ControllerMonitor() {
  const { controller, setSavedPreference, savedPreference } = useNoteContext();
  const { controllerConfig } = useConfig();
  const [id, setId] = useState(0)
  
  useEffect(() => {
    // midi type
    const knobMatch = controllerConfig?.knobs.find(item => item.midiNote === controller.number);

    if (knobMatch?.for !== 'midiType') return;
    const mappedValue = Math.floor(map(controller.value, -127, 127, 0, 254));
    const midiTypeIdx = mappedValue % MIDI_TYPE_STRING.length;
    setId(midiTypeIdx)
  }, [controller.number, controller.value, controllerConfig?.knobs, setSavedPreference]);

  return (
    <div className="p-2 border border-foreground w-[120px] h-12 text-xs overflow-y-scroll">
          <ul className='h-[18px] overflow-hidden uppercase'>
            {savedPreference.midiType}
          </ul>
        <p>{controller && `CC: ${controller.number}`}</p>
        <p>{controller && `VAL ${controller.value}`}</p>
    </div>
  );
}
