import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserVisitCard from '../components/Form/UserVisitCard';
import { useNavigate } from 'react-router-dom';
import useVisitStore from '../store/useVisitStore';
import styled from '@emotion/styled';

const UserVisitList = () => {
  const visits = useVisitStore((state) => state.visits);
  const removeVisit = useVisitStore((state) => state.removeVisit);
  const navigate = useNavigate();

  const handleDelete = (id, name) => {
    if (window.confirm(`${name}님의 기록을 삭제하시겠습니까?`)) {
      removeVisit(id);
      alert(`${name}님의 기록이 삭제되었습니다.`);
    }
  };

  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 목록 조회" />
      {visits.map((visit) => (
        <UserVisitCard
          key={visit.id}
          id={visit.id}
          name={visit.name}
          male={visit.male}
          female={visit.female}
          date={visit.date}
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
