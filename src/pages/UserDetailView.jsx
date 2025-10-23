import { useParams } from 'react-router-dom';
import Header from '../components/Form/Header';
import UseBackground from '../components/Background/UseBackground';
import VisitDetailInput from '../components/LabeldInput/VisitDetailInput';
import styled from '@emotion/styled';
import { usefetchUserVisitDetail } from '../hooks/usefetchUserVisitDetail';

const AGE_DISPLAY_MAP = {
  BABY: '0~8세',
  AGE_9_13: '9~13세',
  AGE_14_16: '14~16세',
  AGE_17_19: '17~19세',
  AGE_20_24: '20~24세',
  ADULT: '성인',
};

const UserDetailView = () => {
  const { id } = useParams();

  const {
    data: visit,
    isLoading,
    isError,
    error,
  } = usefetchUserVisitDetail(id);

  const formatAgeDisplay = (ageEnum) => {
    return AGE_DISPLAY_MAP[ageEnum] || ageEnum;
  };

  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <LoadingText>상세 기록을 불러오는 중...</LoadingText>
        </Wrapper>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <UseBackground />
        <Header title="시설 이용 상세 조회" />
        <Wrapper>
          <ErrorText>기록 조회에 실패했습니다: {error.message}</ErrorText>
        </Wrapper>
      </Container>
    );
  }

  if (!visit) return <p>기록을 찾을 수 없습니다.</p>;

  const ageDisplayValue = formatAgeDisplay(visit.age);

  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 상세 조회" />
      <Wrapper>
        <InputRow>
          <VisitDetailInput label="대표자 이름" value={visit.name} />
          <VisitDetailInput label="연령" value={ageDisplayValue} />
        </InputRow>

        <VisitDetailInput label="연락처" value={visit.phone} />
        <VisitDetailInput label="방문 목적" value={visit.purpose} />
        <VisitDetailInput label="방문 날짜" value={visit.visitDate} />

        <InputRow>
          <VisitDetailInput label="방문 남성 수" value={visit.femaleCount} />
          <VisitDetailInput label="방문 여성 수" value={visit.femaleCount} />
        </InputRow>
        <VisitDetailInput
          label="개인 정보 수집 동의"
          value={visit.privacyAgreed}
        />
      </Wrapper>
    </Container>
  );
};

export default UserDetailView;

const Container = styled.div`
  padding-top: 9.5vh;
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 950px;
  margin: 40px auto;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  margin: 50px 0;
  color: #777;
  font-size: 1.1rem;
`;

const ErrorText = styled(LoadingText)`
  color: #ff007b;
  font-weight: bold;
`;
