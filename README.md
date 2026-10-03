# Abhishek Kumar Ranjan — 3D Cyber Animated Portfolio

Transforming **[https://abhishek-kar.floot.app/](https://abhishek-kar.floot.app/)** into a state-of-the-art **3D WebGL Cyberpunk Animated Portfolio**.

---

## 🚀 Key 3D & Animation Highlights

### 1. Jarvis 3D WebGL Core (`three-scene.js`)
- **Central Energy Core**: Glowing wireframe icosahedron with pulsing emissive materials.
- **Gyroscopic Gimbal Rings**: 3 concentric rotating rings spinning across independent axes with orbiting satellite data nodes.
- **Interactive Galactic Particle Nebula**: 1,800+ dynamic particles with additive blending and mouse-gravity physics.
- **Scroll-Linked 3D Camera Choreography**: Smoothly pans and rotates the camera through 3D space as you navigate between sections.
- **Live Gyro Readout**: Real-time orientation telemetry coordinates in the HUD.

### 2. 3D Card Physics & Specular Glare (`styles.css` & `app.js`)
- Real-time mouse tracking that tilts cards along 3D perspectives (`perspective: 1000px`).
- Holographic scanlines, glowing borders, and floating depth cards.
- Abhishek's portrait floating in a holographic HUD frame with digital brackets and depth separation.

### 3. Procedural Sci-Fi Audio Synthesizer (Zero External Audio Dependencies)
- Uses the **Web Audio API** to generate rich synthesizer sound effects directly in the browser:
  - Micro hover chirps
  - Crisp click blips
  - Jarvis reactor boot hum
  - Audio mute/unmute toggle in the HUD

### 4. Interactive Jarvis 3D Voice Assistant
- Real-time speech synthesis (`window.speechSynthesis`) where Jarvis talks to the visitor.
- Canvas audio frequency visualizer wave that ripples while Jarvis speaks.
- Quick command chips:
  - *Who is Abhishek?*
  - *Highlight Projects*
  - *Verify Credentials*
  - *Establish Contact*

### 5. Interactive 3D Certificate Inspection Modal
- Full compliance with modern CSS top-layer animation (`@starting-style`, `transition-behavior: allow-discrete`, `::backdrop`).
- High-res inspection of the **AI Internship Completion** and **AI Course Completion** certificates.

### 6. Cyberpunk CLI Terminal Drawer (`>_ CLI`)
- Interactive Unix-style terminal with built-in commands: `help`, `whoami`, `about`, `projects`, `skills`, `contact`, `jarvis`, `clear`.

---

## 📁 Directory Structure
```
abhishek-portfolio-3d/
├── index.html                     # Semantic HTML5 & Modern UI Layout
├── styles.css                     # Design tokens, glassmorphism & 3D styling
├── three-scene.js                 # Three.js 3D WebGL engine & particle field
├── app.js                         # 3D Tilt, Web Audio synthesizer & Jarvis AI
├── server.js                      # Zero-dependency local preview server
└── assets/
    ├── abhishek-profile.png       # Original portrait
    ├── ai-internship-certificate.jpeg
    ├── ai-course-certificate.jpeg
    ├── northcap-admission-letter.pdf
    └── three.min.js               # Local Three.js library
```

---

## 💻 Running Locally

To run the local server:
```powershell
node server.js
```
Then open: **`http://127.0.0.1:3000/`**
