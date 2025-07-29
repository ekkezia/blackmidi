// Updated ControllerBoard component
import { cn } from '@/utils/utils';
import { useNoteContext } from '@/contexts/note-context';
import { Tooltip } from './tooltip';
import { useConfig } from '@/hooks/useConfig';
import HelpButton from './help-button';
import LockButton from './lock-button';
import SaveSettingsButton from './save-button';
import ControllerMonitor from './controller-monitor';
import CustomKnob from './knob';

interface ControllerBoardProps {
  className?: string;
}

export default function ControllerBoard({ className }: ControllerBoardProps) {
  const { showHelp, preference, inputType, setPreference } = useNoteContext();
  const { controllerConfig } = useConfig();

  if (!controllerConfig) return null;
  
  return (
    <div className={cn("flex items-center justify-between gap-8 px-8", className, showHelp ? 'opacity-50 blur-[1px] pointer-events-none' : 'pointer-events-block opacity-100')}>
      <div className="h-full flex flex-col gap-4">
        <ControllerMonitor />
      </div>

      <div className="flex gap-8 h-fit items-center">
        {/* Controller Knob */}
        <div className={cn("flex place-items-center gap-8")}>
        {controllerConfig.knobs.map(({ midiNote, label, for: knobFor }) => (
            knobFor && (
              <Tooltip content={inputType !== 'midi' ? 'Only w/ MIDI input' : `${midiNote} -> ${label}`} key={`knob-${label}`}>     
                <CustomKnob 
                  id={`knob_${knobFor}`} 
                  allowCursor={inputType === 'keyboard'}
                  value={preference[knobFor as keyof typeof preference]} 
                  onChange={(e) => {
                    setPreference((prev) => ({
                      ...prev,
                      [knobFor!]: e
                    }));
                  }} 
                />
                   
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