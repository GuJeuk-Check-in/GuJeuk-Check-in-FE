import { UserInformationCard as SharedUserInformationCard } from '@center/ui/card';
import { useNavigate } from 'react-router-dom';

interface UserInformationCardProps {
  id: number;
  name: string;
  location: string;
  gender: GenderType;
  birthday: string;
  phonNumber: string;
  count?: number | null;
}

type GenderType = 'MAN' | 'WOMAN';

const GENDER_MAP: Record<GenderType, string> = {
  MAN: '남성',
  WOMAN: '여성',
};

export const UserInformationCard = ({
  id, name, location, gender, birthday, phonNumber, count,
}: UserInformationCardProps) => {
  const navigate = useNavigate();

  return (
    <SharedUserInformationCard
      name={name}
      subtitle={location}
      gender={GENDER_MAP[gender] || gender}
      birthday={birthday}
      phoneNumber={phonNumber}
      count={count}
      onEdit={() => navigate(`/organ/user/${id}`)}
    />
  );
};
