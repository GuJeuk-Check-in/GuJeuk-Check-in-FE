import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { adminTokens } from '@center/tokens';
import { DropdownHeader, DropdownValue, dropdownSlideDown } from './DropdownParts';

export const CalendarValue = styled(DropdownValue)<{ $placeholder: boolean; $legacy: boolean }>`
  ${({ $placeholder, $legacy }) => $legacy && $placeholder && 'color: #757575;'}
`;

export const CalendarTrigger = styled(DropdownHeader.withComponent('button'))<{ $legacy: boolean }>`
  gap: 0.75rem;
  min-height: calc(${({ theme }) => adminTokens(theme).components.fieldHeight} + 0.125rem);
  height: auto;
  padding-block: 0.75rem;
  font-family: inherit;
  text-align: left;

  > svg, > div { flex-shrink: 0; }
  > span { flex: 1; overflow-wrap: anywhere; min-width: 0; }

  ${({ $legacy }) => $legacy && `
    box-sizing: content-box;
    width: auto;
    height: 3.5rem;
    min-height: 0;
    padding-block: 0;
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => adminTokens(theme).colors.primary};
    outline-offset: 2px;
  }
`;

export const CalendarWrapper = styled.div<{ $legacy: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.25rem;
  background: ${({ theme }) => adminTokens(theme).colors.white};
  border: 0.0625rem solid #dcdcdc;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
  z-index: 10;
  animation: ${dropdownSlideDown} 0.2s ease-out forwards;

  ${({ $legacy }) => $legacy && `
    box-sizing: content-box;
    width: 95.8%;
  `}

  @media (max-width: 32rem) { padding: ${({ $legacy }) => $legacy ? '1.25rem' : '0.5rem'}; }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const StyledCalendar = styled(Calendar)<{ $legacy: boolean }>`
  && {
    border: none;
    width: 100%;
    color: ${({ theme }) => adminTokens(theme).colors.black};
    background: ${({ theme }) => adminTokens(theme).colors.white};
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .react-calendar__navigation button {
    color: ${({ theme }) => adminTokens(theme).colors.black};
    font-size: 1.125rem;
    min-width: 2.75rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.375rem;
  }
  .react-calendar__tile {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: ${({ theme }) => adminTokens(theme).components.fieldRadius};
    font-size: 1.125rem;
    padding: 0;
    white-space: nowrap;
    background: none;
    border: none;
    margin-bottom: 0.25rem;
    cursor: pointer;
  }
  .react-calendar__tile--now,
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: ${({ theme }) => adminTokens(theme).colors.primaryLight};
  }
  .react-calendar__tile--hasActive,
  .react-calendar__tile--active,
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => adminTokens(theme).colors.primary};
    color: ${({ theme }) => adminTokens(theme).colors.white};
  }
  .react-calendar__month-view__days__day--weekend { color: ${({ theme }) => adminTokens(theme).colors.warning}; }
  .react-calendar__month-view__days__day--neighboringMonth { color: ${({ theme }) => adminTokens(theme).colors.secondaryText}; }
  ${({ $legacy }) => $legacy && `
    .react-calendar__tile { padding: 10px 6.6667px; }
    .react-calendar__tile--active { background: #2762aa; width: 2.5rem !important; height: 2.5rem !important; }
    .react-calendar__tile--now { background: #ffff76; }
    .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus,
    .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus { background: #e6e6e6; }
    .react-calendar__tile--active:enabled:hover, .react-calendar__tile--active:enabled:focus { background: #1087ff; }
    .react-calendar__month-view__days__day--weekend { color: #d88282; }
    .react-calendar__month-view__days__day--neighboringMonth { color: #6a6a6a; }
  `}

  .react-calendar__tile--active.react-calendar__month-view__days__day--weekend,
  .react-calendar__tile--active.react-calendar__month-view__days__day--neighboringMonth { color: ${({ theme }) => adminTokens(theme).colors.white}; }
`;
