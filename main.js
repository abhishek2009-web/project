    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
              const satMat = new THREE.MeshBasicMaterial({ color: 0xffb547, wireframe: true });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData = { radius: 2.0, angle: (i * Math.PI * 2) / 3, speed: 0.8 };
      nodeBiz.add(sat);
      bizSatellites.push(sat);
    }
    // --- MEDIA HOUSE (CYAN OCTAHEDRON NODE) ---
    const mediaGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const mediaMat = new THREE.MeshBasicMaterial({ color: 0x33e6ff, wireframe: true, transparent: true, opacity: 0.85 });
    const mediaMesh = new THREE.Mesh(mediaGeo, mediaMat);
    const mediaInnerGeo = new THREE.SphereGeometry(0.75, 8, 8);
    const mediaInnerMat = new THREE.MeshBasicMaterial({ color: 0x7c6bff, wireframe: true, transparent: true, opacity: 0.4 });
    const mediaInner = new THREE.Mesh(mediaInnerGeo, mediaInnerMat);
    nodeMedia = new THREE.Group();
    nodeMedia.add(mediaMesh);
    nodeMedia.add(mediaInner);
    nodeMedia.position.set(2.8, -0.4, 0);
    nodeMedia.userData = { id: 'media', title: 'Media House' };
    groupHouses.add(nodeMedia);
    // Media Satellites (3 Depts)
    for (let i = 0; i < 3; i++) {
      const satGeo = new THREE.IcosahedronGeometry(0.22, 0);
      const satMat = new THREE.MeshBasicMaterial({ color: 0x33e6ff, wireframe: true });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData = { radius: 2.0, angle: (i * Math.PI * 2) / 3 + 0.5, speed: -0.9 };
      nodeMedia.add(sat);
      mediaSatellites.push(sat);
    }
          nodeMedia.rotation.y = -elapsedTime * 0.35;
    nodeMedia.position.y = -0.4 + Math.cos(elapsedTime * 0.7) * 0.15;
    coreNexus.rotation.y = elapsedTime * 0.5;
    coreNexus.rotation.x = elapsedTime * 0.4;
    // 4D Particle Warp Vortex
    if (particleSystem) {
      particleSystem.rotation.y = elapsedTime * 0.05 * (state.mode4D ? 4 : 1);
      particleSystem.rotation.z = elapsedTime * 0.02;
    }
    if (controls) controls.update();
    renderer.render(scene, camera);
  }
  // ----------------------------------------------------
  // 4D SIMULATION TIMELINE LOGIC
  // ----------------------------------------------------
  let timelineInterval = null;
  function updateTimelineUI(stepVal) {
    state.timelineStep = parseInt(stepVal, 10);
    const scrubber = document.getElementById('timeline-scrubber');
    if (scrubber) scrubber.value = state.timelineStep;
    const phaseIdx = Math.min(Math.floor((state.timelineStep / 100) * 5), 4);
    const currentPhase = state.timelinePhases[phaseIdx];
    // Update Dock Display
    const timeDisplay = document.getElementById('dock-time-display');
    if (timeDisplay) timeDisplay.textContent = currentPhase.time;
        // 1. Audio Toggle
    const btnAudio = document.getElementById('btn-audio-toggle');
    if (btnAudio) {
      btnAudio.addEventListener('click', () => {
        state.audioEnabled = !state.audioEnabled;
        btnAudio.querySelector('.lbl').textContent = `Audio: ${state.audioEnabled ? 'ON' : 'OFF'}`;
        playSound('click');
      });
    }
    // 2. 4D Dimension Mode Toggle
    const btn4D = document.getElementById('btn-4d-toggle');
    if (btn4D) {
      btn4D.addEventListener('click', () => {
        state.mode4D = !state.mode4D;
        document.body.classList.toggle('mode-4d', state.mode4D);
        playSound('warp');
        if (state.mode4D) {
          focusCameraOn(0, 0, 11);
        } else {
          focusCameraOn(0, 0, 9);
        }
      });
    }
    // 3. Timeline Scrubber Events
    const scrubber = document.getElementById('timeline-scrubber');
    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        updateTimelineUI(e.target.value);
      });
    }
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        playSound('hover');
        const brandName = pill.getAttribute('data-brand');
        const select = document.getElementById('auction-brand-select');
        if (select) select.value = brandName;
        openAuction();
      });
    });
    // 8. 3D Tilt Effect on Division Cards
    const cards = [document.getElementById('tilt-biz'), document.getElementById('tilt-media')];
    cards.forEach(card => {
      if (!card) return;
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
      });
    });
    // Hover sounds for general UI buttons
    document.querySelectorAll('.btn, .nav-btn, .dept, .stake-item').forEach(btn => {
      btn.addEventListener('mouseenter', () => playSound('hover'));
    });
  });
})();
