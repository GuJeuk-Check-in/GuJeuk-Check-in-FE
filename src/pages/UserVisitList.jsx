import UseBackground from '../components/Background/UseBackground';
import Header from '../components/Form/Header';
import UserVisitCard from '../components/Form/UserVisitCard';

const UserVisitList = () => {
  return (
    <>
      <UseBackground />
      <Header title="시설 이용 목록 조회"></Header>
      <UserVisitCard
        name="오혜민"
        male="1"
        female="2"
        date="2025년 11월 13일"
      />
      <UserVisitCard
        name="오혜민"
        male="1"
        female="2"
        date="2025년 11월 13일"
      />
      <UserVisitCard
        name="오혜민"
        male="1"
        female="2"
        date="2025년 11월 13일"
      />
      <UserVisitCard
        name="오혜민"
        male="1"
        female="2"
        date="2025년 11월 13일"
      />
    </>
  );
};

export default UserVisitList;
