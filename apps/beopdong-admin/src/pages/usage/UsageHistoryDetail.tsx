import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { UsageHistoryDetailView } from '@widgets/usage';
import { toUsageHistoryDetail } from '@entities/usage';
import { PageTitle } from '@shared/ui';
import { previewUsageHistoryDetails } from './model/previewUsageHistoryDetail';

const UsageHistoryDetail = () => {
  const { historyId } = useParams();
  const response = previewUsageHistoryDetails[Number(historyId)];
  const detail = response && toUsageHistoryDetail(response);

  return (
    <Container>
      <PageTitle>종료 기록 상세</PageTitle>
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
