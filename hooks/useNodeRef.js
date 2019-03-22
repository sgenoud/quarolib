import { useState, useCallback } from 'react';

export default val => {
  const [node, setNode] = useState(val);

  const ref = useCallback(updatedNode => {
    setNode(updatedNode);
  }, []);
  return [node, ref];
};
