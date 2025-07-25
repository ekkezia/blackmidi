import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback, useEffect } from 'react';
import { Tooltip } from './tooltip';

const lockMidiNote = 45;
const LockButton = () => {
  const { notes } = useNoteContext();

  const {lock, setLock} = useNoteContext();

  const handleClick = useCallback(() => {
    setLock(!lock)
  }, [lock]);

  useEffect(() => {
    if (notes[0] === lockMidiNote){ 
      if (!lock) handleClick();
    }
  }, [handleClick, notes, lock]);

  return (
    <Tooltip content={lock ? 'Score document is locked. Click to allow change to other score.' : 'Score document is unlocked. Click to prevent change to other score.'}>
      <button className={cn("border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-pointer flex items-end justify-center text-xs", lock ? 'bg-foreground text-background' : 'bg-background text-foreground')} onClick={handleClick}>{lock ? 'LOCKED' : 'LOCK'}</button>
    </Tooltip>
  )
}

export default LockButton;