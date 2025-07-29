import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback, useEffect, useRef } from 'react';
import { Tooltip } from './tooltip';

const lockMidiNote = 46;
const SaveSettingsButton = () => {
  const { notes, preference, hasSavedToLocalStorage, setHasSavedToLocalStorage } = useNoteContext();

    // const timeoutRef = useRef(null);
  
    const handleClick = useCallback(() => {
      // saving to local storage
      if (!hasSavedToLocalStorage) {
        setHasSavedToLocalStorage(true);
  
        Object.entries(preference).forEach(([key, val]) => {
          localStorage.setItem(key, val.toString());
        })
    
      }
  }, [hasSavedToLocalStorage, setHasSavedToLocalStorage, preference]);
  
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
    <Tooltip content={hasSavedToLocalStorage ? 'Preference is saved.' : 'Save new preference'}>
      <button className={cn("border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-pointer flex items-end justify-center text-xs", hasSavedToLocalStorage ? 'bg-foreground text-background' : 'bg-background text-foreground')} onClick={handleClick}>{hasSavedToLocalStorage ? 'SAVED' : 'SAVE'}</button>
    </Tooltip>
  )
}

export default SaveSettingsButton;