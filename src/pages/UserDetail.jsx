import Header from '../components/Form/Header';
import VisitForm from '../components/Form/VisitForm';
import UseBackground from '../components/Background/UseBackground';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCreateUserVisit } from '../hooks/createUserVisitList';

const UserDetail = () => {
  const navigate = useNavigate();

  const createMutation = useCreateUserVisit(() => {
    navigate('/admin/list/all');
  });

  const [form, setForm] = useState({
    name: '',
    age: 'ADULT',
    phone: '',
    maleCount: 0,
    femaleCount: 0,
    purpose: '',
    visitDate: '',
    privacyAgreed: false,
  });

  const handleSubmit = () => {
    const dataToSend = {
      ...form,
      maleCount: Number(form.maleCount || 0),
      femaleCount: Number(form.femaleCount || 0),
    };
    createMutation.mutate(dataToSend);
  };

  return (
    <Container>
      <UseBackground />
      <Header
        title={createMutation.isLoading ? '등록 중...' : '시설 이용 기록 추가'}
      />{' '}
      <ContentWrapper>
        <VisitForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          isLoading={createMutation.isLoading}
          isError={createMutation.isError}
          error={createMutation.error}
        />{' '}
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
