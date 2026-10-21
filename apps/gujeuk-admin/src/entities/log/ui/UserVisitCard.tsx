import {
  RecordContainer as Container,
  RecordCardContent as CardContent,
  RecordLeftSection as LeftSection,
  RecordTitle as Name,
  RecordSummary as Info,
  RecordDivider as Divider,
  RecordRightSection as RightSection,
  RecordMeta as Date,
  RecordCloseButton as CloseButton,
  recordCardLinkStyles,
} from '@center/ui/card';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

interface UserVisitCardProps {
  id: number;
  name: string;
  male: number;
  female: number;
  date: string;
  onDelete?: () => void;
}

export const UserVisitCard = ({
  id,
  name,
  male,
  female,
  date,
  onDelete,
}: UserVisitCardProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <Container>
      <CardLink
        to={`/log/${id}`}
        aria-label={`${name} 방문 기록 상세 보기`}
      />
      <CardContent>
        <LeftSection>
          <Name>대표자: {name}</Name>
          <Info>
            <span>남 : {male}</span>
            <Divider />
            <span>여 : {female}</span>
          </Info>
        </LeftSection>
        <Date>{date}</Date>
      </CardContent>
      <RightSection>
        <CloseButton
          type="button"
          onClick={handleDeleteClick}
          aria-label="방문 기록 삭제"
        >
          <IoClose size="1.8rem" />
        </CloseButton>
      </RightSection>
    </Container>
  );
};

const CardLink = styled(Link)(recordCardLinkStyles);
