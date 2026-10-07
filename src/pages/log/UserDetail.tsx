/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 방문 기록 입력 폼을 표시하고, 등록 요청과 관련 안내 모달을 연결한다.
*/

import styled from "@emotion/styled";
import VisitForm from "@widgets/log/ui/VisitForm";
import { Modal } from "@shared/ui";
import { useCreateUserVisit } from "@features/log";

const UserDetail = () => {
  //기능: 방문 기록 등록 함수, 처리 중 상태와 안내 모달 정보를 가져온다.
  const { mutateAsync, isPending: isLoading, modal } = useCreateUserVisit();

  return (
    <>
      <ContentWrapper>
        <VisitForm onSubmit={mutateAsync} isLoading={isLoading} />
      </ContentWrapper>

      <Modal
        isOpen={modal.isOpen}
        config={modal.config}
        onClose={modal.closeModal}
      />
    </>
  );
};

export default UserDetail;

//기능: 입력 폼 영역을 전체 너비로 설정하고, 내부 요소를 가로 중앙에 배치하며 위아래 여백을 적용한다.
const ContentWrapper = styled.div`
  flex: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 3.75rem 0;
`;
