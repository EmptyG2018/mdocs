import type { ReactPortal } from "react";
import React, { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { ActionBtn } from "../../../components";
import { FormattedMessage } from "react-intl";
import Mask from "./Mask";

const ModalRoot = styled.div<{ zIndex: number }>`
  z-index: ${(props) => props.zIndex};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const ModalWrapper = styled.div<
  Pick<ModalProps, "width" | "maxWidth" | "top" | "modalBackground">
>`
  ${({ width, maxWidth, top, modalBackground }) => css`
    margin: ${(top ? top + "px" : 0) + " auto 40px auto"};
    width: ${width ? width + "px" : null};
    max-width: ${maxWidth ? maxWidth + "px" : null};
    background-color: ${modalBackground};
    border-radius: 6px;
    box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
    color: #6a7c8f;
  `}
`;

const ModalContainer = styled.div`
  padding: 20px;

  &::before,
  &::after {
    content: "";
    display: table;
  }
`;

const ModalHeader = styled.div`
  padding: 24px 20px 0;
  font-size: 18px;
  color: #8e98a3;
`;

const ModalFooter = styled.div`
  display: flex;
  padding: 0 20px 24px 20px;
  justify-content: flex-end;
  gap: 8px;
`;

type ModalProps = {
  title?: string;
  mode?: "light" | "dark";
  opacity?: number;
  zIndex?: number;
  open?: boolean;
  top?: number;
  width?: number;
  maxWidth?: number;
  cancelText?: string;
  confirmText?: string;
  footer?: boolean;
  modalBackground?: string;
  getContainer?: HTMLDivElement;
  children?: React.ReactNode;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const Modal: React.FC<ModalProps> = ({
  zIndex = 1001,
  top = 100,
  width = 480,
  maxWidth,
  modalBackground = "#fff",
  open,
  title,
  footer = true,
  cancelText,
  confirmText,
  getContainer,
  children,
  onCancel,
  onConfirm,
  ...rest
}) => {
  const modalNode = useRef<HTMLDivElement | null>();

  const getContainerEl = useCallback(() => {
    return (
      getContainer ||
      (() => {
        const modalEl = document.createElement("div");
        document.body.appendChild(modalEl);
        return modalEl;
      })()
    );
  }, [getContainer]);

  if (!open) return null;

  modalNode.current = modalNode.current || getContainerEl();

  return createPortal(
    <ModalRoot zIndex={zIndex}>
      <Mask
        getContainer={modalNode.current}
        zIndex={1000}
        open={open}
        {...rest}
      />
      <ModalWrapper
        top={top}
        width={width}
        maxWidth={maxWidth}
        modalBackground={modalBackground}
      >
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalContainer>{children}</ModalContainer>
        {footer && (
          <ModalFooter>
            <ActionBtn
              title={
                cancelText || (
                  <FormattedMessage
                    id="ui.modal.footer.cancel"
                    defaultMessage="取消"
                  />
                )
              }
              spaceSize={[6, 18]}
              color="#6a7c8f"
              backgroundColor="#192230"
              onClick={() => onCancel && onCancel()}
            />
            <ActionBtn
              title={
                confirmText || (
                  <FormattedMessage
                    id="ui.modal.footer.confirm"
                    defaultMessage="确认"
                  />
                )
              }
              spaceSize={[6, 18]}
              color="#fff"
              backgroundColor="#0351ff"
              onClick={() => onConfirm && onConfirm()}
            />
          </ModalFooter>
        )}
      </ModalWrapper>
    </ModalRoot>,
    modalNode.current
  );
};

export default Modal;
