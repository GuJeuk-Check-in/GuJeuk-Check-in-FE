import confetti from 'canvas-confetti';

// Confetti 폭죽 이펙트
export const fireConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
};

// 사이드에서 터지는 Confetti
export const fireSideConfetti = () => {
  const end = Date.now() + 500;

  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

// 클릭 위치에서 파티클 생성
export const createClickParticles = (x: number, y: number) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  const particleCount = 12;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';

    const size = Math.random() * 10 + 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.PI * 2 * i) / particleCount;
    const velocity = Math.random() * 80 + 50;

    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      left: ${x}px;
      top: ${y}px;
      box-shadow: 0 0 ${size}px ${color};
    `;

    document.body.appendChild(particle);

    const targetX = x + Math.cos(angle) * velocity;
    const targetY = y + Math.sin(angle) * velocity;

    particle.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        {
          transform: `translate(${targetX - x - size/2}px, ${targetY - y - size/2}px) scale(0)`,
          opacity: 0
        },
      ],
      {
        duration: 600,
        easing: 'cubic-bezier(0, 0.55, 0.45, 1)',
      }
    ).onfinish = () => particle.remove();
  }
};

// Ripple 물결 이펙트
export const createRipple = (e: React.MouseEvent<HTMLElement>) => {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 70%);
    border-radius: 50%;
    transform: scale(0);
    pointer-events: none;
    z-index: 1;
  `;

  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);

  ripple.animate(
    [
      { transform: 'scale(0)', opacity: 1 },
      { transform: 'scale(4)', opacity: 0 },
    ],
    {
      duration: 600,
      easing: 'ease-out',
    }
  ).onfinish = () => ripple.remove();
};

// 성공 이펙트 (폭죽 + 파티클)
export const fireSuccessEffect = () => {
  fireConfetti();

  // 화면 중앙에서 별 파티클
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const x = centerX + (Math.random() - 0.5) * 200;
      const y = centerY + (Math.random() - 0.5) * 200;
      createClickParticles(x, y);
    }, i * 50);
  }
};
