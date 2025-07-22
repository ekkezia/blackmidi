import { client } from './client'

export type ScoreData = {
  title: string
  composer: string
  feel: string
  timeSignature: string
  form: {
    section: string
    bars: { chords: string[] }[]
  }[]
}


export type Song = {
  _id: string
  midiNote: number
  label?: string
  qwerty?: string
  title?: string
  url?: string
  img?: string
  text?: string
  score?: ScoreData;
}

export async function getSongs(): Promise<Song[]> {
  const query = `*[_type == "song"] | order(midiNote asc){
    _id,
    midiNote,
    label,
    qwerty,
    title,
    url,
    img,
    text,
    score {
      title,
      composer,
      feel,
      timeSignature,
      form[] {
        section,
        bars[] {
          chords[]
        }
      }
    }
  }`

  return await client.fetch(query)
}

export type Knob = {
  _id: string
  label?: string
  for?: string // 'color' | 'mod74' | 'mod75' | 'scrollV' | 'scrollH
  midiNote?: number
}

export type Slider = {
  _id: string
  for?: string
  label?: string
  midiNote?: number
}

export type Controller = {
  _id: string
  name: string
  knobs: Knob[]
  sliders: Slider[]
}

export async function getControllers(): Promise<Controller[]> {
  const query = `*[_type == "controller"]{
    _id,
    knobs[] {
      _id,
      label,
      for,
      midiNote
    },
    sliders[] {
      _id,
      label,
      for,
      midiNote
    }
  }`

  return await client.fetch(query)
}
