import styled from '@emotion/styled';

export const MonthSwitcher = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-width: 10rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999rem;
  background-color: rgba(255, 255, 255, 0.18);
  box-shadow: inset 0 0.05rem 0 rgba(255, 255, 255, 0.35);
  padding: 0.35rem;
`;

export const MonthOptionButton = styled.button`
  width: 3.25rem;
  height: 3.25rem;
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 999rem;
  background-color: rgba(255, 255, 255, 0.82);
  color: #25405f;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1;
  transform: scale(0.9);
  transition: background-color 160ms ease, border-color 160ms ease,
    box-shadow 160ms ease, color 160ms ease, opacity 160ms ease,
    transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &[data-position='active'] {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0.5rem 0.9rem rgba(0, 0, 0, 0.18);
    color: #1f2937;
    cursor: default;
    font-size: 1.04rem;
    transform: scale(1);
  }

  &[data-position='previous'],
  &[data-position='next'] {
    opacity: 0.78;
  }

  &[data-position='previous']:hover,
  &[data-position='previous']:focus-visible,
  &[data-position='next']:hover,
  &[data-position='next']:focus-visible {
    background-color: #ffffff;
    border-color: #ffffff;
    box-shadow: 0 0.55rem 1rem rgba(0, 0, 0, 0.2);
    color: #0f50a0;
    opacity: 1;
    outline: none;
    transform: scale(0.96);
  }

  &[data-position='active']:disabled {
    opacity: 1;
  }

  &:disabled:not([data-position='active']) {
    cursor: not-allowed;
    opacity: 0.55;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
