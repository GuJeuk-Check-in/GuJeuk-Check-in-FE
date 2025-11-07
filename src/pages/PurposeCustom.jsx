import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import PurposeBox from '../components/Form/PurposeBox';
import PurposeAddBox from '../components/Button/PurposeAddBox';
import styled from '@emotion/styled';
import { usePurposeList } from '../hooks/usePurposeList';
import { useDeletePurposeList } from '../hooks/deletePurposeList';
import { useUpdatePurpose } from '../hooks/updatePurpose';

const PurposeCustom = () => {
  const { data: purposes, isLoading, isError, error } = usePurposeList();
  const deleteMutation = useDeletePurposeList();

  const updateMutation = useUpdatePurpose();

  const handleDelete = (id) => {
    if (window.confirm('정말로 이 방문 목적을 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleUpdate = ({ id, newPurpose }) => {
    updateMutation.mutate({ id, newPurpose });
  };

  if (isLoading) {
    return (
      <Container>
        <UseBackground />
        <Header title="방문 목적 커스텀" />
        <LoadingOverlay>
          <LoadingBox>
            <p>데이터를 불러오는 중</p>
            <p>잠시만 기다려주세요...</p>
          </LoadingBox>
        </LoadingOverlay>
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

  const isInteracting = deleteMutation.isLoading || updateMutation.isLoading;

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
            isDeleting={isInteracting}
            onUpdate={handleUpdate}
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
  gap: 1rem;
  justify-items: center;
  width: 90%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 2.5rem 0;
`;

const Container = styled.div`
  padding-top: 8.125rem;
`;

const LoadingText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-top: 3.125rem;
`;

const ErrorText = styled(LoadingText)`
  color: red;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 1.875rem 3.125rem;
  border-radius: 0.625rem;
  text-align: center;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.5rem);
`;
