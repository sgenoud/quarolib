import styled, { css } from 'styled-components/macro';
import { triangle } from 'polished';

const moveDirection = {
  top: 'left',
  bottom: 'left',
  left: 'top',
  right: 'top',
};
const widthFactor = { top: 2, bottom: 2, left: 1, right: 1 };
const heightFactor = { top: 1, bottom: 1, left: 2, right: 2 };
const coloredArrow = (direction, size, color_) => css`
  ${triangle({
    pointingDirection: direction,
    width: `${size * widthFactor[direction]}px`,
    height: `${size * heightFactor[direction]}px`,
    foregroundColor: color_,
  })}

  ${moveDirection[direction]}: calc(50% - ${size}px);
`;

export const orientedArrow = ({ size = 5, arrowColor = 'inherit' }) => css`
  [data-popper-placement^='top'] & {
    ${coloredArrow('bottom', size, arrowColor)};
    bottom: ${-size}px;
  }

  [data-popper-placement^='bottom'] & {
    ${coloredArrow('top', size, arrowColor)};
    top: ${-size}px;
  }

  [data-popper-placement^='right'] & {
    ${coloredArrow('left', size, arrowColor)};
    left: ${-size}px;
  }

  [data-popper-placement^='left'] & {
    ${coloredArrow('right', size, arrowColor)};
    right: ${-size}px;
  }
`;

export const orientedArrowWithBorder = ({
  size = 5,
  arrowColor = 'white',
  borderColor = 'inherit',
  borderWidth = 1,
}) => css`
  &,
  &:after {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }

  [data-popper-placement^='top'] & {
    ${coloredArrow('bottom', size + borderWidth, borderColor)};
    bottom: ${-size - borderWidth}px;
  }

  [data-popper-placement^='bottom'] & {
    ${coloredArrow('top', size + borderWidth, borderColor)};
    top: ${-size - borderWidth}px;
  }

  [data-popper-placement^='right'] & {
    ${coloredArrow('left', size + borderWidth, borderColor)};
    left: ${-size - borderWidth}px;
  }

  [data-popper-placement^='left'] & {
    ${coloredArrow('right', size + borderWidth, borderColor)};
    right: ${-size - borderWidth}px;
  }

  &:after {
    content: '';
  }

  [data-popper-placement^='top'] &:after {
    ${coloredArrow('bottom', size, arrowColor)};
    bottom: ${borderWidth}px;
  }

  [data-popper-placement^='bottom'] &:after {
    ${coloredArrow('top', size, arrowColor)};
    top: ${borderWidth}px;
  }

  [data-popper-placement^='right'] &:after {
    ${coloredArrow('left', size, arrowColor)};
    left: ${borderWidth}px;
  }

  [data-popper-placement^='left'] &:after {
    ${coloredArrow('right', size, arrowColor)};
    right: ${borderWidth}px;
  }
`;

export const Tooltip = styled.div`
  background-color: white;
  border: solid 1px rgb(94, 173, 203);
  max-width: 350px;
  border-radius: 2px;
  padding: 15px;
  z-index: 100000;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;

export const Arrow = styled.span`
  z-index: 4;
  ${orientedArrowWithBorder({})};
`;
