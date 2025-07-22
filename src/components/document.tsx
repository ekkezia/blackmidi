import { useNoteContext } from '@/contexts/note-context';
import { useEffect, useRef, useState } from 'react';
import { cn, map } from '@/utils/utils';
import { useConfig } from '@/hooks/useConfig';
import { ScoreDisplay } from './score-display';

const selectedSliderController = 82;

const Document = ({ className }: { className?: string }) => {
  const { notes, controller, showHelp, lock } = useNoteContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const { config } = useConfig();
  const [currentDocIdx, setCurrentDocIdx] = useState(0); // doc is the latest note pushed
  // const [mappedValue, setMappedValue] = useState<{ [key: string] : number }>({});

  useEffect(() => {
    if (notes.length > 0 && !lock) {
      const idx = config.findIndex((doc) => doc.midiNote === notes[0]);
      if (idx !== -1) {
        // console.log('idx', idx);
        setCurrentDocIdx(idx);
      }
    }
  }, [notes, config, lock]); // Don't forget to include config here!

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(50%)`;
    }
  }, [containerRef]);

  useEffect(() => {
    if (controller.number === selectedSliderController && containerRef.current) {
      // console.log('controller', controller)
      const mappedValue = map(controller.value, 127, 0, 0, containerRef.current.clientHeight)
      containerRef.current.style.transform = `translateY(${mappedValue}px)`;
    }

    // if (mappedValue[selectedSliderController] && horizontalRef.current) {
    //   horizontalRef.current.style.transform = `translateX(${mappedValue[selectedSliderController]}px)`;
    // }
  }, [controller, containerRef]);


  return (
    <div >
    <div className={cn("w-[40vw] z-0 border border-foreground shadow-xl p-0 absolute bg-background min-h-[360px] bottom-0 translate-x-[-50%] left-[50%]", className, showHelp ? 'opacity-50 blur-xs pointer-events-none' : 'pointer-events-block opacity-100')}
    ref={containerRef}
    >
    {config[currentDocIdx]?.score && <ScoreDisplay score={config[currentDocIdx].score} />}
    {/* {notes[0] && config[currentDocIdx]&& <img src={`/scores/${config[currentDocIdx].img}`} alt={config[currentDocIdx].label} width="100%" />} */}
    </div>
    </div>
  )
}
export default Document;