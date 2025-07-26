const STARTING_NOTE = 48;
export const white = [48, 50, 52, 53, 55, 57, 59, 60, 62, 64,65,67,69,71, 72];
export const black = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70, ];

const whiteLaptopKeys = {'q':48,'w':50,'e':52,'r':53,'t':55,'y':57,'u':59,'z':60,'x':62,'c':64,'v':65,'b':67,'n':69,'m':71};

const blackLaptopKeys = {'2': 49,'3': 51,'5': 54,'6': 56,'7': 58,'s': 61,'d': 63,'g': 66,'h': 68,'j': 70};  
export const leap = [54, 61, 66];

export const QWERTY_KEYS: Record<string, number> = {
  ...whiteLaptopKeys,
  ...blackLaptopKeys,
};

export const MIDI_TYPE_STRING: OscillatorType[] = ['sine', 'square', 'triangle', 'sawtooth'];
