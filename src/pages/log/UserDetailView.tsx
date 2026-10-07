/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: URL에서 방문 기록 ID를 가져와 상세 정보 컴포넌트에 전달하고, 모달 상태에 따라 안내 모달을 표시한다.
*/

import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { UserVisitDetail } from "@widgets/log/ui/UserVisitDetail";
import { Modal } from "@shared/ui";
import { useModal } from "@shared/hooks/useModal";

const UserDetailView = () => {
  //기능: URL에서 방문 기록 ID를 가져오고, 안내 모달의 상태를 관리한다.
  const { logId } = useParams();
  const modal = useModal();

  return (
    <>
      <Wrapper>
        <UserVisitDetail logId={logId} />
      </Wrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

export default UserDetailView;

//기능: 내용이 넘치면 세로 스크롤을 제공한다.
const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  max-width: 60rem;
  margin: 60px auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
