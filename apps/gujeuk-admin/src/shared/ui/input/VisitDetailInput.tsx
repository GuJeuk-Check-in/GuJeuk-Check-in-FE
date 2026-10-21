import { DetailInput, type DetailInputProps } from '@center/ui/form';

export const VisitDetailInput = (props: Omit<DetailInputProps, 'checkboxLabels'>) => (
  <DetailInput {...props} checkboxLabels={{ checked: '동의 (O)', unchecked: '미동의 (X)' }} />
);
