import type { ReactPortal } from "react";
import React, { useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const MaskRoot = styled.div<{ background: string; zIndex: number }>`
  z-index: ${(props) => props.zIndex};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.background};
`;

type MaskProps = {
  mode?: "light" | "dark";
  opacity?: number;
  zIndex?: number;
  open?: boolean;
  getContainer?: HTMLDivElement;
};

const Mask: React.FC<MaskProps> = ({
  mode = "light",
  opacity = 0.8,
  zIndex = 1000,
  getContainer,
  open,
}) => {
  const modeMap = {
    light: "255, 255, 255",
    dark: "0, 0, 0",
  };
  const background = `rgba(${modeMap[mode] || modeMap["light"]}, ${opacity})`;

  const maskNode = useRef<ReactPortal | null>();

  if (!open) return null;

  const getContainerEl = useCallback(() => {
    return (
      getContainer ||
      (() => {
        const maskEl = document.createElement("div");
        document.body.appendChild(maskEl);
        return maskEl;
      })()
    );
  }, [getContainer]);

  if (!maskNode.current) {
    maskNode.current = createPortal(
      <MaskRoot zIndex={zIndex} background={background}></MaskRoot>,
      getContainerEl()
    );
  }

  return maskNode.current;
};

export default Mask;
