import Header from '../components/Form/Header';
import VisitForm from '../components/Form/VisitForm';
import UseBackground from '../components/Background/UseBackground';
import styled from '@emotion/styled';
import useVisitStore from '../store/useVisitStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UserDetail = () => {
  const addVisit = useVisitStore((state) => state.addVisit);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    male: '',
    female: '',
    date: '',
  });

  const handleSubmit = () => {
    addVisit(form);
    navigate('/user-visit-list');
  };
  return (
    <Container>
      <UseBackground />
      <Header title="시설 이용 기록 추가" />
      <ContentWrapper>
        <VisitForm form={form} setForm={setForm} onSubmit={handleSubmit} />
      </ContentWrapper>
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  padding-top: 12.04vh;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
