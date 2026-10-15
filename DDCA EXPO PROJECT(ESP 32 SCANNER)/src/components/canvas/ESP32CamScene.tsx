import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SLIDES_DATA } from '../../data/slidesData';

interface ESP32CamSceneProps {
  currentSlideIndex: number;
  pixelMode?: boolean;
}

export const ESP32CamScene: React.FC<ESP32CamSceneProps> = ({
  currentSlideIndex,
  pixelMode = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateIndexRef = useRef<number>(currentSlideIndex);
  stateIndexRef.current = currentSlideIndex;

  // Pointer dragging refs
  const isDraggingRef = useRef<boolean>(false);
  const previousPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const manualRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateTimeout = useRef<any>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);

    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    camera.position.set(0, 2.2, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !pixelMode,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(pixelMode ? 0.6 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // --- 2. High-Precision Black & White Architectural Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4); // Pure high-contrast white key
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xaaaaaa, 1.2); // Soft monochrome fill
    fillLight.position.set(-4, -1, -3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 10); // Crisp white rim highlight
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // --- 3. Build Procedural ESP32-CAM 3D Model (Monochrome Architectural Styling) ---
    const esp32Group = new THREE.Group();
    scene.add(esp32Group);

    // 3a. PCB Board (Matte Obsidian Black Solder Mask)
    const pcbGeo = new THREE.BoxGeometry(2.7, 0.12, 4.0);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c0e,
      roughness: 0.4,
      metalness: 0.15,
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.castShadow = true;
    pcb.receiveShadow = true;
    esp32Group.add(pcb);

    // 4 Corner Silver Chrome Mounting Holes
    const holeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 16);
    const holeMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95, roughness: 0.2 });
    [
      [-1.15, 0, -1.8],
      [1.15, 0, -1.8],
      [-1.15, 0, 1.8],
      [1.15, 0, 1.8],
    ].forEach(([hx, hy, hz]) => {
      const hole = new THREE.Mesh(holeGeo, holeMat);
      hole.position.set(hx, hy, hz);
      esp32Group.add(hole);
    });

    // 3b. Metal RF Shielding Can (Brushed Platinum/Silver)
    const shieldGeo = new THREE.BoxGeometry(1.65, 0.25, 1.75);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeee,
      metalness: 0.92,
      roughness: 0.2,
    });
    const shield = new THREE.Mesh(shieldGeo, shieldMat);
    shield.position.set(0, 0.18, 0.5);
    shield.castShadow = true;
    esp32Group.add(shield);

    // Shield Texture (Monochrome High Contrast)
    const shieldCanvas = document.createElement('canvas');
    shieldCanvas.width = 256;
    shieldCanvas.height = 256;
    const sCtx = shieldCanvas.getContext('2d');
    if (sCtx) {
      sCtx.fillStyle = '#f4f4f5';
      sCtx.fillRect(0, 0, 256, 256);
      sCtx.fillStyle = '#09090b';
      sCtx.font = 'bold 24px monospace';
      sCtx.textAlign = 'center';
      sCtx.fillText('ESP32-CAM', 128, 70);
      sCtx.font = '16px monospace';
      sCtx.fillText('HARDWARE CONTROLLER', 128, 105);
      sCtx.fillText('Wireless Access Node', 128, 140);
      sCtx.fillText('DDCA CAPSTONE', 128, 175);
      sCtx.lineWidth = 4;
      sCtx.strokeStyle = '#27272a';
      sCtx.strokeRect(14, 14, 228, 228);
    }
    const shieldTex = new THREE.CanvasTexture(shieldCanvas);
    shieldTex.colorSpace = THREE.SRGBColorSpace;
    const labelGeo = new THREE.PlaneGeometry(1.5, 1.6);
    const labelMat = new THREE.MeshBasicMaterial({ map: shieldTex, transparent: true, opacity: 0.95 });
    const shieldLabel = new THREE.Mesh(labelGeo, labelMat);
    shieldLabel.rotation.x = -Math.PI / 2;
    shieldLabel.position.set(0, 0.31, 0.5);
    esp32Group.add(shieldLabel);

    // 3c. PCB Silver Trace Antenna (Meander shape)
    const antennaGroup = new THREE.Group();
    antennaGroup.position.set(0, 0.08, -1.65);
    esp32Group.add(antennaGroup);

    const antMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9, roughness: 0.2 });
    const antBar1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 0.08), antMat);
    antennaGroup.add(antBar1);
    const antBar2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.04, 0.35), antMat);
    antBar2.position.set(-0.7, 0, 0.15);
    antennaGroup.add(antBar2);
    const antBar3 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.04, 0.08), antMat);
    antBar3.position.set(-0.3, 0, 0.3);
    antennaGroup.add(antBar3);

    // Theatrical Pulsing RF Rings (Pure White Monochromatic Waves)
    const ringGeo = new THREE.RingGeometry(0.4, 0.45, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
    });
    const rfRing1 = new THREE.Mesh(ringGeo, ringMat);
    rfRing1.rotation.x = -Math.PI / 2;
    antennaGroup.add(rfRing1);

    const rfRing2 = new THREE.Mesh(ringGeo, ringMat.clone());
    rfRing2.rotation.x = -Math.PI / 2;
    antennaGroup.add(rfRing2);

    // 3d. OV2640 Camera Lens Module (Matte Charcoal & Silver)
    const cameraGroup = new THREE.Group();
    cameraGroup.position.set(0, 0.2, -0.65);
    esp32Group.add(cameraGroup);

    const ffcGeo = new THREE.BoxGeometry(1.2, 0.15, 0.35);
    const ffcMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
    const ffc = new THREE.Mesh(ffcGeo, ffcMat);
    cameraGroup.add(ffc);

    const camBodyGeo = new THREE.BoxGeometry(0.85, 0.35, 0.85);
    const camBodyMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
    const camBody = new THREE.Mesh(camBodyGeo, camBodyMat);
    camBody.position.set(0, 0.15, -0.1);
    camBody.castShadow = true;
    cameraGroup.add(camBody);

    const barrelGeo = new THREE.CylinderGeometry(0.3, 0.35, 0.25, 24);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.8, roughness: 0.3 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.position.set(0, 0.35, -0.1);
    cameraGroup.add(barrel);

    const lensGeo = new THREE.SphereGeometry(0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.3,
      reflectivity: 0.95,
      clearcoat: 1.0,
    });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.position.set(0, 0.42, -0.1);
    cameraGroup.add(lens);

    // 3e. High-Power Flash LED (Crisp White)
    const flashGroup = new THREE.Group();
    flashGroup.position.set(0.85, 0.14, -0.65);
    esp32Group.add(flashGroup);

    const flashBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.1, 0.35),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    flashGroup.add(flashBase);

    const flashChipMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.5,
    });
    const flashChip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16),
      flashChipMat
    );
    flashChip.position.set(0, 0.06, 0);
    flashGroup.add(flashChip);

    const flashLight = new THREE.PointLight(0xffffff, 0, 5);
    flashLight.position.set(0, 0.3, 0);
    flashGroup.add(flashLight);

    // 3f. Onboard White Telemetry LED (Monochrome Access Pulse)
    const redLedMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.3,
    });
    const redLed = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.1), redLedMat);
    redLed.position.set(-0.85, 0.1, 1.45);
    esp32Group.add(redLed);

    const redLedLight = new THREE.PointLight(0xffffff, 0, 2);
    redLedLight.position.set(-0.85, 0.25, 1.45);
    esp32Group.add(redLedLight);

    // 3g. Dual Pin Header Sockets
    const pinHeaderMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
    const pinMetalMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });

    const pinHeaderGeo = new THREE.BoxGeometry(0.28, 0.35, 3.6);
    const leftHeader = new THREE.Mesh(pinHeaderGeo, pinHeaderMat);
    leftHeader.position.set(-1.22, -0.22, 0);
    esp32Group.add(leftHeader);

    const rightHeader = new THREE.Mesh(pinHeaderGeo, pinHeaderMat);
    rightHeader.position.set(1.22, -0.22, 0);
    esp32Group.add(rightHeader);

    const singlePinGeo = new THREE.BoxGeometry(0.08, 0.7, 0.08);
    for (let i = 0; i < 8; i++) {
      const zPos = -1.55 + i * 0.44;
      const pLeft = new THREE.Mesh(singlePinGeo, pinMetalMat);
      pLeft.position.set(-1.22, -0.45, zPos);
      esp32Group.add(pLeft);

      const pRight = new THREE.Mesh(singlePinGeo, pinMetalMat);
      pRight.position.set(1.22, -0.45, zPos);
      esp32Group.add(pRight);
    }

    // 3h. Soft Contact Shadow Plane underneath
    const shadowGeo = new THREE.PlaneGeometry(5.0, 6.0);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shCtx = shadowCanvas.getContext('2d');
    if (shCtx) {
      const grad = shCtx.createRadialGradient(64, 64, 10, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      shCtx.fillStyle = grad;
      shCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.7 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.9;
    scene.add(shadowPlane);

    // Floating Ambient Dust Sparks for Theatrical Atmosphere (Pure White Sparks)
    const particleCount = 40;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 6;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 4. Interactive Pointer Dragging / Orbiting ---
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousPointerPos.current = { x: clientX, y: clientY };
      if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousPointerPos.current.x;
      const deltaY = clientY - previousPointerPos.current.y;
      previousPointerPos.current = { x: clientX, y: clientY };

      manualRotation.current.y += deltaX * 0.008;
      manualRotation.current.x += deltaY * 0.008;
      manualRotation.current.x = Math.max(-0.7, Math.min(0.7, manualRotation.current.x));
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      autoRotateTimeout.current = setTimeout(() => {
        manualRotation.current.x *= 0.3;
        manualRotation.current.y *= 0.3;
      }, 3000);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domEl.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // --- 5. Animation Loop with Theatrical Camera Damping ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Retrieve target slide camera coordinates & focus for theatrics
      const targetSlide = SLIDES_DATA[stateIndexRef.current] || SLIDES_DATA[0];
      const { cameraPos, targetPos, rotation: targetRot, activeRFWaves, activeLEDGlow } = targetSlide.modelFocus;

      // Theatrical exponential smooth camera zoom
      camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraPos[0], 2.8, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraPos[1], 2.8, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraPos[2], 2.8, delta);

      // Model rotation damping + manual user drag offset
      const desiredRotX = targetRot[0] + manualRotation.current.x;
      const desiredRotY = targetRot[1] + manualRotation.current.y + (isDraggingRef.current ? 0 : Math.sin(time * 0.7) * 0.05);
      const desiredRotZ = targetRot[2];

      esp32Group.rotation.x = THREE.MathUtils.damp(esp32Group.rotation.x, desiredRotX, 3.5, delta);
      esp32Group.rotation.y = THREE.MathUtils.damp(esp32Group.rotation.y, desiredRotY, 3.5, delta);
      esp32Group.rotation.z = THREE.MathUtils.damp(esp32Group.rotation.z, desiredRotZ, 3.5, delta);

      // Atmospheric gentle hover
      esp32Group.position.y = Math.sin(time * 1.4) * 0.06;

      // Particle subtle drift
      particles.rotation.y = time * 0.03;

      // Theatrics: RF Waves on Antenna Slide
      if (activeRFWaves) {
        const pulse1 = (time * 2.0) % 1;
        const pulse2 = ((time * 2.0) + 0.5) % 1;
        rfRing1.scale.setScalar(1 + pulse1 * 2.5);
        (rfRing1.material as THREE.MeshBasicMaterial).opacity = (1 - pulse1) * 0.8;
        rfRing2.scale.setScalar(1 + pulse2 * 2.5);
        (rfRing2.material as THREE.MeshBasicMaterial).opacity = (1 - pulse2) * 0.8;
      } else {
        (rfRing1.material as THREE.MeshBasicMaterial).opacity = 0;
        (rfRing2.material as THREE.MeshBasicMaterial).opacity = 0;
      }

      // Theatrics: Optical LED Strobe on Output Verification Slide
      if (activeLEDGlow) {
        const strobe = Math.sin(time * 10) > 0 ? 1 : 0;
        redLedLight.intensity = strobe * 3.0;
        (redLedMat as THREE.MeshStandardMaterial).emissiveIntensity = strobe ? 2.0 : 0.2;
        flashLight.intensity = (Math.sin(time * 5) > 0.5) ? 4.0 : 0;
      } else {
        redLedLight.intensity = 0.2;
        (redLedMat as THREE.MeshStandardMaterial).emissiveIntensity = 0.3;
        flashLight.intensity = 0;
      }

      camera.lookAt(targetPos[0], targetPos[1], targetPos[2]);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domEl.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      renderer.dispose();
      pcbGeo.dispose();
      pcbMat.dispose();
    };
  }, [pixelMode]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      title="Click and drag to orbit the 3D ESP32-CAM module"
    />
  );
};
