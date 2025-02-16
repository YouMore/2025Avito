import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

// Кастомный хук для debounce
const useDebounce = (value: string, delay: number, callback: (value: string) => void) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedValue(value);
      callback(value);
    }, delay);

    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay, callback]);

  return debouncedValue;
};

export default useDebounce;