import styled from '@emotion/styled';
import { useState } from 'react';
import VisitDetailInput from '../LabeldInput/VisitDetailInput';
import PasswordButton from '../Button/PasswordButton';

interface UserInformationDetailCardProps {
  name: string;
  userId: string;
  phone: string;
  gender: GenderType;
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
}

interface VisitDetailInputProps {
  label: string;
  value: any;
  width?: string;
  isEditable?: boolean;
  name?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?: string;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
}

type GenderType = 'MALE' | 'FEMALE';

const GENDER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
];

const GENDER_DISPLAY_MAP: Record<GenderType, string> = {
  MALE: '남성',
  FEMALE: '여성',
};

const UserInformationDetailCard = ({
  name,
  userId,
  phone,
  gender,
  birthYMD,
  residence,
  privacyAgreed,
}: UserInformationDetailCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name,
    userId,
    phone,
    gender,
    birthYMD,
    residence,
    privacyAgreed,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name,
      userId,
      phone,
      gender,
      birthYMD,
      residence,
      privacyAgreed,
    });
    setIsEditing(false);
  };

  const displayGender = GENDER_DISPLAY_MAP[gender];

  return (
    <Container>
      <InputRow>
        <VisitDetailInput
          label="이름"
          name="name"
          value={isEditing ? formData.name : name}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
        />
        <VisitDetailInput
          label="사용자 ID"
          name="userId"
          value={isEditing ? formData.userId : userId}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
        />
      </InputRow>

      <InputRow>
        <VisitDetailInput
          label="연락처"
          name="phone"
          value={isEditing ? formData.phone : phone}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
          type="tel"
        />
        {isEditing ? (
          <VisitDetailInput
            label="성별"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            isEditable={true}
            type="select"
            options={GENDER_OPTIONS}
          />
        ) : (
          <VisitDetailInput
            label="성별"
            value={displayGender}
            name="gender"
            onChange={() => {}}
            isEditable={false}
          />
        )}
      </InputRow>

      <InputRow>
        <VisitDetailInput
          label="생년월일"
          name="birthYMD"
          value={isEditing ? formData.birthYMD : birthYMD}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
          type="date"
        />
        <VisitDetailInput
          label="거주지"
          name="residence"
          value={isEditing ? formData.residence : residence}
          onChange={isEditing ? handleChange : null}
          isEditable={isEditing}
        />
      </InputRow>

      <VisitDetailInput
        label="개인 정보 수집 동의"
        name="privacyAgreed"
        value={isEditing ? formData.privacyAgreed : privacyAgreed}
        onChange={isEditing ? handleChange : null}
        isEditable={isEditing}
        type="checkbox"
      />

      <ButtonWrapper>
        {isEditing ? (
          <>
            <PasswordButton content="저장" onClick={handleSave} />
            <PasswordButton content="취소" onClick={handleCancel} />
          </>
        ) : (
          <PasswordButton content="수정" onClick={handleEditToggle} />
        )}
      </ButtonWrapper>
    </Container>
  );
};

export default UserInformationDetailCard;

const Container = styled.div`
  width: 90%;
  max-width: 59.375rem;
  margin: 2.5rem auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 1.25rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;
