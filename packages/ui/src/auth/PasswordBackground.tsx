import { useTheme } from '@emotion/react';
import { adminTokens } from '@center/tokens';
import { CircleData } from './CircleData';
import styled from '@emotion/styled';

export const PasswordBackground = () => {
  const colors = adminTokens(useTheme()).colors.circles;
  return (
    <Container>
      {CircleData.map((circle, index) => (
        <Circle
          key={circle.id}
          $color={colors[index]}
          $size={circle.size}
          $top={circle.top}
          $left={circle.left}
        ></Circle>
      ))}
    </Container>
  );
};

interface CircleProps {
  $color: string;
  $size: string;
  $top?: string;
  $left?: string;
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
`;

const Circle = styled.div<CircleProps>`
  position: absolute;
  border-radius: 50%;
  opacity: 1;
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  top: ${(props) => props.$top || 'auto'};
  left: ${(props) => props.$left || 'auto'};
`;
