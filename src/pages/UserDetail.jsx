import Header from '../components/Form/Header';
import VisitForm from '../components/Form/VisitForm';
import UseBackground from '../components/Background/UseBackground';
import styled from '@emotion/styled';

const UserDetail = () => {
  return (
    <>
      <UseBackground />
      <Header title="시설 이용 기록" />
      <ContentWrapper>
        <VisitForm />
      </ContentWrapper>
    </>
  );
};

export default UserDetail;

const ContentWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;
