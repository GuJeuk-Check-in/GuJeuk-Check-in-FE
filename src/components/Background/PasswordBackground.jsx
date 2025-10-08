import CircleData from './CircleData';
import styled from '@emotion/styled';

const PasswordBackground = () => {
  return (
    <Container>
      {CircleData.map((circle) => (
        <Circle
          key={circle.id}
          $color={circle.color}
          $size={circle.size}
          $top={circle.top}
          $left={circle.left}
        ></Circle>
      ))}
    </Container>
  );
};

export default PasswordBackground;

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

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 1;
  background-color: ${(props) => props.$color};
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  top: ${(props) => props.$top || 'auto'};
  left: ${(props) => props.$left || 'auto'};
`;
