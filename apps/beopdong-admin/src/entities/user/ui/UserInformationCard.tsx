import { UserInformationCard as SharedUserInformationCard } from '@center/ui/card';
import { useNavigate } from 'react-router-dom';
import type { User } from '../model/types';

export const UserInformationCard = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <SharedUserInformationCard
      name={user.name}
      subtitle={`${user.school} · ${user.grade}학년`}
      birthday={user.birthYMD}
      phoneNumber={user.phone}
      count={user.visitCount}
      onEdit={() => navigate(`/organ/user/${user.id}`)}
    />
  );
};
