import {
  InformationContainer as Container,
  InformationLeftSection as LeftSection,
  InformationSubtitle as Subtitle,
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
} from './InformationCardParts';

export interface UserInformationCardProps {
  name: string;
  subtitle: string;
  gender?: string;
  birthday: string;
  phoneNumber: string;
  count?: number | null;
  onEdit: () => void;
}

export const UserInformationCard = ({
  name, subtitle, gender, birthday, phoneNumber, count, onEdit,
}: UserInformationCardProps) => {
  return (
    <Container>
      <LeftSection>
        <Subtitle>{subtitle}</Subtitle>
        <Name>{name}</Name>
      </LeftSection>
      <RightSection>
        <RightWrapper>
          <EditButton
            type="button"
            aria-label={`${name} 회원 수정`}
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
          >
            수정
          </EditButton>
          <InfoWrapper>
            {gender !== undefined && <><Gender>{gender}</Gender><Diver /></>}
            <Birthday>{birthday}</Birthday>
            <Diver />
            <PhoneNumber>{phoneNumber}</PhoneNumber>
            <Diver />
            <Count title="누적 방문 횟수">{count ?? 0}회 방문</Count>
          </InfoWrapper>
        </RightWrapper>
      </RightSection>
    </Container>
  );
};
