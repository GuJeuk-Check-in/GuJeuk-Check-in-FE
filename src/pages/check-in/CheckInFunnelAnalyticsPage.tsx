import styled from '@emotion/styled';
import {
  flushStoredCheckInFunnelEvents,
  readStoredCheckInFunnelEvents,
} from '@entities/check-in/funnelDiagnostics';
import type { CheckInFunnelEventRecord } from '@entities/check-in/funnelDiagnostics';
import { PasswordBackground } from '@shared/ui/Background';
import { useEffect, useState } from 'react';
import { FiInbox, FiRefreshCw } from 'react-icons/fi';

type FlushState = 'idle' | 'flushing' | 'success' | 'failed';

const CheckInFunnelAnalyticsPage = () => {
  const [events, setEvents] = useState<readonly CheckInFunnelEventRecord[]>([]);
  const [flushState, setFlushState] = useState<FlushState>('idle');

  const refreshEvents = () => {
    setEvents(readStoredCheckInFunnelEvents());
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const handleFlush = async () => {
    if (flushState === 'flushing') return;

    setFlushState('flushing');

    try {
      const isSent = await flushStoredCheckInFunnelEvents();
      refreshEvents();
      setFlushState(isSent ? 'success' : 'failed');
    } catch (error) {
      refreshEvents();
      if (error instanceof Error) {
        setFlushState('failed');
        return;
      }
      throw error;
    }
  };

  return (
    <Page>
      <PasswordBackground />
      <Panel>
        <Header>
          <Title>체크인 퍼널 이벤트</Title>
          <Summary>
            localStorage에 저장된 미전송 이벤트 {events.length}개
          </Summary>
        </Header>

        <Toolbar>
          <RefreshButton type="button" onClick={refreshEvents}>
            <FiRefreshCw aria-hidden="true" />
            목록 새로고침
          </RefreshButton>
          <FlushButton
            type="button"
            onClick={() => void handleFlush()}
            disabled={flushState === 'flushing' || events.length === 0}
          >
            <FiRefreshCw aria-hidden="true" />
            {flushState === 'flushing' ? '전송 중...' : '수동 flush'}
          </FlushButton>
        </Toolbar>

        <Status aria-live="polite">
          {flushState === 'success' &&
            'Mixpanel로 전송한 이벤트를 제거했습니다.'}
          {flushState === 'failed' &&
            'Mixpanel 토큰이 없거나 이벤트 전송에 실패했습니다.'}
        </Status>

        {events.length === 0 ? (
          <EmptyState>
            <FiInbox aria-hidden="true" />
            저장된 퍼널 이벤트가 없습니다.
          </EmptyState>
        ) : (
          <EventTableWrapper>
            <EventTable>
              <thead>
                <tr>
                  <th>eventName</th>
                  <th>clientEventId</th>
                  <th>sessionId</th>
                  <th>occurredAt</th>
                  <th>elapsedMs</th>
                  <th>userId</th>
                  <th>ageGroup</th>
                  <th>purpose</th>
                  <th>failureReason</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.clientEventId}>
                    <td>{event.eventName}</td>
                    <td>{event.clientEventId}</td>
                    <td>{event.sessionId}</td>
                    <td>{event.occurredAt}</td>
                    <td>{event.elapsedMsFromStart}</td>
                    <td>{event.userId ?? '-'}</td>
                    <td>{event.ageGroup ?? '-'}</td>
                    <td>{event.purpose ?? '-'}</td>
                    <td>{event.failureReason ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </EventTable>
          </EventTableWrapper>
        )}
      </Panel>
    </Page>
  );
};

export default CheckInFunnelAnalyticsPage;

const Page = styled.main`
  position: relative;
  min-height: 100dvh;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 3rem 1.5rem;
`;

const Panel = styled.section`
  position: relative;
  z-index: 1;
  width: min(100%, 78rem);
  margin: 0 auto;
  box-sizing: border-box;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border: 0.125rem solid #e7eaf3;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 1.5rem 2.75rem rgba(24, 48, 88, 0.15);
`;

const Header = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.75rem;
`;

const Title = styled.h1`
  margin: 0;
  color: #2f66ad;
  font-family: 'Jua', 'Pretendard', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  font-weight: 400;
`;

const Summary = styled.p`
  margin: 0;
  color: #536172;
  font-size: 0.95rem;
  font-weight: 700;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.8rem;
  border: 0;
  border-radius: 1.4rem;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0 1.2rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.62;
  }
`;

const RefreshButton = styled(ActionButton)`
  background-color: #edf4ff;
  color: #145cad;
`;

const FlushButton = styled(ActionButton)`
  background-color: #145cad;
  color: #ffffff;
`;

const Status = styled.p`
  min-height: 1.4rem;
  margin: 1rem 0 0;
  color: #145cad;
  font-size: 0.9rem;
  font-weight: 700;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 12rem;
  margin-top: 1.5rem;
  border: 0.125rem dashed #c9d7e8;
  border-radius: 1rem;
  color: #536172;
  font-weight: 700;
`;

const EventTableWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  overflow-x: auto;
`;

const EventTable = styled.table`
  width: 100%;
  min-width: 64rem;
  border-collapse: collapse;
  color: #26364c;
  font-size: 0.82rem;

  th,
  td {
    border-bottom: 0.0625rem solid #e7eaf3;
    padding: 0.75rem;
    text-align: left;
    vertical-align: top;
    word-break: break-all;
  }

  th {
    background-color: #f4f8ff;
    color: #145cad;
    font-weight: 800;
    white-space: nowrap;
  }
`;
