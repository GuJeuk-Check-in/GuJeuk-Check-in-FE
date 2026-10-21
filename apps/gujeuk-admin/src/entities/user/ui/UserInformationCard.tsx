import {
  InformationContainer as Container,
  InformationLeftSection as LeftSection,
  InformationSubtitle as Location,
  InformationTitle as Name,
  InformationDiver as Diver,
  InformationRightSection as RightSection,
  InformationEditButton as EditButton,
  InformationMetaText as Gender,
  InformationMetaDetail as Birthday,
  InformationMetaSupplement as PhoneNumber,
  InformationMetaBlock as Count,
  InformationRightWrapper as RightWrapper,
  InformationInfoWrapper as InfoWrapper,
} from '@center/ui/card';
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
  id,
  name,
  location,
  gender,
  birthday,
  phonNumber,
  count,
}: UserInformationCardProps) => {
  const navigate = useNavigate();
  const displayCount = count !== null && count !== undefined ? count : 0;

  return (
    <Container>
      <LeftSection>
        <Location>{location}</Location>
        <Name>{name}</Name>
      </LeftSection>

      <RightSection>
        <RightWrapper>
          <EditButton
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/organ/user/${id}`);
            }}
          >
            수정
          </EditButton>{' '}
          <InfoWrapper>
            <Gender>{GENDER_MAP[gender] || gender}</Gender>
            <Diver />
            <Birthday>{birthday}</Birthday>
            <Diver />
            <PhoneNumber>{phonNumber}</PhoneNumber>
            <Diver />
            <Count title="누적 방문 횟수">{displayCount}회 방문</Count>
          </InfoWrapper>
        </RightWrapper>
      </RightSection>
    </Container>
  );
};
