import { useState } from 'react';

export const useInput = (
  initialValue = '',
  formatter?: (value: string) => string
) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (formatter) {
      newValue = formatter(newValue);
    }

    setValue(newValue);
  };

  const reset = () => setValue(initialValue);

  return { value, onChange, setValue, reset };
};
