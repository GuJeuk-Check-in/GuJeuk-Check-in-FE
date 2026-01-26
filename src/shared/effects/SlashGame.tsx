import { useState, useEffect, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { fireConfetti } from './useEffects';

interface SlashGameProps {
  onClose: () => void;
  onComplete: () => void;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  hit: boolean;
}

interface SlashTrail {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export const SlashGame = ({ onClose, onComplete }: SlashGameProps) => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [slashTrails, setSlashTrails] = useState<SlashTrail[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [isSlashing, setIsSlashing] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // 적 생성
  useEffect(() => {
    const initialEnemies: Enemy[] = [];
    for (let i = 0; i < 5; i++) {
      initialEnemies.push({
        id: i,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 50,
        hp: 3,
        maxHp: 3,
        hit: false,
      });
    }
    setEnemies(initialEnemies);
  }, []);

  // 승리 체크
  useEffect(() => {
    if (enemies.length > 0 && enemies.every(e => e.hp <= 0)) {
      setVictory(true);
      setGameOver(true);
      fireConfetti();
    }
  }, [enemies]);

  // 슬래시 트레일 제거
  useEffect(() => {
    if (slashTrails.length > 0) {
      const timer = setTimeout(() => {
        setSlashTrails(prev => prev.slice(1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [slashTrails]);

  const handleMouseDown = () => {
    setIsSlashing(true);
    lastPosRef.current = null;
  };

  const handleMouseUp = () => {
    setIsSlashing(false);
    lastPosRef.current = null;
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isSlashing || !gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (lastPosRef.current) {
      // 슬래시 트레일 추가
      setSlashTrails(prev => [...prev, {
        id: Date.now(),
        x1: lastPosRef.current!.x,
        y1: lastPosRef.current!.y,
        x2: x,
        y2: y,
      }]);

      // 적과 충돌 체크
      setEnemies(prev => prev.map(enemy => {
        if (enemy.hp <= 0) return enemy;

        const dist = Math.sqrt(
          Math.pow(enemy.x - x, 2) + Math.pow(enemy.y - y, 2)
        );

        if (dist < 12 && !enemy.hit) {
          setScore(s => s + 50);
          return { ...enemy, hp: enemy.hp - 1, hit: true };
        }
        return { ...enemy, hit: false };
      }));
    }

    lastPosRef.current = { x, y };
  }, [isSlashing]);

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  return (
    <Overlay>
      <GameContainer>
        <Header>
          <Score>💀 처치: {enemies.filter(e => e.hp <= 0).length}/5</Score>
          <Title>⚔️ 고블린을 베어라! ⚔️</Title>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <GameArea
          ref={gameAreaRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <Instructions>
            {!gameOver && "마우스를 드래그해서 고블린을 베세요!"}
          </Instructions>

          {/* 슬래시 트레일 */}
          <SlashSvg>
            {slashTrails.map(trail => (
              <SlashLine
                key={trail.id}
                x1={`${trail.x1}%`}
                y1={`${trail.y1}%`}
                x2={`${trail.x2}%`}
                y2={`${trail.y2}%`}
              />
            ))}
          </SlashSvg>

          {/* 적들 */}
          {enemies.map(enemy => (
            <EnemyContainer
              key={enemy.id}
              style={{ left: `${enemy.x}%`, top: `${enemy.y}%` }}
              dead={enemy.hp <= 0}
              hit={enemy.hit}
            >
              <EnemyImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcPSac91QjaH-rXOjqf9fUr9w8USGFLH7DUA&s"
                alt="Goblin"
                dead={enemy.hp <= 0}
              />
              <HpBar>
                <HpFill style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
              </HpBar>
              {enemy.hit && enemy.hp > 0 && <HitEffect>💥</HitEffect>}
              {enemy.hp <= 0 && <DeathEffect>☠️</DeathEffect>}
            </EnemyContainer>
          ))}

          {/* 커서 */}
          {isSlashing && <SwordCursor>🗡️</SwordCursor>}
        </GameArea>

        {gameOver && (
          <GameOverOverlay>
            <GameOverContent>
              {victory ? (
                <>
                  <VictoryTitle>🎉 승리! 🎉</VictoryTitle>
                  <VictoryText>모든 고블린을 처치했습니다!</VictoryText>
                </>
              ) : (
                <>
                  <DefeatTitle>💀 실패... 💀</DefeatTitle>
                  <DefeatText>다시 도전하세요!</DefeatText>
                </>
              )}
              <ButtonGroup>
                <ActionButton onClick={() => {
                  setEnemies([]);
                  setScore(0);
                  setGameOver(false);
                  setVictory(false);
                  setTimeout(() => {
                    const newEnemies: Enemy[] = [];
                    for (let i = 0; i < 5; i++) {
                      newEnemies.push({
                        id: i,
                        x: 15 + Math.random() * 70,
                        y: 20 + Math.random() * 50,
                        hp: 3,
                        maxHp: 3,
                        hit: false,
                      });
                    }
                    setEnemies(newEnemies);
                  }, 100);
                }}>
                  다시 하기
                </ActionButton>
                <ActionButton onClick={handleComplete} primary>
                  계속하기
                </ActionButton>
              </ButtonGroup>
            </GameOverContent>
          </GameOverOverlay>
        )}
      </GameContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const GameContainer = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  background: linear-gradient(180deg, #2d1f3d 0%, #1a0a2e 100%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(150, 0, 255, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
`;

const Score = styled.div`
  font-size: 20px;
  color: #ff6b6b;
  font-weight: bold;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #ffd700;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const CloseButton = styled.button`
  background: #ff4444;
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  &:hover { background: #ff6666; }
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 66px);
  cursor: crosshair;
  user-select: none;
`;

const Instructions = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  text-align: center;
`;

const SlashSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const SlashLine = styled.line`
  stroke: #00ffff;
  stroke-width: 4;
  stroke-linecap: round;
  filter: drop-shadow(0 0 8px #00ffff);
`;

const shake = keyframes`
  0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
  25% { transform: translate(-45%, -55%) rotate(-5deg); }
  75% { transform: translate(-55%, -45%) rotate(5deg); }
`;

const fadeOut = keyframes`
  0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5) rotate(45deg); }
`;

const EnemyContainer = styled.div<{ dead: boolean; hit: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.1s;
  ${props => props.hit && !props.dead && `animation: ${shake} 0.2s ease-in-out;`}
  ${props => props.dead && `animation: ${fadeOut} 0.5s ease-out forwards;`}
`;

const EnemyImage = styled.img<{ dead: boolean }>`
  width: 100px;
  height: 100px;
  object-fit: contain;
  filter: ${props => props.dead ? 'grayscale(100%) brightness(0.5)' : 'none'};
  transition: filter 0.3s;
`;

const HpBar = styled.div`
  width: 80px;
  height: 8px;
  background: #333;
  border-radius: 4px;
  margin: 5px auto 0;
  overflow: hidden;
`;

const HpFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #ff0000, #ff6b6b);
  transition: width 0.2s;
`;

const popIn = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

const HitEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  animation: ${popIn} 0.3s ease-out;
`;

const DeathEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  animation: ${popIn} 0.5s ease-out;
`;

const SwordCursor = styled.div`
  position: fixed;
  pointer-events: none;
  font-size: 40px;
  transform: translate(-50%, -50%) rotate(-45deg);
  z-index: 1000;
`;

const GameOverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameOverContent = styled.div`
  text-align: center;
`;

const VictoryTitle = styled.h2`
  font-size: 48px;
  color: #ffd700;
  margin-bottom: 10px;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
`;

const VictoryText = styled.p`
  font-size: 24px;
  color: #00ff88;
  margin-bottom: 30px;
`;

const DefeatTitle = styled.h2`
  font-size: 48px;
  color: #ff4444;
  margin-bottom: 10px;
`;

const DefeatText = styled.p`
  font-size: 24px;
  color: #aaa;
  margin-bottom: 30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  padding: 15px 35px;
  font-size: 18px;
  background: ${props => props.primary
    ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)'
    : 'linear-gradient(135deg, #666 0%, #444 100%)'};
  border: none;
  border-radius: 25px;
  color: ${props => props.primary ? '#000' : '#fff'};
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
`;
