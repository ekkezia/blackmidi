export default {
  name: 'controller',
  title: 'Controller Settings',
  type: 'document',
  fields: [
    {
      name: 'knobs',
      title: 'Knobs',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'knob',
          fields: [
            {
              name: 'midiNote',
              title: 'MIDI Number',
              type: 'number',
            },
            {
              name: 'for',
              title: 'For',
              type: 'string', // as a key for controller usage
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'sliders',
      title: 'Sliders',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'slider',
          fields: [
            {
              name: 'midiNote',
              title: 'MIDI Number',
              type: 'number',
            },
            {
              name: 'for',
              title: 'For',
              type: 'string', // as a key for controller usage
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
};
