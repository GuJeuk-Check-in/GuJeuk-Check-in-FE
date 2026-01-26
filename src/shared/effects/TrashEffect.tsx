import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface TrashEffectProps {
  onComplete: () => void;
  itemRect?: DOMRect | null;
}

export const TrashEffect = ({ onComplete, itemRect }: TrashEffectProps) => {
  const [phase, setPhase] = useState<'suck' | 'done'>('suck');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('done');
      setTimeout(onComplete, 300);
    }, 800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const startX = itemRect ? itemRect.left + itemRect.width / 2 : window.innerWidth / 2;
  const startY = itemRect ? itemRect.top + itemRect.height / 2 : window.innerHeight / 2;

  return (
    <Overlay>
      <TrashCan>🗑️</TrashCan>
      <SuckingItem
        style={{
          '--start-x': `${startX}px`,
          '--start-y': `${startY}px`,
        } as React.CSSProperties}
      >
        📄
      </SuckingItem>
      <Particles>
        {[...Array(12)].map((_, i) => (
          <Particle
            key={i}
            style={{
              '--angle': `${(360 / 12) * i}deg`,
              '--delay': `${i * 0.05}s`,
            } as React.CSSProperties}
          />
        ))}
      </Particles>
    </Overlay>
  );
};

// 전역으로 사용할 수 있는 함수
let showTrashEffectCallback: ((rect?: DOMRect | null) => void) | null = null;

export const triggerTrashEffect = (itemRect?: DOMRect | null) => {
  if (showTrashEffectCallback) {
    showTrashEffectCallback(itemRect);
  }
};

export const TrashEffectProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    showTrashEffectCallback = (itemRect?: DOMRect | null) => {
      setRect(itemRect || null);
      setShow(true);
    };

    return () => {
      showTrashEffectCallback = null;
    };
  }, []);

  return (
    <>
      {children}
      {show && (
        <TrashEffect
          itemRect={rect}
          onComplete={() => setShow(false)}
        />
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99999;
`;

const bounceIn = keyframes`
  0% { transform: translate(-50%, 100%) scale(0); }
  50% { transform: translate(-50%, -10%) scale(1.2); }
  100% { transform: translate(-50%, 0%) scale(1); }
`;

const shake = keyframes`
  0%, 100% { transform: translate(-50%, 0%) rotate(0deg); }
  25% { transform: translate(-50%, 0%) rotate(-10deg); }
  75% { transform: translate(-50%, 0%) rotate(10deg); }
`;

const TrashCan = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  font-size: 120px;
  animation: ${bounceIn} 0.4s ease-out, ${shake} 0.2s ease-in-out 0.5s 3;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
`;

const suckIn = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(0.8) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(50vw - 50%), calc(100vh - 150px - 50%)) scale(0) rotate(720deg);
    opacity: 0;
  }
`;

const SuckingItem = styled.div`
  position: absolute;
  left: var(--start-x);
  top: var(--start-y);
  font-size: 60px;
  animation: ${suckIn} 0.8s ease-in forwards;
`;

const explode = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(
      calc(-50% + cos(var(--angle)) * 100px),
      calc(-50% + sin(var(--angle)) * 100px)
    ) scale(1);
    opacity: 0;
  }
`;

const Particles = styled.div`
  position: absolute;
  bottom: 110px;
  left: 50%;
`;

const Particle = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background: linear-gradient(45deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff);
  border-radius: 50%;
  animation: particleExplode 0.6s ease-out forwards;
  animation-delay: var(--delay);
  opacity: 0;

  @keyframes particleExplode {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
    }
    100% {
      transform: translate(
        calc(-50% + ${props => Math.cos(Math.random() * Math.PI * 2) * 80}px),
        calc(-50% + ${props => Math.sin(Math.random() * Math.PI * 2) * 80}px)
      ) scale(0);
      opacity: 0;
    }
  }
`;
