import { LuUpload } from 'react-icons/lu';
import { FormModal } from '@shared/ui/FormModal';

interface MemberExportModalProps {
  readonly onConfirm: () => void;
  readonly onClose: () => void;
}

export const MemberExportModal = ({ onConfirm, onClose }: MemberExportModalProps) => (
  <FormModal
    icon={<LuUpload aria-hidden="true" />}
    title="회원 정보를 모두 다운받을 수 있어요"
    subtitle="회원 엑셀 추출"
    onConfirm={onConfirm}
    onClose={onClose}
  />
);
