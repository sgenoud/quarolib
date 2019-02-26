# QuaroLib

Some code that can be reused across many different projects. The aim is to not
create libraries that need to support all uses cases.

The base code is here, if something more specific needs to be built, then
modify the code. Nevertheless pull requests to fix bugs in the code are always
welcome.

### What is in there

##### Helper to create tooltips

- `hooks/usePopper.js`: glue code between popper.js and React. Read more about
  is [here](https://carrots.sgenoud.com/use-popper.js-in-react/)

- `components/Tooltip.jsx`: the base styled components for building tooltips

##### Hooks for simple, well defined, tasks

- `hooks/useOutsideCallback.jsx`: hooks to defined a callback that will be
  called when a user clicks outside a list of targets. What is different about
  this implementation is that you can define an array of nodes that are
  considered the "inside".

- `hooks/useMousetrap.jsx`: hooks to bind to a mousetrap instance (for simple
  keyboard shortcuts creation.)
