import { cn, map } from '@/utils/utils';
import { black, leap, white } from './config/config';
import { useNoteContext } from '@/app/contexts/note-context';
import MidiPlayer from './midi-player';
import { useEffect, useMemo, useState } from 'react';
import { Tooltip } from './tooltip';
import { InputSelector } from './input-selector';
import { useConfig } from '@/hooks/useConfig';

const KEY_WIDTH = 63;
const KEY_HEIGHT = 180;
export default function Keyboard({ className }: { className?: string }) {
  const { showHelp, inputType, notes, addNote, removeNote, controller } = useNoteContext();
  const { config, controllerConfig } = useConfig();
  const [mappedValue, setMappedValue] = useState<{ [key: string] : number }>({});
  const [mappedKnobValue, setMappedKnobValue] = useState(0); // visual UI

  useEffect(() => {
    // console.log('knob',mappedValue, mappedKnobValue);
  }, [mappedKnobValue, mappedValue])
  useEffect(() => {
    const sliderMatch = controllerConfig?.sliders.find(item => item.midiNote === controller.number);
  
    if (sliderMatch?.for) {
      setMappedValue(prev => ({
        ...prev,
        [sliderMatch.for!]: map(controller.value, 127, 0, 0, KEY_HEIGHT),
      }));
    }
  
    setMappedKnobValue(map(controller.value, 127, 0, 0, KEY_HEIGHT));
  }, [controller, controllerConfig?.sliders]);

  const whiteKeys = useMemo(
    () => config.filter((item) => white.includes(item.midiNote)),
    [config]
  );
  
  const blackKeys = useMemo(
    () => config.filter((item) => black.includes(item.midiNote)),
    [config]
  );
  

  if (!controllerConfig || !config) return null;
  return (
    <div className={cn("flex items-center gap-8 px-8", className, showHelp ? 'opacity-50 blur-[1px] pointer-events-none' : 'pointer-events-block opacity-100')}>
        <div className="h-full flex flex-col gap-4">
          <span>blackmidi</span>
          <MidiPlayer />
          <InputSelector />
        </div>

      <div className="flex gap-8 h-fit items-center">
      {/* Controller slider */}
      <div className="flex gap-8 items-center" >
        {
          controllerConfig.sliders.map(({ midiNote, label, for: sliderFor }) => (
            <Tooltip content={label ?? ''} key={`slider-${midiNote}`}>            
              <div
                id={`knob_${sliderFor}`}
                className="relative w-4 flex justify-center"
                style={{ height: KEY_HEIGHT }}
              >
                <div className="w-1 h-full border border-foreground" />

                  <div className="w-full h-1 border border-foreground absolute bg-background transition-duration-300" 
                    style={{
                    transform: controller.number === Number(midiNote) ? `translateY(${mappedValue[sliderFor ?? '']}px)` : 'translateX(0px) translateY(0px)'
                  }} 
                />
              </div>
            </Tooltip>
          ))
        }
      </div>
      </div>

      {/* Piano Keys */}
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
                {/* {midi} {label} */}
                {inputType === 'midi' ? label : qwerty}
              </span>
            </div>
            </Tooltip>
          ))}
        </div>

        {/* Black Keys */}
        <div className={"absolute top-0 left-0 flex"}>
        {blackKeys.map(({ midiNote, title, label, qwerty }, idx) =>  {
                      let offset = 0;
                      for (let i =0; i<leap.length;i++) {
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
             }} // 63px (width) per white key, adjusted
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
          )})}
        </div>
      </div>
    </div>
  );
}
