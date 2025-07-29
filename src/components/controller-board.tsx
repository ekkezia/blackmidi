// Updated ControllerBoard component
import { cn } from '@/utils/utils';
import { useNoteContext } from '@/contexts/note-context';
import { Tooltip } from './tooltip';
import { useConfig } from '@/hooks/useConfig';
import HelpButton from './help-button';
import LockButton from './lock-button';
import SaveSettingsButton from './save-button';
import ControllerMonitor from './controller-monitor';
import { useControllerEffect } from '@/hooks/useControllerEffect';

interface ControllerBoardProps {
  className?: string;
}

export default function ControllerBoard({ className }: ControllerBoardProps) {
  const { showHelp, controller, preference, inputType, setPreference } = useNoteContext();
  const { controllerConfig } = useConfig();
  
  // Use the centralized controller effect
  const mappedValues = useControllerEffect(controller, controllerConfig, setPreference, preference);

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
              <Tooltip content={inputType !== 'midi' ? 'Only w/ MIDI input' : label ?? ''} key={`knob-${label}`}>                           
                <div
                  id={`knob_${knobFor}_${midiNote}`}
                  className="rounded-4xl w-8 h-8 border border-foreground relative transition-duration-300"
                  style={{
                    transform: `rotate(${mappedValues.knobs[knobFor] ?? 0}deg)`
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
      </div>
    </div>
  );
}