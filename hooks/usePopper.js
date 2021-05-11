// This hook is heavily insprired from https://github.com/FezVrasta/react-popper
import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { createPopper } from '@popperjs/core';

const useDiffedState = initVal => {
  const [storedValue, setStoredValue] = useState(initVal);

  const setValue = useCallback(value => {
    setStoredValue(prevState => {
      if (isEqual(prevState, value)) {
        return prevState;
      }
      return value;
    });
  }, []);
  return [storedValue, setValue];
};

const initialMod = [];

const usePopperState = placement => {
  const [currentStyles, setStyles] = useDiffedState({
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  });
  const [currentArrowStyles, setArrowStyles] = useDiffedState({});
  const [currentPlacement, setPlacement] = useState(placement);

  const updatePopperState = useCallback(
    updatedData => {
      const { styles, placement: updatedPlacement } = updatedData;

      setStyles(styles.popper);
      setArrowStyles(styles.arrow);
      setPlacement(updatedPlacement);
      return updatedData;
    },
    [setArrowStyles, setStyles]
  );

  const popperStyles = {
    styles: currentStyles,
    placement: currentPlacement,
    arrowStyles: currentArrowStyles,
  };

  return [popperStyles, updatePopperState];
};

export default ({
  referrenceNode,
  popperNode,
  arrowNode,
  placement = 'bottom',
  offset = 8,
  positionFixed = false,
  modifiers = initialMod,
}) => {
  const [popperStyles, updatePopperState] = usePopperState(placement);
  const popperInstance = useRef();

  const offsetRef = useRef(offset);
  useEffect(() => {
    offsetRef.current = offset;
    popperInstance.current && popperInstance.current.update();
  }, [offset]);

  // manage the popper instance lifecycle
  useLayoutEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }

    if (!referrenceNode || !popperNode) return;

    popperInstance.current = createPopper(referrenceNode, popperNode, {
      placement,
      stragegy: positionFixed ? 'fixed' : 'absolute',
      modifiers: [
        ...modifiers,
        {
          name: 'offset',
          options: {
            offset: () => [0, offsetRef.current],
          },
        },
        {
          name: 'arrow',
          enabled: !!arrowNode,
          options: {
            element: arrowNode,
          },
        },
        {
          name: 'updateState',
          enabled: true,
          phase: 'write',
          fn: ({ state }) => {
            updatePopperState(state);
          },
          requires: ['computeStyles', 'arrow'],
        },
        {
          name: 'applyStyles',
          enabled: false,
        },
      ],
    });

    // eslint-disable-next-line consistent-return
    return () => {
      popperInstance.current.destroy();
      popperInstance.current = null;
    };
  }, [
    arrowNode,
    referrenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers,
    updatePopperState,
  ]);

  useLayoutEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.update();
    }
  });

  return {
    ...popperStyles,
    update: popperInstance.current && popperInstance.current.update,
  };
};
