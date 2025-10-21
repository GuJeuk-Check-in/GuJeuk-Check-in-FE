import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import PurposeBox from '../components/Form/PurposeBox';
import PurposeAddBox from '../components/Button/PurposeAddBox';
import styled from '@emotion/styled';
import { usePurposeList } from '../hooks/usePurposeList';
import { useCreatePurpose } from '../hooks/createPurpose';
import { useDeletePurposeList } from '../hooks/deletePurposeList';

const PurposeCustom = () => {
  const { data: purposes, isLoading, isError, error } = usePurposeList();
  const deleteMutation = useDeletePurposeList();

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 방문 목적을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };
  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="방문 목적 커스텀" />
        <LoadingText>방문 목적 리스트를 불러오는 중...</LoadingText>
      </Container>
    );
  }

  if (isError) {
    console.error('방문 목적 리스트 로드 에러:', error);
    return (
      <Container>
        <UseBackground />
        <Header title="방문 목적 커스텀" />
        <ErrorText>
          데이터를 불러오는 데 실패했습니다: {error.message}
        </ErrorText>
      </Container>
    );
  }
  console.log('가져온 목적 데이터:', purposes);

  return (
    <Container>
      <UseBackground />
      <Header title="방문 목적 커스텀" />
      <PurposeList>
        {purposes.map((purpose) => (
          <PurposeBox
            key={purpose.id}
            purpose={purpose}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isLoading}
          />
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

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 50px;
`;

const ErrorText = styled(LoadingText)`
  color: red;
`;
