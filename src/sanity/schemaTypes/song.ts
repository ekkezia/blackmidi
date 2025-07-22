export default {
  name: 'song',
  title: 'Song',
  type: 'document',
  fields: [
    {
      name: 'midiNote',
      title: 'MIDI Note',
      type: 'number',
    },
    {
      name: 'label',
      title: 'Label (Single Letter)',
      type: 'string',
    },
    {
      name: 'qwerty',
      title: 'QWERTY Key',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'Audio URL',
      type: 'url'
    },
    {
      name: 'score',
      title: 'Score',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'composer', title: 'Composer', type: 'string' },
        { name: 'feel', title: 'Feel', type: 'string' },
        { name: 'timeSignature', title: 'Time Signature', type: 'string' },
        {
          name: 'form',
          title: 'Form',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'section', title: 'Section', type: 'string' },
                {
                  name: 'bars',
                  title: 'Bars',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      fields: [
                        {
                          name: 'chords',
                          title: 'Chords',
                          type: 'array',
                          of: [{ type: 'string' }]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },        
    {
      name: 'img',
      title: 'Image Filename',
      type: 'string'
    },
    {
      name: 'text',
      title: 'Description Text',
      type: 'text'
    }
  ]
}
