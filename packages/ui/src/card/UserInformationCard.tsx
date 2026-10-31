import type { KeyboardEvent } from 'react';
import styled from '@emotion/styled';
import { IoClose } from 'react-icons/io5';
import { adminTokens } from '@center/tokens';
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
import { RecordCloseButton } from './RecordCardParts';

export interface UserInformationCardProps {
  name: string;
  subtitle: string;
  gender?: string;
  birthday: string;
  phoneNumber: string;
  count?: number | null;
  onEdit: () => void;
  onDelete?: () => void;
  isCardClickable?: boolean;
}

export const UserInformationCard = ({
  name, subtitle, gender, birthday, phoneNumber, count, onEdit, onDelete, isCardClickable = false,
}: UserInformationCardProps) => {
  return (
    <CardContainer
      $hasDelete={!!onDelete}
      {...(isCardClickable && {
        role: 'link',
        tabIndex: 0,
        'aria-label': `${name} 회원 상세 보기`,
        onClick: onEdit,
        onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
          if (event.target === event.currentTarget && event.key === 'Enter') onEdit();
        },
      })}
    >
      <LeftSection>
        <Subtitle>{subtitle}</Subtitle>
        <Name>{name}</Name>
      </LeftSection>
      <RightSection>
        <RightWrapper>
          {!isCardClickable && (
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
          )}
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
      {onDelete && (
        <DeleteButton
          type="button"
          aria-label={`${name} 회원 삭제`}
          onClick={(event) => {
            event.stopPropagation();
            onDelete();
          }}
        >
          <IoClose size="1.8rem" aria-hidden="true" />
        </DeleteButton>
      )}
    </CardContainer>
  );
};

const CardContainer = styled(Container)<{ $hasDelete: boolean }>`
  position: relative;
  ${({ $hasDelete }) => $hasDelete && `
    min-height: 8.4375rem;
    padding-right: 5.5rem;
  `}

  @media (max-width: 64rem) {
    min-height: auto;
    padding-right: 1.5rem;
  }
`;

const DeleteButton = styled(RecordCloseButton)`
  position: absolute;
  top: 50%;
  right: 1.25rem;
  transform: translateY(-50%);
  color: ${({ theme }) => adminTokens(theme).colors.error};

  &:focus-visible {
    outline: 0.125rem solid currentColor;
    outline-offset: 0.125rem;
  }

  @media (max-width: 64rem) {
    top: 1rem;
    transform: none;
  }
`;
