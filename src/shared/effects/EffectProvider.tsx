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
  const [showModal, setShowModal] = useState(false);
  const clickCountRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // 모달 내부 클릭은 카운트하지 않음
      if (target.closest('.easter-egg-modal')) {
        return;
      }

      // input, textarea 등에서는 파티클 생성 안함
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      createClickParticles(e.clientX, e.clientY);

      // 클릭 카운트 증가
      clickCountRef.current += 1;
      if (clickCountRef.current >= 3) {
        clickCountRef.current = 0;
        setShowModal(true);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <EffectContext.Provider value={{ enabled: true }}>
      {children}
      {showModal && (
        <div
          className="easter-egg-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
          }}
        >
          <img
            src="https://i.namu.wiki/i/DQUCZea2izH_VhiqG_3EfrRf_k6hHoSAczBh26KUxARCGy7U2xnlkVHc3eH9JdP7c2U0InKa3Jq2KJwE25IfeQ.webp"
            alt="Easter Egg"
            style={{
              maxWidth: '80%',
              maxHeight: '70vh',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          />
          <button
            onClick={() => setShowModal(false)}
            style={{
              marginTop: '24px',
              padding: '16px 32px',
              fontSize: '32px',
              backgroundColor: '#4CAF50',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            👍
          </button>
        </div>
      )}
    </EffectContext.Provider>
  );
};
