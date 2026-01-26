import { useEffect, createContext, useContext, ReactNode, useState, useRef } from 'react';
import { createClickParticles } from './useEffects';

interface EffectContextType {
  enabled: boolean;
}

const EffectContext = createContext<EffectContextType>({ enabled: true });

export const useEffectContext = () => useContext(EffectContext);

interface EffectProviderProps {
  children: ReactNode;
}

export const EffectProvider = ({ children }: EffectProviderProps) => {
  const [isDizzy, setIsDizzy] = useState(false);
  const mousePositionsRef = useRef<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // input, textarea 등에서는 파티클 생성 안함
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      createClickParticles(e.clientX, e.clientY);
    };

    // 마우스 흔들기 감지
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const positions = mousePositionsRef.current;

      positions.push({ x: e.clientX, y: e.clientY, time: now });

      // 최근 500ms 데이터만 유지
      while (positions.length > 0 && now - positions[0].time > 500) {
        positions.shift();
      }

      // 최소 10개 포인트가 있을 때 흔들림 감지
      if (positions.length >= 10) {
        let totalDistance = 0;
        let directionChanges = 0;
        let lastDx = 0;
        let lastDy = 0;

        for (let i = 1; i < positions.length; i++) {
          const dx = positions[i].x - positions[i - 1].x;
          const dy = positions[i].y - positions[i - 1].y;
          totalDistance += Math.sqrt(dx * dx + dy * dy);

          // 방향 전환 감지
          if (i > 1) {
            if ((dx > 0 && lastDx < 0) || (dx < 0 && lastDx > 0)) directionChanges++;
            if ((dy > 0 && lastDy < 0) || (dy < 0 && lastDy > 0)) directionChanges++;
          }
          lastDx = dx;
          lastDy = dy;
        }

        // 빠른 움직임 + 많은 방향 전환 = 흔들기
        if (totalDistance > 800 && directionChanges > 8 && !isDizzy) {
          setIsDizzy(true);
          mousePositionsRef.current = [];
          setTimeout(() => setIsDizzy(false), 2000);
        }
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDizzy]);

  return (
    <EffectContext.Provider value={{ enabled: true }}>
      {isDizzy && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 99998,
            animation: 'dizzyEffect 0.1s infinite',
            background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.3) 100%)',
          }}
        >
          <style>{`
            @keyframes dizzyEffect {
              0% { transform: rotate(-2deg) scale(1.02); filter: blur(2px) hue-rotate(0deg); }
              25% { transform: rotate(2deg) scale(0.98); filter: blur(3px) hue-rotate(90deg); }
              50% { transform: rotate(-1deg) scale(1.01); filter: blur(2px) hue-rotate(180deg); }
              75% { transform: rotate(1deg) scale(0.99); filter: blur(4px) hue-rotate(270deg); }
              100% { transform: rotate(-2deg) scale(1.02); filter: blur(2px) hue-rotate(360deg); }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '100px',
            animation: 'spin 0.3s linear infinite',
          }}>
            😵‍💫
          </div>
          <style>{`
            @keyframes spin {
              from { transform: translate(-50%, -50%) rotate(0deg); }
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          `}</style>
        </div>
      )}
      {children}
    </EffectContext.Provider>
  );
};
