import React from "react";
import styled from "styled-components";
import { PanelResizeHandle } from "react-resizable-panels";

type PanelDividerHandle = {
  color: string;
  activeColor: string;
  hoverColor: string;
};

const PanelResizeHandleRoot = styled(PanelResizeHandle)<PanelDividerHandle>`
  flex: 0 0 4px;
  position: relative;
  outline: none;
  background-color: ${(props) => props.hoverColor};
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &[data-resize-handle-active] {
    background-color: ${(props) => props.activeColor};
  }
`;

const PanelDividerHandle: React.FC<PanelDividerHandle> = ({
  color = "transparent",
  activeColor = "transparent",
  hoverColor = "transparent",
  ...rest
}) => {
  return (
    <PanelResizeHandleRoot
      color={color}
      activeColor={activeColor}
      hoverColor={hoverColor}
      {...rest}
    ></PanelResizeHandleRoot>
  );
};

export default PanelDividerHandle;
