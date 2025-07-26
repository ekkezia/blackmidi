import { cn, map } from '@/utils/utils';
import { useNoteContext } from '@/contexts/note-context';
import MidiPlayer from './keyboard-monitor';
import { useEffect, useState } from 'react';
import { Tooltip } from './tooltip';
import {  } from './input-selector';
import { useConfig } from '@/hooks/useConfig';
import HelpButton from './help-button';
import LockButton from './lock-button';
import SaveSettingsButton from './save-button';
import ControllerMonitor from './controller-monitor';
import { MIDI_TYPE_STRING } from '@/config/config';

// The knobs controls audio effects like reverb, delay, distortion, and gain.
export default function ControllerBoard({ className }: { className?: string }) {
  const { showHelp, controller, savedPreference, inputType, setSavedPreference } = useNoteContext();
  const { controllerConfig } = useConfig();
  const [mappedValue, setMappedValue] = useState<{ [key: string] : number }>({});
  // const [mappedKnobValue, setMappedKnobValue] = useState(0); // visual UI

  useEffect(() => {
    // on first load, use the value from saved preference
      setMappedValue({
        // reverb: savedPreference.reverb,
        delay: savedPreference.delay,
        // distortion: savedPreference.distortion,
        gain: savedPreference.gain,
      })
  }, [savedPreference]);

  useEffect(() => {
    const knobMatch = controllerConfig?.knobs.find(item => item.midiNote === controller.number);
  
    if (knobMatch?.for) {
      const effect = knobMatch.for;
  
      if (effect === 'midiType') {
        setMappedValue(prev => ({
          ...prev,
          midiType: map(controller.value, 0, 127, -127, 127),
        }));
  
        // const mappedValue = Math.floor(map(controller.value, 0, 127, -127, 127));
        const midiTypeIdx = Math.floor(controller.value / 2) % MIDI_TYPE_STRING.length;
        console.log('mappedValue', midiTypeIdx);

        setSavedPreference(prev => ({
          ...prev,
          midiType: MIDI_TYPE_STRING[midiTypeIdx] ??  'unknown',
        }));
      } else {
        setMappedValue(prev => ({
          ...prev,
          [effect]: map(controller.value, 0, 127, -127, 127),
        }));
  
        setSavedPreference(prev => ({
          ...prev,
          [effect]: map(controller.value, 0, 127, -127, 127),
        }));
      }
    }
  }, [controller, controllerConfig?.knobs, setSavedPreference]);


    if (!controllerConfig) return null;
  return (
    <div className={cn("flex items-center justify-between gap-8 px-8", className, showHelp ? 'opacity-50 blur-[1px] pointer-events-none' : 'pointer-events-block opacity-100')}>
        <div className="h-full flex flex-col gap-4">
          <ControllerMonitor />
        </div>

      <div className="flex gap-8 h-fit items-center">
      {/* Controller Knob */}
      <div className={cn("flex place-items-center gap-8", inputType === 'midi' ? 'opacity-100 cursor-crosshair' : 'opacity-20 cursor-not-allowed')}>
      {controllerConfig.knobs.map(({ midiNote, label, for: knobFor }) => (
  knobFor && (
            <Tooltip content={inputType !== 'midi' ? 'Only w/ MIDI input' :label ?? ''} key={`knob-${label}`}>            
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
              <SaveSettingsButton />
              {/* <OctaveButton /> */}
              {/* <OctaveButton isUp /> */}
              {/* <OctaveLogger /> */}
            </div>


    </div>
  );
}
