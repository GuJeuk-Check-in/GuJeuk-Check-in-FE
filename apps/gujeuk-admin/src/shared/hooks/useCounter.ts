import { useState } from 'react';

export const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);
  const reset = () => setCount(initialValue);
  return { count, setCount, reset };
};
