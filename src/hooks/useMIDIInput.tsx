// Initialize Web MIDI API support
// This hook manages MIDI input, allowing for note on/off events and control changes.
// It also handles MIDI device detection and error handling.
import { useEffect } from 'react';

type MIDIMessageCallback = (note: number, velocity?: number) => void;
type MIDICCMessageCallback = (controller: number, value: number) => void;

export function useMIDIInput(
  onNoteOn: MIDIMessageCallback,
  onNoteOff: MIDIMessageCallback,
  onControlChange?: MIDICCMessageCallback,
  onMidiDetected?: () => void,
  onMidiFailed?: (error: string) => void,
  inputType?: 'midi' | 'keyboard',
) {
  useEffect(() => {
    if (inputType !== 'midi') return; // ✅ Skip setting up MIDI listeners if not MIDI input
  
    // Check if Web MIDI API is supported
    if (!navigator.requestMIDIAccess) {
      const errorMsg = 'Web MIDI API is not supported in this browser';
      console.warn(errorMsg);
      if (onMidiFailed) {
        onMidiFailed(errorMsg);
      }
      return;
    }

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
        const errorMsg = `Failed to access MIDI devices: ${err.message}`;
        console.error(errorMsg);
        if (onMidiFailed) {
          onMidiFailed(errorMsg);
        }
      });
  }, [onNoteOn, onNoteOff, onControlChange, onMidiDetected, onMidiFailed, inputType]);
}