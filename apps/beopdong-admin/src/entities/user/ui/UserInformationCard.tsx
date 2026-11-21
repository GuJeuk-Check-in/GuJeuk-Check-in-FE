import { UserInformationCard as SharedUserInformationCard } from '@center/ui/card';
import { formatDateKoreanPadded } from '@center/ui/form';
import type { User } from '../model/types';

interface UserInformationCardProps {
  user: User;
}

export const UserInformationCard = ({ user }: UserInformationCardProps) => {
  return (
    <SharedUserInformationCard
      name={user.name}
      subtitle={`${user.school} · ${user.grade}학년`}
      birthday={formatDateKoreanPadded(user.birthYMD)}
      phoneNumber={user.phone}
      count={user.visitCount}
    />
  );
};
