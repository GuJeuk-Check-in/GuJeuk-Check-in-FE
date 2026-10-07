import { useState } from 'react';

export const useCheck = (initialValue = false) => {
  const [checked, setChecked] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return { checked, onChange, setChecked };
};
