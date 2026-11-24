import { UserInformationCard as SharedUserInformationCard } from '@center/ui/card';
import { formatDateKoreanPadded } from '@center/ui/form';
import { useNavigate } from 'react-router-dom';
import type { User } from '../model/types';

interface UserInformationCardProps {
  user: User;
}

export const UserInformationCard = ({ user }: UserInformationCardProps) => {
  const navigate = useNavigate();
  const detailPath = `/organ/user/${user.id}`;

  return (
    <SharedUserInformationCard
      name={user.name}
      subtitle={`${user.school} · ${user.grade}학년`}
      birthday={formatDateKoreanPadded(user.birthYMD)}
      phoneNumber={user.phone}
      count={user.visitCount}
      href={detailPath}
      onEdit={() => navigate(detailPath)}
    />
  );
};
