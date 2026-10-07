/*
  코드 주석 작성일: 2026/10/5
  작성자: 박민건
  이 파일의 전체적인 기능: 유저 이용 기록 생성에 따른 모달 알림 및 페이지 이동을 통합 관리하는 훅이다.
*/

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserVisit } from "@entities/log";
import { useModal } from "@shared/hooks/useModal";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { CreateUserVisitRequest, UserVisitDetailResponse } from "@entities/log";
import { AxiosError } from "axios";


//기능: 성공 여부에 따라서 콜백 함수가 실행 되게 한다.
interface UseCreateUserVisitProps {
  onSuccessCallback?: () => void;
}

//기능: UseMutationResult과 제네릭을 이용해여 반환하는 데이터를 정의한다.
type UseCreateUserVisitReturn = UseMutationResult<
  UserVisitDetailResponse,
  AxiosError,
  CreateUserVisitRequest
> & {
  modal: ReturnType<typeof useModal>;
};


export const useCreateUserVisit = ({
  onSuccessCallback,
}: UseCreateUserVisitProps = {}): UseCreateUserVisitReturn => {
  const queryClient = useQueryClient();
  const modal = useModal();
  const navigate = useNavigate();

  const mutation = useMutation<
    UserVisitDetailResponse,
    AxiosError<{ message?: string }>,
    CreateUserVisitRequest
  >({
    mutationFn: createUserVisit,
    // 기능: 성공시 성공 안내 모달을 띄우고 react-router를 이용해 /log 페이지로 이동하게 된다.
    onSuccess: () => {
      //기능: 생성이 되었다면 기존에 있던 visitList 쿼리 키의 캐시를 만료시킨다.
      queryClient.invalidateQueries({ queryKey: ["visitList"] });

      modal.openModal({
        icon: <FaCheckCircle size={48} color="#0F50A0" />,
        title: "이용 기록 생성 완료",
        subtitle: "이용 기록이 성공적으로 생성되었습니다.",
        theme: "info",
        buttons: [
          {
            label: "확인",
            variant: "primary",
            bgColor: "#0F50A0",
            onClick: () => {
              modal.closeModal();
              onSuccessCallback?.();
              navigate("/log");
            },
          },
        ],
      });
    },
    //기능: 실패시 실패 안내 모달과 console에 error 문구를 띄운다.
    onError: (error) => {
      console.error("이용 기록 생성 중 오류 발생:", error);
      
      modal.openModal({
        icon: <FaExclamationTriangle size={48} color="#D88282" />,
        title: "등록 실패",
        subtitle:
          error.response?.data?.message ||
          error.message ||
          "알 수 없는 오류가 발생했습니다.",
        theme: "warning",
        buttons: [
          {
            label: "확인",
            variant: "secondary",
            onClick: modal.closeModal,
          },
        ],
      });
    },
  });

  return { ...mutation, modal };
};
