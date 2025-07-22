import { cn, map } from '@/utils/utils';
import { useNoteContext } from '@/contexts/note-context';
import MidiPlayer from './midi-player';
import { useEffect, useState } from 'react';
import { Tooltip } from './tooltip';
import {  } from './input-selector';
import { useConfig } from '@/hooks/useConfig';
import HelpButton from './help-button';
import LockButton from './lock-button';

export default function ControllerBoard({ className }: { className?: string }) {
  const { showHelp, controller } = useNoteContext();
  const { controllerConfig } = useConfig();
  const [mappedValue, setMappedValue] = useState<{ [key: string] : number }>({});
  const [mappedKnobValue, setMappedKnobValue] = useState(0); // visual UI

  useEffect(() => {
    // console.log('knob',mappedValue, mappedKnobValue);
  }, [mappedKnobValue, mappedValue])
  useEffect(() => {
    const knobMatch = controllerConfig?.knobs.find(item => item.midiNote === controller.number);
  
    if (knobMatch?.for) {
      setMappedValue(prev => ({
        ...prev,
        [knobMatch.for!]: map(controller.value, 0, 127, -127, 127),
      }));
    }
  
    setMappedKnobValue(map(controller.value, 0, 127, -127, 127));
  }, [controller, controllerConfig?.knobs]);
    
  if (!controllerConfig) return null;
  return (
    <div className={cn("flex items-center justify-between gap-8 px-8", className, showHelp ? 'opacity-50 blur-[1px] pointer-events-none' : 'pointer-events-block opacity-100')}>
        <div className="h-full flex flex-col gap-4">
          <MidiPlayer />
        </div>

      <div className="flex gap-8 h-fit items-center">
      {/* Controller Knob */}
      <div className="flex place-items-center gap-8">
      {controllerConfig.knobs.map(({ midiNote, label, for: knobFor }) => (
  knobFor && (
            <Tooltip content={label ?? ''} key={`knob-${label}`}>            
              <div
                id={`knob_${knobFor}_${midiNote}`}
                className="rounded-4xl w-8 h-8 border border-foreground relative transition-duration-300"
                style={{
                  transform: `rotate(${mappedValue[knobFor] ?? 0}deg)`
                }}
              >
                <div className="border-foreground border-r border-l border-b h-4 top-0 left-[50%] translate-x-[-50%] w-1 absolute" />
              </div>
            </Tooltip>
          )
        ))}
      </div>
      </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <HelpButton />
              <LockButton />
              {/* <OctaveButton /> */}
              {/* <OctaveButton isUp /> */}
              {/* <OctaveLogger /> */}
            </div>


    </div>
  );
}
