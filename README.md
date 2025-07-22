# blackmidi: a MIDI Playground

Welcome to my experimental web app for exploring jazz standards with your MIDI controller or computer keyboard. This is more than a lead sheet viewer — it's an interface where music and UI merge.

This project uses [`usewebaudiosynth`](https://www.npmjs.com/package/usewebaudiosynth) to trigger sounds via Web Audio API.

I'm using **Arturia MiniLab** for reference of keys, buttons and sliders mapping.

## 🎹 Features

- Play music notes in real-time using a **MIDI keyboard / device**
- Use MIDI to:

  - Scroll through sheet music
  - Change website themes through hue filter
  - [IN THE FUTURE]: Control custom behaviors (with potential for user-defined mappings)

- Fall back to **laptop keyboard** input if MIDI is unavailable (see the option on bottom left of the web app)

## 🖥️ Usage Instructions

### 🔌 Connect Your Device

- Plug in your MIDI controller
- Or use your laptop keyboard keys
- Select the input mode from the bottom-left toggle on the screen

### 📜 Sheet Interaction

- Scroll and interact with sheet music using the slider (with default mapping is **82**) on MIDI device
- The currently selected standard will automatically update based on the first detected note

### 🎨 Theme Color Filter Interaction

- Rotate the knob on your midi to change the color of the web app according to the three filters below:
  - **72**: hue
  - **71**: grayscale
  - **76**: invert

## 🧰 Keyboard Mappings

### 🎹 White Keys (C3 to C5)

```
q w e r t y u     -> C3 D3 E3 F3 G3 A3 B3
z x c v b n m     -> C4 D4 E4 F4 G4 A4 B4
```

### 🖤 Black Keys

```
2 3   5 6 7       -> C#3 D#3 F#3 G#3 A#3
s d   g h j       -> C#4 D#4 F#4 G#4 A#4
```

> MIDI note numbers range from **48 (C3)** upward.

## 🛠️ Built With

- **Next.js** – React framework
- **Sanity.io** – Headless CMS for content
- **Web MIDI API** – Real-time MIDI input handling
- **Tone.js (planned)** – For potential sound generation and effects

## 🧪 Status: Experimental

This app is a prototype for a broader idea: using **MIDI as a browser-based UI**.

### 🧭 Planned Ideas

- Let users map MIDI sliders and knobs to visual or musical parameters
- Customize interactions per jazz standard
- Add audio playback support with tempo control
- Enhance visual feedback for MIDI gestures

## 🤝 Contributing

Have ideas or want to collaborate? Feel free to fork or contact me directly.

## 📍 Limitations

- Only works on **desktop/laptop** (mobile not yet supported)
- Requires Chrome or any browser that supports Web MIDI

---

> ya like jazz? ( ͡° ͜ʖ ͡°)
