import { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface MiniGameProps {
  onClose: () => void;
}

interface Builder {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

export const MiniGame = ({ onClose }: MiniGameProps) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [builders, setBuilders] = useState<Builder[]>([]);
  const [gameOver, setGameOver] = useState(false);

  // 빌더 생성
  const spawnBuilder = useCallback(() => {
    const newBuilder: Builder = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      speedX: (Math.random() - 0.5) * 4,
      speedY: (Math.random() - 0.5) * 4,
    };
    setBuilders(prev => [...prev, newBuilder]);
  }, []);

  // 빌더 이동
  useEffect(() => {
    if (gameOver) return;

    const moveInterval = setInterval(() => {
      setBuilders(prev => prev.map(builder => {
        let newX = builder.x + builder.speedX;
        let newY = builder.y + builder.speedY;
        let newSpeedX = builder.speedX;
        let newSpeedY = builder.speedY;

        if (newX <= 0 || newX >= 90) newSpeedX = -newSpeedX;
        if (newY <= 10 || newY >= 80) newSpeedY = -newSpeedY;

        return {
          ...builder,
          x: Math.max(0, Math.min(90, newX)),
          y: Math.max(10, Math.min(80, newY)),
          speedX: newSpeedX,
          speedY: newSpeedY,
        };
      }));
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameOver]);

  // 빌더 스폰
  useEffect(() => {
    if (gameOver) return;

    spawnBuilder();
    spawnBuilder();
    spawnBuilder();

    const spawnInterval = setInterval(() => {
      if (builders.length < 8) {
        spawnBuilder();
      }
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [gameOver]);

  // 타이머
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // 빌더 클릭
  const handleBuilderClick = (id: number) => {
    if (gameOver) return;
    setScore(prev => prev + 100);
    setBuilders(prev => prev.filter(b => b.id !== id));
  };

  return (
    <Overlay>
      <GameContainer>
        <Header>
          <Score>점수: {score}</Score>
          <Timer urgent={timeLeft <= 5}>⏱️ {timeLeft}초</Timer>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>

        <GameTitle>🔨 빌더를 잡아라! 🔨</GameTitle>

        <GameArea>
          {builders.map(builder => (
            <BuilderImage
              key={builder.id}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfC-gXi_Ed2IW4yN7cjqHtDzDvEyd649snFA&s"
              style={{ left: `${builder.x}%`, top: `${builder.y}%` }}
              onClick={() => handleBuilderClick(builder.id)}
            />
          ))}
        </GameArea>

        {gameOver && (
          <GameOverOverlay>
            <GameOverContent>
              <GameOverTitle>🎮 게임 오버! 🎮</GameOverTitle>
              <FinalScore>최종 점수: {score}점</FinalScore>
              <ScoreMessage>
                {score >= 1000 ? '🏆 빌더 마스터!' :
                 score >= 500 ? '👍 잘했어요!' :
                 '💪 다시 도전!'}
              </ScoreMessage>
              <PlayAgainButton onClick={() => {
                setScore(0);
                setTimeLeft(15);
                setBuilders([]);
                setGameOver(false);
              }}>
                다시 하기
              </PlayAgainButton>
              <CloseGameButton onClick={onClose}>닫기</CloseGameButton>
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
  max-width: 800px;
  height: 80vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 50px rgba(0, 200, 255, 0.3);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.3);
`;

const Score = styled.div`
  font-size: 24px;
  color: #00ff88;
  font-weight: bold;
`;

const Timer = styled.div<{ urgent: boolean }>`
  font-size: 24px;
  color: ${props => props.urgent ? '#ff4444' : '#ffffff'};
  font-weight: bold;
  ${props => props.urgent && 'animation: pulse 0.5s infinite;'}

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const CloseButton = styled.button`
  background: #ff4444;
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: #ff6666;
  }
`;

const GameTitle = styled.h1`
  text-align: center;
  color: #ffd700;
  font-size: 28px;
  margin: 10px 0;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const GameArea = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 150px);
`;

const bounce = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
`;

const BuilderImage = styled.img`
  position: absolute;
  width: 80px;
  height: 80px;
  object-fit: contain;
  cursor: pointer;
  transform: translate(-50%, -50%);
  animation: ${bounce} 0.5s infinite;
  transition: all 0.1s;

  &:hover {
    filter: brightness(1.3) drop-shadow(0 0 10px gold);
  }

  &:active {
    transform: translate(-50%, -50%) scale(0.8);
  }
`;

const GameOverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameOverContent = styled.div`
  text-align: center;
`;

const GameOverTitle = styled.h2`
  font-size: 48px;
  color: #ffd700;
  margin-bottom: 20px;
`;

const FinalScore = styled.div`
  font-size: 36px;
  color: #00ff88;
  margin-bottom: 10px;
`;

const ScoreMessage = styled.div`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 30px;
`;

const PlayAgainButton = styled.button`
  padding: 15px 40px;
  font-size: 20px;
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    transform: scale(1.05);
  }
`;

const CloseGameButton = styled.button`
  padding: 15px 40px;
  font-size: 20px;
  background: linear-gradient(135deg, #666 0%, #444 100%);
  border: none;
  border-radius: 30px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;
