import { cn } from '@/utils/utils';
import { black, leap, white } from '../config/config';
import { useNoteContext } from '@/contexts/note-context';
import KeyboardMonitor from './keyboard-monitor';
import { useMemo } from 'react';
import { Tooltip } from './tooltip';
import { InputSelector } from './input-selector';
import { useConfig } from '@/hooks/useConfig';
import { SLIDER_HEIGHT } from '@/hooks/useControllerEffect'; // Import the new hook

const KEY_WIDTH = 63;
const KEY_HEIGHT = 180;

interface KeyboardProps {
  className?: string;
}

export default function Keyboard({ className }: KeyboardProps) {
  const { showHelp, inputType, notes, addNote, removeNote, preference, setPreference } = useNoteContext();
  const { config, controllerConfig } = useConfig();
  
  const whiteKeys = useMemo(
    () => config?.filter((item) => white.includes(item.midiNote)) || [],
    [config]
  );
  
  const blackKeys = useMemo(
    () => config?.filter((item) => black.includes(item.midiNote)) || [],
    [config]
  );
  
  if (!controllerConfig || !config) return null;
  
  return (
    <div className={cn("flex items-center gap-8 px-8", className, showHelp ? 'opacity-50 blur-[1px] pointer-events-none' : 'pointer-events-auto opacity-100')}>
      <div className="h-full flex flex-col gap-4">
        <span>blackmidi</span>
        <KeyboardMonitor />
        <InputSelector />
      </div>

      <div className="flex gap-8 h-fit items-center">
        {/* Controller slider */}
        <div className={cn("flex flex-col gap-4 border py-1 px-4")} style={{ height: KEY_HEIGHT}}>
          <span className="text-xs text-foreground">STYLE</span>
          <div className="flex gap-8 items-center">
            {controllerConfig.sliders.map(({ midiNote, label, for: sliderFor }) => (
              <Tooltip content={inputType !== 'midi' ? 'Only w/ MIDI input' : `${midiNote} -> ${label}`} key={`slider-${midiNote}`}>            
                <div
                  id={`knob_${sliderFor}`}
                  className="relative w-[30px] h-[130px] flex items-center justify-center overflow-visible"
                >
                  <input
                    type="range"
                    min={0}
                    max={127}
                    step={1}
                    value={preference[sliderFor! as keyof typeof preference] ?? 0}
                    onChange={(e) => {                      
                      const newValue = parseInt(e.target.value, 10);
                      setPreference((prev) => ({
                        ...prev,
                        [sliderFor!]: newValue
                      }));
                    }}
                    className={cn("custom-vertical appearance-none absolute bg-transparent rotate-[-90deg]", inputType === 'keyboard' ? 'pointer-events-auto' : 'pointer-events-none')}
                    style={{
                      width: SLIDER_HEIGHT,
                    }}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* Piano Keys - unchanged */}
      <div className="relative w-[420px] h-40">
        {/* White Keys */}
        <div className="absolute bottom-0 left-0 flex">
          {whiteKeys.map(({ midiNote, title, label, qwerty }) => (
            <Tooltip content={title ?? ''} key={`key-${midiNote}`}>            
              <div
                id={`key_${midiNote}`}
                className={cn("piano-key white", "h-40 border-b border-t border-r first:border-l border-foreground bg-transparent active:opacity-60 flex items-center justify-start", "hover:bg-foreground items-end", notes.includes(Number(midiNote)) && 'bg-foreground border-white')}
                onClick={() => {
                  addNote(Number(midiNote), false);
                  setTimeout(() => {
                    removeNote(Number(midiNote))
                  }, 500);
                }}
                style={{
                  background: notes.includes(Number(midiNote)) ? `bg-foreground` : 'bg-background',
                  width: KEY_WIDTH,
                }}
              >
                <span className="rotate-0 text-xs ml-1">
                  {inputType === 'midi' ? label : qwerty}
                </span>
              </div>
            </Tooltip>
          ))}
        </div>

        {/* Black Keys - unchanged */}
        <div className={"absolute top-0 left-0 flex"}>
          {blackKeys.map(({ midiNote, title, label, qwerty }, idx) => {
            let offset = 0;
            for (let i = 0; i < leap.length; i++) {
              if (Number(midiNote) >= leap[i]) offset = i + 1;
            }

            const getLeftPosition = (idx: number) => {
              const base = (idx + 1) * KEY_WIDTH - 16;
              const leapOffset = KEY_WIDTH * (offset);
              return base + leapOffset;
            };
            
            return (
              <Tooltip content={title ?? ''} key={`key-${midiNote}`}>            
                <div
                  id={`key_${midiNote}`}
                  className={cn(
                    "piano-key black",
                    "w-8 h-24 bg-background border border-foreground absolute active:opacity-60 flex items-end",
                    "hover:bg-foreground", notes.includes(Number(midiNote)) && 'bg-foreground border-white'
                  )}
                  style={{ 
                    left: `${getLeftPosition(idx)}px`,
                    background: notes.includes(Number(midiNote)) ? `bg-foreground` : 'bg-background'
                  }}
                  onClick={() => {
                    addNote(Number(midiNote), false);
                    setTimeout(() => {
                      removeNote(Number(midiNote))
                    }, 500);              
                  }}
                >
                  <span className="rotate-0 text-xs ml-1">
                    {inputType === 'midi' ? label : qwerty}
                  </span>
                </div>
              </Tooltip>
            )
          })}
        </div>
      </div>
    </div>
  );
}