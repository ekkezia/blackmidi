import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback, useEffect, useRef } from 'react';
import { Tooltip } from './tooltip';

const lockMidiNote = 45;

const LockButton = () => {
  const { notes, lock, setLock } = useNoteContext();
  const timeoutRef = useRef(null);

  const handleClick = useCallback(() => {
    console.log('handleClick called, toggling from', lock, 'to', !lock);
    setLock(!lock);
  }, [lock, setLock]);

  useEffect(() => {
    let timeoutLock: NodeJS.Timeout | undefined;
    
    if (notes[0] === lockMidiNote) {
      // Set new timeout
      timeoutLock = setTimeout(() => {
        handleClick();
      }, 50);
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutLock) {
        clearTimeout(timeoutLock);
      }
    };
  }, [notes, handleClick]);

  return (
    <Tooltip content={lock ? 'Score document is locked. Click to allow change to other score.' : 'Score document is unlocked. Click to prevent change to other score.'}>
      <button 
        className={cn(
          "border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-pointer flex items-end justify-center text-xs", 
          lock ? 'bg-foreground text-background' : 'bg-background text-foreground'
        )} 
        onClick={handleClick}
      >
        {lock ? 'LOCKED' : 'LOCK'}
      </button>
    </Tooltip>
  );
};

export default LockButton;