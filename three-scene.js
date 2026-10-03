/**
 * Abhishek Kumar Ranjan — 3D WebGL Three.js Cyber Engine
 * Features:
 * - Holographic Jarvis Core with concentric gyroscopic rings & energy core
 * - Dynamic 3D interactive particle field with cursor gravitation
 * - Scroll-driven 3D camera path transitions across portfolio sections
 * - Performance-optimized RAF loop with battery-saving visibility handling
 */

(function () {
  'use strict';

  // Canvas & Dimensions
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') {
    console.warn('Three.js or WebGL canvas not available. Running fallback mode.');
    return;
  }

  let scene, camera, renderer;
  let jarvisCoreGroup, innerGeometry, ring1, ring2, ring3, particlePoints;
  let particlesCount = 1800;
  let particlePositions, particleColors;
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let scrollProgress = 0;
  let isVisible = true;
  let gyroReadout = document.getElementById('gyro-readout');

  // Colors
  const COLOR_CYAN = 0x00f2fe;
  const COLOR_AMBER = 0xff7e40;
  const COLOR_PURPLE = 0x9d4edd;
  const COLOR_EMERALD = 0x00f5a0;

  function init() {
    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070c, 0.0018);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(COLOR_CYAN, 2.5, 50);
    cyanPointLight.position.set(15, 12, 10);
    scene.add(cyanPointLight);

    const amberPointLight = new THREE.PointLight(COLOR_AMBER, 2.2, 50);
    amberPointLight.position.set(-15, -10, 8);
    scene.add(amberPointLight);

    // 5. Build Jarvis 3D Core
    buildJarvisCore();

    // 6. Build Interactive Particle Nebula
    buildParticleNebula();

    // 7. Event Listeners
    window.addEventListener('resize', onWindowResize, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial positioning
    updateCameraOnScroll();

    // Start loop
    animate();
  }

  function buildJarvisCore() {
    jarvisCoreGroup = new THREE.Group();
    jarvisCoreGroup.position.set(7, 1, 0); // Placed slightly to the right for Hero view

    // Central pulsing icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x0d1b2a,
      emissive: COLOR_CYAN,
      emissiveIntensity: 0.4,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8
    });
    innerGeometry = new THREE.Mesh(icoGeo, icoMat);
    jarvisCoreGroup.add(innerGeometry);

    // Inner glowing sphere
    const sphereGeo = new THREE.SphereGeometry(1.2, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: COLOR_AMBER,
      wireframe: false
    });
    const innerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    jarvisCoreGroup.add(innerSphere);

    // Ring 1 (Torus - Cyan Glow)
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: COLOR_CYAN });
    ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    jarvisCoreGroup.add(ring1);

    // Ring 2 (Torus - Amber dashed effect with Tube)
    const ringGeo2 = new THREE.TorusGeometry(4.8, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: COLOR_AMBER });
    ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    jarvisCoreGroup.add(ring2);

    // Ring 3 (Outer Cyberspace Orbit Ring)
    const ringGeo3 = new THREE.TorusGeometry(6.0, 0.03, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: COLOR_PURPLE });
    ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    jarvisCoreGroup.add(ring3);

    // Satellite Data Nodes
    const nodeGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const nodeMat = new THREE.MeshBasicMaterial({ color: COLOR_EMERALD });
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 8) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 4.8, Math.sin(angle) * 4.8, 0);
      ring2.add(node);
    }

    scene.add(jarvisCoreGroup);
  }

  function buildParticleNebula() {
    const geometry = new THREE.BufferGeometry();
    particlePositions = new Float32Array(particlesCount * 3);
    particleColors = new Float32Array(particlesCount * 3);

    const color1 = new THREE.Color(COLOR_CYAN);
    const color2 = new THREE.Color(COLOR_AMBER);
    const color3 = new THREE.Color(COLOR_PURPLE);

    for (let i = 0; i < particlesCount; i++) {
      // Cylindrical/spherical galactic scatter
      const radius = 8 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi);
      const z = (Math.random() - 0.5) * 40;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      // Color variation
      let choice = Math.random();
      let pickedColor = choice < 0.5 ? color1 : choice < 0.8 ? color2 : color3;
      particleColors[i * 3] = pickedColor.r;
      particleColors[i * 3 + 1] = pickedColor.g;
      particleColors[i * 3 + 2] = pickedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    // Custom textured circular particle point
    const canvasTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      size: 0.35,
      map: canvasTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particlePoints = new THREE.Points(geometry, material);
    scene.add(particlePoints);
  }

  function createCircleTexture() {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    grad.addColorStop(0.7, 'rgba(255,255,255,0.2)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.Texture(c);
    texture.needsUpdate = true;
    return texture;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function onMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    updateCameraOnScroll();
  }

  function updateCameraOnScroll() {
    if (!jarvisCoreGroup) return;

    // Fluid spatial transitions depending on scroll progress
    // Hero -> Work -> Skills -> Documents -> About -> Contact
    const p = scrollProgress;

    // Core drifts across 3D space
    const targetX = (1 - p * 1.5) * 7 - (p * 5);
    const targetY = 1 - p * 6;
    const targetZ = -p * 12;

    jarvisCoreGroup.position.x += (targetX - jarvisCoreGroup.position.x) * 0.08;
    jarvisCoreGroup.position.y += (targetY - jarvisCoreGroup.position.y) * 0.08;
    jarvisCoreGroup.position.z += (targetZ - jarvisCoreGroup.position.z) * 0.08;

    // Camera subtle tracking
    camera.position.y = -p * 8;
  }

  function onVisibilityChange() {
    isVisible = !document.hidden;
  }

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Smooth mouse lerping
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Rotate core elements
    if (jarvisCoreGroup) {
      innerGeometry.rotation.x += delta * 0.35;
      innerGeometry.rotation.y += delta * 0.5;

      ring1.rotation.z += delta * 0.4;
      ring1.rotation.x = Math.sin(time * 0.5) * 0.2;

      ring2.rotation.y += delta * 0.6;
      ring2.rotation.z = Math.cos(time * 0.6) * 0.2;

      ring3.rotation.x += delta * 0.25;
      ring3.rotation.y += delta * 0.3;

      // Mouse tilt reaction
      jarvisCoreGroup.rotation.y = mouseX * 0.45;
      jarvisCoreGroup.rotation.x = -mouseY * 0.35;

      // Update gyro readout text in UI
      if (gyroReadout && Math.random() < 0.1) {
        gyroReadout.textContent = `CORE: [ ROT_X: ${(jarvisCoreGroup.rotation.x).toFixed(2)} | ROT_Y: ${(jarvisCoreGroup.rotation.y).toFixed(2)} ]`;
      }
    }

    // Rotate particle cloud gently
    if (particlePoints) {
      particlePoints.rotation.y = time * 0.03 + mouseX * 0.1;
      particlePoints.rotation.x = time * 0.015 - mouseY * 0.08;
    }

    renderer.render(scene, camera);
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global controller for interactive UI triggers (e.g. Jarvis dialogue burst)
  window.Jarvis3D = {
    pulseReactor: function () {
      if (!jarvisCoreGroup) return;
      const startScale = 1.0;
      let scale = 1.4;
      const interval = setInterval(() => {
        scale -= 0.04;
        if (scale <= startScale) {
          scale = startScale;
          clearInterval(interval);
        }
        if (innerGeometry) innerGeometry.scale.set(scale, scale, scale);
      }, 16);
    }
  };
})();
