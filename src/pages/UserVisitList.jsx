import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserVisitCard from '../components/Form/UserVisitCard';
import styled from '@emotion/styled';
import {
  useUserVisitList,
  useDeleteVisitMutation,
} from '../hooks/userVisitList';

const UserVisitList = () => {
  const { data, isLoading, error } = useUserVisitList(0);

  const visits = data?.content || [];

  const { mutate: deleteMutate, isLoading: isDeleting } =
    useDeleteVisitMutation();

  const handleDelete = (id, name) => {
    if (isDeleting) return;

    if (window.confirm(`${name}님의 기록을 삭제하시겠습니까?`)) {
      deleteMutate(id, {});
    }
  };

  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 목록 조회" />

      {isLoading && <p>로딩 중...</p>}
      {error && <p>오류 발생: {error.message}</p>}

      {!isLoading && !error && visits.length === 0 && (
        <EmptyMessage>이용 기록이 없습니다.</EmptyMessage>
      )}

      {visits.map((visit) => (
        <UserVisitCard
          key={visit.id}
          id={visit.id}
          name={visit.name}
          male={visit.maleCount}
          female={visit.femaleCount}
          date={visit.visitDate}
          onDelete={() => handleDelete(visit.id, visit.name)}
        />
      ))}
    </Container>
  );
};

export default UserVisitList;

const Container = styled.div`
  padding-top: 12.04vh;
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin-top: 50px;
  color: #666;
`;
