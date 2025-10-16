import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import PurposeBox from '../components/Form/PurposeBox';
import usePurposeStore from '../store/PurposeStore';
import PurposeAddBox from '../components/Button/PurposeAddBox';
import styled from '@emotion/styled';

const PurposeCustom = () => {
  const purposes = usePurposeStore((state) => state.purposes);

  return (
    <Container>
      <UseBackground />
      <Header title="방문 목적 커스텀" />
      <PurposeList>
        {purposes.map((purpose) => (
          <PurposeBox key={purpose.id} purpose={purpose} />
        ))}
        <PurposeAddBox />
      </PurposeList>
    </Container>
  );
};

export default PurposeCustom;

const PurposeList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  justify-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
`;

const Container = styled.div`
  padding-top: 12.04vh;
`;
