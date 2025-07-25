import { useNoteContext } from '@/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback } from 'react';
import { Tooltip } from './tooltip';

// const lockMidiNote = 45;
const SaveSettingsButton = () => {
  const { savedPreference, hasSaved, setHasSaved } = useNoteContext();

  const handleClick = useCallback(() => {
    // saving to local storage
    if (!hasSaved) {
      setHasSaved(true);
      console.log('Saving preference', savedPreference, hasSaved);

      Object.entries(savedPreference).forEach(([key, val]) => {
        localStorage.setItem(key, val.toString());
      })
  
    }
}, [hasSaved, setHasSaved, savedPreference]);

  return (
    <Tooltip content={hasSaved ? 'Preference is saved.' : 'Save new preference'}>
      <button className={cn("border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-pointer flex items-end justify-center text-xs", hasSaved ? 'bg-foreground text-background' : 'bg-background text-foreground')} onClick={handleClick}>{hasSaved ? 'SAVED' : 'SAVE'}</button>
    </Tooltip>
  )
}

export default SaveSettingsButton;