import { useNoteContext } from '@/app/contexts/note-context';
import { cn } from '@/utils/utils';
import { useCallback, useEffect, useState } from 'react';
import { Tooltip } from './tooltip';

const octaveUpNote = 46;
const octaveDownNote = 47;

const OctaveButton = ({ isUp }: { isUp?: boolean }) => {
  const [justPressed, setJustPressed] = useState(false);

  const {lock, notes, increaseOctave, decreaseOctave} = useNoteContext();

  const handleClick = useCallback((_isUp: boolean) => {
    if (!justPressed) {
      if (_isUp) increaseOctave(1);
      else decreaseOctave(1);
      setJustPressed(true);
      setTimeout(() => {
        setJustPressed(false);
      }, 500);  
    }
  }, [decreaseOctave, increaseOctave, justPressed]);

  useEffect(() => {
    if (notes[0] === octaveUpNote){ 
      if (!justPressed) handleClick(true);
    } else if (notes[0] === octaveDownNote){ 
      if (!justPressed) handleClick(false);
    }

  }, [notes, lock, justPressed, increaseOctave, decreaseOctave, handleClick]);

  return (
    <Tooltip content={isUp ? 'Octave +1' : 'Octave -1'}>
      <button className={cn("border-foreground border w-12 h-12 hover:bg-foreground hover:text-background cursor-pointer flex items-end justify-center text-xs", lock ? 'bg-foreground text-background' : 'bg-background text-foreground')} onClick={() => handleClick(isUp ?? false)}>OCT{isUp ? '+' : '-'}</button>
    </Tooltip>
  )
}

export default OctaveButton;