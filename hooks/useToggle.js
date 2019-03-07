import { useState, useCallback } from 'react';

export default initValue => {
  const [isOn, setOn] = useState(initValue);
  const on = useCallback(() => {
    setOn(true);
  }, [setOn]);
  const off = useCallback(() => {
    setOn(false);
  }, [setOn]);
  const toggle = useCallback(() => {
    setOn(prev => !prev);
  }, [setOn]);

  return [isOn, on, off, toggle];
};
