// useControllerEffect.tsx
// This hook manages the effect of MIDI controller inputs on the UI,
// mapping controller values to visual representations and saving preferences.

import { useEffect, useState } from 'react';
import { map } from '@/utils/utils';
import { Controller } from '@/sanity/lib/queries';
import { TPreference } from '@/contexts/note-context';

const SLIDER_HEIGHT = 130;

interface ControllerValue {
  number: number;
  value: number;
}

interface MappedValues {
  sliders: { [key: string]: number };
  knobs: { [key: string]: number };
}

const sliderTypeList = ['scrollV', 'hue', 'grayscale', 'invert'];

export function useControllerEffect(
  controller: ControllerValue | null | undefined,
  controllerConfig: Controller | null | undefined,
  setPreference: React.Dispatch<React.SetStateAction<TPreference>>,
  preference: TPreference
): MappedValues {
  const [mappedValues, setMappedValues] = useState<MappedValues>({
    sliders: {},
    knobs: {} // mapped values are provided except for midiType due to specifity (defined in controller-board.tsx)
  });

  // Initialize mapped values from saved preferences
  useEffect(() => {
    const initialSliders: { [key: string]: number } = {};
    const initialKnobs: { [key: string]: number } = {};

    // Initialize slider values
    Object.entries(preference).forEach(([key, value]) => {
      if (sliderTypeList.includes(key)) {
        initialSliders[key] = map(value, 127, 0, 0, SLIDER_HEIGHT - 4.5);
      } else {
        initialKnobs[key] = map(value, 0, 127, -127, 127);
      }
    });

    setMappedValues({
      sliders: initialSliders,
      knobs: initialKnobs
    });
  }, [preference]);

  // Handle controller changes
  useEffect(() => {
    if (!controllerConfig || !controller) return;

    // Check if it's a slider
    const sliderMatch = controllerConfig.sliders?.find(item => item.midiNote === controller.number);
    if (sliderMatch?.for) {
      const visualValue = map(controller.value, 127, 0, 0, SLIDER_HEIGHT - 4.5);
      
      setMappedValues(prev => ({
        ...prev,
        sliders: {
          ...prev.sliders,
          [sliderMatch.for!]: visualValue,
        }
      }));

      setPreference(prev => ({
        ...prev,
        [sliderMatch.for!]: controller.value,
      }));
      return;
    }

    // Check if it's a knob
    const knobMatch = controllerConfig.knobs?.find(item => item.midiNote === controller.number);
    if (knobMatch?.for) {
      const effect = knobMatch.for;

        const mappedValue = map(controller.value, 0, 127, -127, 127);
        
        setMappedValues(prev => ({
          ...prev,
          knobs: {
            ...prev.knobs,
            [effect]: mappedValue,
          }
        }));

        setPreference(prev => ({
          ...prev,
          [effect]: mappedValue,
        }));
    }
  }, [controller, controllerConfig, setPreference]);

  return mappedValues;
}