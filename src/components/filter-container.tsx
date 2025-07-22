import { useNoteContext } from '@/contexts/note-context';
import { useConfig } from '@/hooks/useConfig';
import { cn, map } from '@/utils/utils';
import { ReactNode, useEffect, useMemo, useState } from 'react';

const FilterContainer = ({ className, children }: { className?: string, children: ReactNode }) => {
  const { controller } = useNoteContext();
  const { controllerConfig } = useConfig();

  const [currentHue, setCurrentHue] = useState(0); // deg
  const [currentGrayscale, setCurrentGrayscale] = useState(0); // %
  const [currentInvert, setCurrentInvert] = useState(0); // %

  // const colorKnob = useMemo(
  //   () => controllerConfig?.knobs.find((item) => item.for === 'color'),
  //   [controllerConfig]
  // );
  // const bgColorKnob = useMemo(
  //   () => controllerConfig?.knobs.find((item) => item.for === 'bgColor'),
  //   [controllerConfig]
  // );


  const knobMap = useMemo(() => {
    const map: Record<number, string> = {};
    controllerConfig?.knobs.forEach(knob => {
      if (knob.midiNote !== undefined && knob.for) {
        map[knob.midiNote] = knob.for;
      }
    });
    return map;
  }, [controllerConfig]);
  
  useEffect(() => {
    const role = knobMap[controller.number];
    // const mappedValue = map(controller.value, 0, 127, -127, 127);
  
    if (role === 'color') {setCurrentHue(map(controller.value, 0, 127, -127, 127));}
    else if (role === 'grayscale') {setCurrentGrayscale(map(controller.value, 0, 127, 0, 100)); }
    else if (role === 'invert') {setCurrentInvert(map(controller.value, 0, 127, 0, 100)); }
  }, [controller.number, controller.value, knobMap]);
  
  useEffect(() => {
    console.log(currentGrayscale, currentInvert, currentHue)
  }, [currentGrayscale, currentInvert, currentHue])
  return (
    <div
      className={cn('relative bg-background', className)}
      style={{
        filter: `hue-rotate(${currentHue}deg) grayscale(${currentGrayscale}%) invert(${currentInvert}%)`,
      }}>
      {children}
    </div>
  )
}

export default FilterContainer;