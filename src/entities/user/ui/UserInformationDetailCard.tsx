import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VisitDetailInput } from '@shared/ui/input/VisitDetailInput';
import { PasswordButton } from '@shared/ui/Button/index';
import { ToggleSelect } from '@shared/ui/LabeldInput/ToggleSelect';
import { VisitDatePicker } from '@shared/ui/LabeldInput/VisitDatePicker';
import { SimpleDropdown } from '@shared/ui/LabeldInput/SimpleDropdown';
import { FaUser } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';
import { useResidenceStore } from '@entities/residence';

type GenderType = 'MAN' | 'WOMAN';

interface UserInformationData {
  id: number;
  name: string;
  userId: string;
  phone: string;
  gender: GenderType;
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
}

interface UserInformationDetailCardProps {
  id: number;
  name: string;
  userId: string;
  phone: string;
  gender: GenderType;
  birthYMD: string;
  residence: string;
  privacyAgreed: boolean;
  onSave?: (formData: UserInformationData) => void;
  onEditStateChange?: (isEditing: boolean) => void;
}

const GENDER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'MAN', label: '남성' },
  { value: 'WOMAN', label: '여성' },
];

const GENDER_DISPLAY_MAP: Record<GenderType, string> = {
  MAN: '남성',
  WOMAN: '여성',
};

export const UserInformationDetailCard = ({
  id,
  name,
  userId,
  phone,
  gender,
  birthYMD,
  residence,
  privacyAgreed,
  onSave,
  onEditStateChange,
}: UserInformationDetailCardProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<UserInformationData>({
    id,
    name,
    userId,
    phone,
    gender,
    birthYMD,
    residence,
    privacyAgreed,
  });

  useEffect(() => {
    setFormData({
      id,
      name,
      userId,
      phone,
      gender,
      birthYMD,
      residence,
      privacyAgreed,
    });
  }, [id, name, userId, phone, gender, birthYMD, residence, privacyAgreed]);

  const { residences } = useResidenceStore();

  const LocationData = [
    ...Array.from(new Set(residences.map((r) => r.residence).filter(Boolean))),
  ];

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
    if (onEditStateChange) {
      onEditStateChange(true);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    } else {
      setIsEditing(false);
      if (onEditStateChange) {
        onEditStateChange(false);
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      id,
      name,
      userId,
      phone,
      gender,
      birthYMD,
      residence,
      privacyAgreed,
    });
    setIsEditing(false);
    if (onEditStateChange) {
      onEditStateChange(false);
    }
  };

  const displayGender = GENDER_DISPLAY_MAP[gender];

  return (
    <Container>
      <CardHeader>
        <BackButton onClick={() => navigate('/organ/user/all')}>
          <FaArrowLeft size={20} />
        </BackButton>
      </CardHeader>
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

      <VisitDetailInput
        label="연락처"
        name="phone"
        value={isEditing ? formData.phone : phone}
        onChange={isEditing ? handleChange : null}
        isEditable={isEditing}
        type="tel"
      />

      {isEditing ? (
        <ToggleSelect
          label="성별"
          options={GENDER_OPTIONS.map((opt) => opt.label)}
          value={GENDER_DISPLAY_MAP[formData.gender as GenderType]}
          onChange={(label) => {
            const selected = GENDER_OPTIONS.find((opt) => opt.label === label);
            if (selected) {
              setFormData((prev) => ({
                ...prev,
                gender: selected.value as GenderType,
              }));
            }
          }}
          icon={<FaUser size={24} />}
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

      {isEditing ? (
        <VisitDatePicker
          label="생년월일"
          value={formData.birthYMD}
          onChange={(dateString) => {
            setFormData((prev) => ({
              ...prev,
              birthYMD: dateString,
            }));
          }}
        />
      ) : (
        <VisitDetailInput
          label="생년월일"
          value={birthYMD}
          name="birthYMD"
          onChange={() => {}}
          isEditable={false}
        />
      )}

      {isEditing ? (
        <SimpleDropdown
          label="거주지"
          options={LocationData}
          value={formData.residence}
          hasOther={true}
          onChange={(residence) => {
            setFormData((prev) => ({
              ...prev,
              residence: residence,
            }));
          }}
        />
      ) : (
        <VisitDetailInput
          label="거주지"
          value={residence}
          name="residence"
          onChange={() => {}}
          isEditable={false}
        />
      )}

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

const Container = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 2.5rem auto;
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem auto;
  }
`;

const CardHeader = styled.div`
  position: relative;
  padding-bottom: 2.225rem;
`;

const BackButton = styled.button`
  position: absolute;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(-0.25rem);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  margin-top: 1.25rem;
`;
