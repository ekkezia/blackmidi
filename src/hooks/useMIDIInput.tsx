import { useEffect } from 'react';

type MIDIMessageCallback = (note: number, velocity?: number) => void;
type MIDICCMessageCallback = (controller: number, value: number) => void;

export function useMIDIInput(
  onNoteOn: MIDIMessageCallback,
  onNoteOff: MIDIMessageCallback,
  onControlChange?: MIDICCMessageCallback,
  onMidiDetected?: () => void,
  inputType?: 'midi' | 'keyboard',
) {
  useEffect(() => {
    if (inputType !== 'midi') return; // ✅ Skip setting up MIDI listeners if not MIDI input
  
    const handleMIDIMessage = (event: MIDIMessageEvent) => {


      const data = event.data;
      if (!(data instanceof Uint8Array)) {
        console.warn('Unexpected MIDI data:', data);
        return;
      }

      const [status, data1, data2] = data;
      const command = status >> 4;
      // const channel = status & 0x0f;

      switch (command) {
        case 9: // Note On
          if (data2 > 0) {
            onNoteOn(data1, data2);
          } else {
            onNoteOff(data1);
          }
          break;
        case 8: // Note Off
          onNoteOff(data1);
          break;
        case 11: // Control Change (slider, knob, etc.)
          if (onControlChange) {
            onControlChange(data1, data2);
          }
          break;
        default:
          break;
      }
    };

    navigator.requestMIDIAccess()
      .then((midiAccess) => {
        for (const input of midiAccess.inputs.values()) {
            input.onmidimessage = handleMIDIMessage;
          // console.log('MIDI Input Device:', input.name);
        }

        // Auto-detect MIDI device
        if (midiAccess.inputs.size > 0 && onMidiDetected) {
          onMidiDetected();
        }
      })
      .catch((err) => {
        console.error('Failed to access MIDI devices:', err);
      });
  }, [onNoteOn, onNoteOff, onControlChange, onMidiDetected, inputType]);
}
