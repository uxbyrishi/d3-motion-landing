// D3 Motion Interactive Simulator
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('demo-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let animationId = null;
  let currentSample = 'particles';
  let isRendering = false;
  let renderProgress = 0;
  let angle = 0;

  // Preset selector
  const presetBtns = document.querySelectorAll('.preset-btn');
  const resDisplay = document.getElementById('res-display');
  const fpsDisplay = document.getElementById('fps-display');
  
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const w = btn.dataset.w;
      const h = btn.dataset.h;
      if (resDisplay) resDisplay.textContent = `${w} × ${h}`;
    });
  });

  // Sample Animation selector
  const sampleBtns = document.querySelectorAll('.sample-btn');
  sampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sampleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSample = btn.dataset.sample;
    });
  });

  // Canvas drawing loop
  function draw() {
    angle += 0.025;
    ctx.fillStyle = '#0B0C10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (currentSample === 'particles') {
      // Draw glowing particle rings
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      for (let i = 0; i < 36; i++) {
        const rad = (i / 36) * Math.PI * 2 + angle;
        const dist = 75 + Math.sin(angle * 2 + i) * 20;
        const x = Math.cos(rad) * dist;
        const y = Math.sin(rad) * dist;
        ctx.fillStyle = i % 2 === 0 ? '#4164E8' : '#F0EFEA';
        ctx.shadowColor = '#4164E8';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, (i % 3 === 0 ? 5 : 3), 0, Math.PI * 2);
        ctx.fill();
      }
      // Center D3 mark
      ctx.fillStyle = '#F0EFEA';
      ctx.font = 'bold 20px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('D3 MOTION', 0, 0);
      ctx.restore();

    } else if (currentSample === 'brutalist') {
      // Kinetic typography
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.fillStyle = '#4164E8';
      ctx.font = '900 36px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const offset = Math.sin(angle * 3) * 15;
      ctx.fillText('DRAG. DROP.', 0, -25 + offset);
      ctx.fillStyle = '#F0EFEA';
      ctx.fillText('DOWNLOAD.', 0, 30 - offset);
      
      ctx.strokeStyle = '#30343C';
      ctx.lineWidth = 2;
      ctx.strokeRect(-140, -60, 280, 120);
      ctx.restore();

    } else if (currentSample === 'cube') {
      // 3D Wireframe Cube
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      const size = 65;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(angle * 0.7);
      const sinB = Math.sin(angle * 0.7);

      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
      ];

      const projected = vertices.map(([x, y, z]) => {
        // Rotate Y
        let x1 = x * cosA - z * sinA;
        let z1 = z * cosA + x * sinA;
        // Rotate X
        let y2 = y * cosB - z1 * sinB;
        let z2 = z1 * cosB + y * sinB;
        
        const scale = 220 / (z2 + 3);
        return [x1 * size * (scale / 100), y2 * size * (scale / 100)];
      });

      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      ctx.strokeStyle = '#4164E8';
      ctx.shadowColor = '#4164E8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2.5;

      edges.forEach(([i, j]) => {
        ctx.beginPath();
        ctx.moveTo(projected[i][0], projected[i][1]);
        ctx.lineTo(projected[j][0], projected[j][1]);
        ctx.stroke();
      });
      ctx.restore();
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();

  // Render simulation trigger
  const runBtn = document.getElementById('run-sim-btn');
  const stageStatus = document.getElementById('stage-status');
  const progFill = document.getElementById('sim-prog-fill');
  const simPercent = document.getElementById('sim-percent');
  const creditSaved = document.getElementById('credit-saved-val');

  let creditsCount = 120;

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      if (isRendering) return;
      isRendering = true;
      runBtn.disabled = true;
      runBtn.textContent = 'Rendering 60 FPS...';
      renderProgress = 0;

      const stages = [
        { p: 15, text: 'Spawning local headless Chromium engine (0ms latency)...' },
        { p: 40, text: 'Decoding DOM styles & locking 60 FPS timeline...' },
        { p: 75, text: 'Capturing frames 0 to 180 into raw video buffer...' },
        { p: 92, text: 'Encoding broadcast H.264 MP4 with bundled FFmpeg...' },
        { p: 100, text: '✓ Render Ready! 0 credits used • 100% offline' }
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        renderProgress += 2;
        if (progFill) progFill.style.width = `${renderProgress}%`;
        if (simPercent) simPercent.textContent = `${renderProgress}%`;

        if (currentStep < stages.length && renderProgress >= stages[currentStep].p) {
          if (stageStatus) stageStatus.textContent = stages[currentStep].text;
          currentStep++;
        }

        if (renderProgress >= 100) {
          clearInterval(interval);
          isRendering = false;
          runBtn.disabled = false;
          runBtn.innerHTML = '<span>▶</span> Run Another Render';
          creditsCount += 15;
          if (creditSaved) creditSaved.textContent = `$${(creditsCount * 0.12).toFixed(2)}`;
        }
      }, 50);
    });
  }

  // FAQ Accordion
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(faq => {
    const q = faq.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        faq.classList.toggle('open');
      });
    }
  });
});
