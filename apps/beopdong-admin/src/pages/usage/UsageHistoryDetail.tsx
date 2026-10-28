import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { UsageHistoryDetailView } from '@widgets/usage';
import { PageTitle } from '@shared/ui';
import { previewUsageHistoryDetails } from './model/previewUsageHistoryDetail';

const UsageHistoryDetail = () => {
  const { historyId } = useParams();
  const detail = previewUsageHistoryDetails[Number(historyId)];

  return (
    <Container>
      <Title>종료 기록 상세</Title>
      <UsageHistoryDetailView key={historyId} detail={detail} />
    </Container>
  );
};

export default UsageHistoryDetail;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  min-width: 0;
`;

const Title = styled(PageTitle)`
  width: min(100%, 920px);
  margin: 0 auto;
`;
