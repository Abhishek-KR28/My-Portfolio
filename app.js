/**
 * Abhishek Kumar Ranjan — 3D Cyber Portfolio Application Logic
 * Integrations:
 * - 3D Card Tilt Physics & Specular Glare
 * - Web Audio API Procedural Sci-Fi Synthesizer (Zero External Audio Dependencies)
 * - Jarvis AI Speech Synthesis & Canvas Audio Waveform Engine
 * - Modern <dialog> Management with Light Dismiss
 * - Cyberpunk CLI Terminal System
 * - Interactive Clipboard Utilities & Scroll Spy
 */

(function () {
  'use strict';

  // State Management
  const state = {
    soundEnabled: true,
    audioCtx: null,
    isSpeaking: false,
    activeVoice: null
  };

  // DOM Cache
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStateLabel = document.getElementById('sound-state');
  const jarvisVoiceBtn = document.getElementById('jarvis-voice-btn');
  const heroJarvisBtn = document.getElementById('hero-jarvis-btn');
  const jarvisDialog = document.getElementById('jarvis-dialog');
  const jarvisCloseBtn = document.getElementById('jarvis-close-btn');
  const jarvisSpeechText = document.getElementById('jarvis-speech-text');
  const voiceWaveCanvas = document.getElementById('voice-wave-canvas');

  const certDialog = document.getElementById('cert-dialog');
  const dialogImg = document.getElementById('dialog-img');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogSubtitle = document.getElementById('dialog-subtitle');
  const dialogDownloadLink = document.getElementById('dialog-download-link');
  const dialogCloseBtn = document.getElementById('dialog-close-btn');
  const dialogDismissBtn = document.getElementById('dialog-dismiss-btn');

  const cliToggleBtn = document.getElementById('cli-toggle-btn');
  const cliDrawer = document.getElementById('cli-drawer');
  const cliCloseBtn = document.getElementById('cli-close-btn');
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');
  const cliForm = document.getElementById('cli-form');

  const copyEmailBtn = document.getElementById('copy-email-btn');

  /* ==========================================================================
     1. PROCEDURAL WEB AUDIO SYNTHESIZER
     ========================================================================== */
  function getAudioContext() {
    if (!state.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        state.audioCtx = new AudioCtx();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
    return state.audioCtx;
  }

  function playSynthTone(freqStart, freqEnd, duration, type = 'sine', gainVal = 0.05) {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 10), ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function playHoverChirp() {
    playSynthTone(750, 1100, 0.08, 'sine', 0.03);
  }

  function playClickBlip() {
    playSynthTone(400, 850, 0.12, 'triangle', 0.06);
  }

  function playJarvisBootHum() {
    playSynthTone(120, 380, 0.35, 'sawtooth', 0.04);
  }

  function playSuccessChime() {
    playSynthTone(523.25, 1046.5, 0.25, 'sine', 0.06);
  }

  // Sound Toggle Listener
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      soundToggleBtn.setAttribute('aria-pressed', state.soundEnabled.toString());
      soundStateLabel.textContent = state.soundEnabled ? 'ON' : 'OFF';
      if (state.soundEnabled) {
        playSuccessChime();
      }
    });
  }

  /* ==========================================================================
     2. 3D CARD TILT PHYSICS & SPECULAR DYNAMICS
     ========================================================================== */
  function initTiltElements() {
    const tiltCards = document.querySelectorAll('.tilt-element');

    tiltCards.forEach(card => {
      const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '12');

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;

        const rotateX = -yPercent * maxTilt;
        const rotateY = xPercent * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseenter', () => {
        playHoverChirp();
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
    });
  }

  /* ==========================================================================
     3. JARVIS 3D VOICE ASSISTANT & SPEECH SYNTHESIS
     ========================================================================== */
  function initSpeechSynthesis() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        const voices = window.speechSynthesis.getVoices();
        // Look for crisp futuristic English voice
        state.activeVoice = voices.find(v => 
          (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Daniel') || v.lang.startsWith('en'))
        ) || voices[0];
      };
    }
  }

  function speakJarvis(text) {
    if (!('speechSynthesis' in window)) {
      if (jarvisSpeechText) jarvisSpeechText.textContent = `"${text}"`;
      return;
    }

    window.speechSynthesis.cancel();
    state.isSpeaking = true;

    if (jarvisSpeechText) {
      jarvisSpeechText.textContent = `"${text}"`;
    }

    if (window.Jarvis3D && window.Jarvis3D.pulseReactor) {
      window.Jarvis3D.pulseReactor();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (state.activeVoice) utterance.voice = state.activeVoice;
    utterance.rate = 1.02;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      state.isSpeaking = false;
    };
    utterance.onerror = () => {
      state.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  // Voice wave visualizer animation
  function startVoiceWaveAnimation() {
    if (!voiceWaveCanvas) return;
    const ctx = voiceWaveCanvas.getContext('2d');
    let phase = 0;

    function renderWave() {
      requestAnimationFrame(renderWave);
      ctx.clearRect(0, 0, voiceWaveCanvas.width, voiceWaveCanvas.height);

      const width = voiceWaveCanvas.width;
      const height = voiceWaveCanvas.height;
      const centerY = height / 2;

      const amplitude = state.isSpeaking ? 22 : 6;
      phase += 0.06;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = state.isSpeaking ? '#ff7e40' : '#00f2fe';

      for (let x = 0; x < width; x += 4) {
        const y = centerY + Math.sin(x * 0.04 + phase) * amplitude * Math.sin(x / width * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    renderWave();
  }

  function openJarvisModal() {
    playJarvisBootHum();
    if (jarvisDialog && typeof jarvisDialog.showModal === 'function') {
      jarvisDialog.showModal();
    }
    speakJarvis("Greetings. I am Jarvis, personal AI companion for Abhishek Kumar Ranjan. What project or credential would you like me to highlight?");
  }

  function closeJarvisModal() {
    playClickBlip();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    state.isSpeaking = false;
    if (jarvisDialog) jarvisDialog.close();
  }

  if (jarvisVoiceBtn) jarvisVoiceBtn.addEventListener('click', openJarvisModal);
  if (heroJarvisBtn) heroJarvisBtn.addEventListener('click', openJarvisModal);
  if (jarvisCloseBtn) jarvisCloseBtn.addEventListener('click', closeJarvisModal);

  // Light dismiss on backdrop click for jarvisDialog
  if (jarvisDialog) {
    jarvisDialog.addEventListener('click', (e) => {
      const rect = jarvisDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeJarvisModal();
      }
    });
  }

  // Jarvis Command Chips
  const jarvisChips = document.querySelectorAll('.jarvis-cmd-chip');
  jarvisChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      playClickBlip();

      switch (cmd) {
        case 'intro':
          speakJarvis("Abhishek is an emerging software engineer and B.Com scholar based in Rohtas, India. He builds real-time intelligent agents and generative AI interfaces.");
          break;
        case 'projects':
          speakJarvis("Abhishek's primary project is Jarvis — conversational systems intelligence built with Python and GenAI. He also develops statistical visual analytics pipelines and client web experiences.");
          break;
        case 'credentials':
          speakJarvis("Abhishek holds dual certified completions in Artificial Intelligence: both an AI Internship and an intensive AI Course Mentorship Program completed in 2026, alongside his NorthCap University B.Com degree.");
          break;
        case 'contact':
          speakJarvis("You can reach Abhishek directly at abhishekkar090@gmail.com, or connect on LinkedIn and GitHub. He is actively available for work.");
          break;
      }
    });
  });

  // Direct Jarvis project test button
  const testVoiceBtns = document.querySelectorAll('.launch-voice-preview');
  testVoiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openJarvisModal();
      setTimeout(() => {
        speakJarvis("Simulating live voice pipeline. Jarvis agent online. Low latency WebSockets streaming active.");
      }, 500);
    });
  });

  /* ==========================================================================
     4. CERTIFICATE INSPECT MODAL (<dialog>)
     ========================================================================== */
  function openCertModal(src, title, issuer) {
    playClickBlip();
    if (!certDialog) return;

    dialogImg.src = src;
    dialogTitle.textContent = title;
    dialogSubtitle.textContent = issuer;
    dialogDownloadLink.href = src;

    if (typeof certDialog.showModal === 'function') {
      certDialog.showModal();
    }
  }

  function closeCertModal() {
    playClickBlip();
    if (certDialog) certDialog.close();
  }

  const certButtons = document.querySelectorAll('.preview-cert-btn');
  certButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const issuer = btn.getAttribute('data-issuer');
      openCertModal(src, title, issuer);
    });
  });

  if (dialogCloseBtn) dialogCloseBtn.addEventListener('click', closeCertModal);
  if (dialogDismissBtn) dialogDismissBtn.addEventListener('click', closeCertModal);

  // Light dismiss on backdrop click
  if (certDialog) {
    certDialog.addEventListener('click', (e) => {
      const rect = certDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeCertModal();
      }
    });
  }

  /* ==========================================================================
     5. CYBERPUNK CLI TERMINAL SYSTEM
     ========================================================================== */
  function toggleCli() {
    playClickBlip();
    const isHidden = cliDrawer.getAttribute('aria-hidden') === 'true';
    cliDrawer.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
    if (isHidden) {
      setTimeout(() => cliInput.focus(), 150);
    }
  }

  if (cliToggleBtn) cliToggleBtn.addEventListener('click', toggleCli);
  if (cliCloseBtn) cliCloseBtn.addEventListener('click', toggleCli);

  const CLI_COMMANDS = {
    help: () => [
      'Available System Commands:',
      '  whoami       - Current user & clearance level',
      '  about        - Bio & engineering philosophy',
      '  projects     - Selected software builds',
      '  skills       - Tech stack inventory',
      '  contact      - Reach out directly',
      '  jarvis       - Trigger speech synthesis',
      '  clear        - Clear terminal screen'
    ],
    whoami: () => [
      'User: Guest Explorer',
      'Location: Earth // WebGL Node',
      'Permissions: Read / Execute UI'
    ],
    about: () => [
      'Abhishek Kumar Ranjan: B.Com Student & Generative AI Builder.',
      'Rohtas, Bihar, India.',
      '"Commerce meets code. Learning by shipping."'
    ],
    projects: () => [
      '1. Jarvis          [LIVE] - AI Conversational Voice Interface',
      '2. Data Analysis   [WIP]  - Python / Pandas Analytics',
      '3. Web Design      [WIP]  - Client-facing 3D Web Solutions'
    ],
    skills: () => [
      'Languages & Frameworks:',
      '  • Python (Automation, AI, Scripting)',
      '  • Generative AI & Prompt Engineering',
      '  • Pandas & NumPy (Data Analysis)',
      '  • Three.js & WebGL 3D',
      '  • Modern CSS & Responsive Architecture',
      '  • JavaScript ES6+ & Web APIs'
    ],
    contact: () => [
      'Email:     abhishekkar090@gmail.com',
      'LinkedIn:  linkedin.com/in/abhishek-kumar-ranjan-b800b3401',
      'GitHub:    github.com/Abhishek-KR28',
      'Location:  Rohtas, Bihar, India'
    ],
    jarvis: () => {
      openJarvisModal();
      return ['Initializing Jarvis AI Core...'];
    },
    clear: () => {
      cliOutput.innerHTML = '';
      return [];
    }
  };

  if (cliForm) {
    cliForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = cliInput.value.trim().toLowerCase();
      if (!val) return;

      playClickBlip();

      // Echo command
      const cmdEcho = document.createElement('div');
      cmdEcho.className = 'cli-line';
      cmdEcho.innerHTML = `<span class="cli-prompt">visitor@akr:~$</span> ${val}`;
      cliOutput.appendChild(cmdEcho);

      // Execute
      if (CLI_COMMANDS[val]) {
        const lines = CLI_COMMANDS[val]();
        lines.forEach(line => {
          const l = document.createElement('div');
          l.className = 'cli-line';
          l.textContent = line;
          cliOutput.appendChild(l);
        });
      } else {
        const err = document.createElement('div');
        err.className = 'cli-line';
        err.textContent = `Command not recognized: "${val}". Type "help" for command list.`;
        cliOutput.appendChild(err);
      }

      cliInput.value = '';
      cliOutput.scrollTop = cliOutput.scrollHeight;
    });
  }

  /* ==========================================================================
     6. CLIPBOARD COPY UTILITY WITH NOTIFICATION
     ========================================================================== */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      playClickBlip();
      const email = 'abhishekkar090@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        copyEmailBtn.style.background = 'var(--accent-cyan)';
        copyEmailBtn.style.color = '#000';
        playSuccessChime();

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2000);
      } catch (err) {
        // Fallback
        window.location.href = `mailto:${email}`;
      }
    });
  }

  /* ==========================================================================
     7. SCROLL REVEAL OBSERVER
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ==========================================================================
     8. GLOBAL INITIALIZATION
     ========================================================================== */
  function init() {
    initTiltElements();
    initSpeechSynthesis();
    startVoiceWaveAnimation();
    initScrollReveal();

    // Universal button click sound
    document.querySelectorAll('.btn, .nav-item').forEach(el => {
      el.addEventListener('click', () => playClickBlip());
      el.addEventListener('mouseenter', () => playHoverChirp());
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
