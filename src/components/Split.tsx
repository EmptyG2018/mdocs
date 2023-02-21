import React from "react";
import styled, { css } from "styled-components";
import SplitComponent, {
  SplitProps as SplitSplitComponentProps,
} from "react-split";

type SplitProps = SplitSplitComponentProps & {
  children: React.ReactNode;
  hoverColor?: string;
  activeColor?: string;
  layout?: "flex" | "float";
};

const SplitRoot = styled(SplitComponent)<SplitProps>`
  ${({ direction, layout }) =>
    direction === "horizontal" &&
    layout === "flex" &&
    css`
      display: flex;
      flex-direction: row;
      height: 100%;
    `}

  ${({ direction, layout }) =>
    direction === "vertical" &&
    layout === "float" &&
    css`
      height: 100%;
      & > div {
        float: left;
        height: 100%;
      }
    `}

  .gutter {
    background-color: ${({ color }) => color};
    &:hover {
      background-color: ${({ hoverColor }) => hoverColor};
    }
  }

  .gutter.gutter-horizontal {
    cursor: col-resize;
  }
`;

const Split: React.FC<SplitProps> = ({
  children,
  direction = "horizontal",
  layout = "flex",
  hoverColor,
  activeColor,
  ...rest
}) => {
  return (
    <SplitRoot
      direction={direction}
      layout={layout}
      hoverColor={hoverColor}
      activeColor={activeColor}
      {...rest}
    >
      {children}
    </SplitRoot>
  );
};

export default Split;
