/* global document */
import { useRef, useEffect } from 'react';

const EVENTS = ['click', 'touchstart'];

// Calls the handler when one of the events is triggered outside of the list of
// input nodes.
// Note that the events list is not refreshed after the initialisation
//
// This code owes a lot to outy https://github.com/souporserious/outy
export default (inputNodes, handler, events = EVENTS) => {
  const handlerRef = useRef(handler);
  let nodes = Array.isArray(inputNodes) ? inputNodes : [inputNodes];
  if (!inputNodes) {
    nodes = null;
  }
  const nodesRef = useRef(nodes);

  useEffect(() => {
    handlerRef.current = handler;
    nodesRef.current = nodes;
  });

  useEffect(
    () => {
      if (!handler || !nodes) {
        return;
      }

      const listener = event => {
        const isEventInside = nodeOrRef => {
          const node = nodeOrRef ? nodeOrRef.current || nodeOrRef : nodeOrRef;
          if (!node || !handlerRef.current) {
            return false;
          }
          return node.contains(event.target);
        };

        // The event needs to be outside all the nodes to call the handler
        if (!nodesRef.current.some(isEventInside)) {
          handlerRef.current(event);
        }
      };

      events.forEach(event => {
        document.addEventListener(event, listener);
      });

      // eslint-disable-next-line consistent-return
      return () => {
        events.forEach(event => {
          document.removeEventListener(event, listener);
        });
      };
    },
    [!handler, !nodes]
  );
};
