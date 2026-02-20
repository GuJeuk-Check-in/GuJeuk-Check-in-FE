import { useModal, UseModalReturn } from '@shared/hooks/useModal';
import { useUpdateResidence } from '../model/useUpdateResidence';

interface UseUpdateResidenceHandlerParams {
  modal: UseModalReturn;
}

export const useUpdateResidenceHandler = ({
  modal,
}: UseUpdateResidenceHandlerParams) => {
  const mutation = useUpdateResidence(modal);

  const handleUpdate = (id: number, newResidence: string) => {
    mutation.mutate({ id, residenceName: newResidence });
  };

  return {
    handleUpdate,
    isLoading: mutation.isPending,
  };
};
