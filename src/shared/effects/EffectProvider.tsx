import { useEffect, createContext, useContext, ReactNode } from 'react';
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
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // input, textarea 등에서는 파티클 생성 안함
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        return;
      }

      createClickParticles(e.clientX, e.clientY);
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <EffectContext.Provider value={{ enabled: true }}>
      {children}
    </EffectContext.Provider>
  );
};
