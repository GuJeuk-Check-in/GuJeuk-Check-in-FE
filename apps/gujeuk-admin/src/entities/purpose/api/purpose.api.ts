import { axiosInstance } from '@shared/api';
import {
  CreatePurposeRequest,
  CreateSubPurposeRequest,
  Purpose,
  PurposeDto,
  PurposeListDto,
  UpdatePurposeMovementRequest,
  UpdatePurposeRequest,
  UpdateSubPurposeRequest,
} from '../model/types';

const toPurpose = (dto: PurposeDto): Purpose => ({
  id: dto.purposeId,
  purpose: dto.purpose,
  reservationStatus: dto.reservationStatus,
  subPurposes: (dto.subPurposes ?? []).map((item) => ({
    id: item.subPurposeId,
    name: item.subPurpose,
    reservable: item.subPurposeReservation,
  })),
});

export const purposeList = async (): Promise<Purpose[]> => {
  const response = await axiosInstance.get<PurposeListDto>(
    '/purpose/all/with-sub'
  );
  return (response.data?.purposes ?? []).map(toPurpose);
};

export const createPurpose = async (
  payload: CreatePurposeRequest
): Promise<void> => {
  await axiosInstance.post('/purpose', payload);
};

export const updatePurpose = async (
  id: number,
  payload: UpdatePurposeRequest
): Promise<void> => {
  await axiosInstance.patch(`/purpose/${id}`, payload);
};

export const updatePurposeMovement = async (
  data: UpdatePurposeMovementRequest
) => {
  const response = await axiosInstance.patch('/purpose/move', data);
  return response.data;
};

export const deletePurpose = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/purpose/${id}`);
};

export const createSubPurpose = async (
  payload: CreateSubPurposeRequest
): Promise<void> => {
  await axiosInstance.post('/purpose/sub', payload);
};

export const updateSubPurpose = async (
  id: number,
  payload: UpdateSubPurposeRequest
): Promise<void> => {
  await axiosInstance.patch(`/purpose/sub/${id}`, payload);
};

export const deleteSubPurpose = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/purpose/sub/${id}`);
};
