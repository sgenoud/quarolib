/* global document */
import { useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap'; // this is https://github.com/ccampbell/mousetrap

// We need to create an instance when different components can try to change
// (destroy and create) the same key bindings, introducing a race condition.
export const useMousetrapInstance = () => {
  const instanceHandler = useRef(Mousetrap(document));

  useEffect(
    () => () => {
      instanceHandler.current.reset();
      instanceHandler.current = null;
    },
    []
  );

  return instanceHandler;
};

// The default Mousetrap instance can be used in two cases.
//
// First, in cases where we do not expect the same keybindings to be unbound
// and rebound very quickly. It can create a race condition where a the
// function to unbind is run before it after it gets bound in the new component
// (disabling both handlers).
//
// Then, if more than one component uses the same key bindings they also might
// override each other.
//
// If you are in a case where it happens, add an instance within your model.
export default (key, handler, mousetrap = Mousetrap) => {
  const refHandler = useRef(handler);

  useEffect(() => {
    refHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!mousetrap) return;
    mousetrap.bind(key, () => {
      if (!refHandler.current) return;
      refHandler.current();
    });

    // eslint-disable-next-line consistent-return
    return () => {
      mousetrap.unbind(key);
    };
  }, [key, mousetrap]);
};
