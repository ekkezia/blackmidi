import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback, useEffect } from 'react';
import { Tooltip } from './tooltip';

const helpMidiNote = 44;
const HelpButton = () => {
  const { showHelp, setShowHelp } = useNoteContext();
  const { notes } = useNoteContext();

  const handleClickHelp = useCallback(() => {
    setShowHelp(!showHelp);
  }, [showHelp, setShowHelp]);

  useEffect(() => {
    if (notes[0] === helpMidiNote){ 
      if (!showHelp) handleClickHelp();
    }
  }, [handleClickHelp, notes]);

  return (
    <Tooltip content="Help">
      <button className={cn("border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-help flex items-end justify-center text-xs")} onClick={handleClickHelp}>?</button>
    </Tooltip>
  )
}

export default HelpButton;