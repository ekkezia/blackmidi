import { useNoteContext } from '@/contexts/note-context';
import { useEffect, useRef, useState } from 'react';
import { cn, map } from '@/utils/utils';
import { useConfig } from '@/hooks/useConfig';
import { ScoreDisplay } from './score-display';

const Document = ({ className }: { className?: string }) => {
  const { notes, showHelp, lock, preference } = useNoteContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const { config } = useConfig();
  const [currentDocIdx, setCurrentDocIdx] = useState(0); // doc is the latest note pushed

  useEffect(() => {
    if (notes.length > 0 && !lock) {
      const idx = config.findIndex((doc) => doc.midiNote === notes[0]);
      if (idx !== -1) {
        setCurrentDocIdx(idx);
      }
    }
  }, [notes, config, lock]);

  useEffect(() => {
    if (containerRef.current) {
      const mappedValue = map(preference['scrollV'], 127, 0, -containerRef.current.clientHeight / 2, containerRef.current.clientHeight /2);

      containerRef.current.style.transform = `translateY(${mappedValue}px)`;
    }
  }, [preference]);

  return (
    <div >
    <div className={cn("w-[90vw] md:w-[540px] z-0 border border-foreground shadow-xl p-0 absolute bg-background min-h-[360px] bottom-0 translate-x-[-50%] left-[50%]", className, showHelp ? 'opacity-50 blur-xs pointer-events-none' : 'pointer-events-block opacity-100')}
    ref={containerRef}
    >
    {config[currentDocIdx]?.score && <ScoreDisplay score={config[currentDocIdx].score} />}
    </div>
    </div>
  )
}
export default Document;