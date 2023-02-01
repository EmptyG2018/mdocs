import React from "react";
import styled from "styled-components";

/**
 * @title md编辑器
 */

const EditorPanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const EditorPanelHeader = styled.div`
  padding: 12px 16px;
`;
const EditorPanelMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
  height: 0;
`;
const EditorPanelFooter = styled.div`
  padding: 12px 16px;
`;

type EditorPanelProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const EditorPanel: React.FC<EditorPanelProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <EditorPanelRoot>
      {header && <EditorPanelHeader>{header}</EditorPanelHeader>}
      {children && <EditorPanelMain>{children}</EditorPanelMain>}
      {footer && <EditorPanelFooter>{footer}</EditorPanelFooter>}
    </EditorPanelRoot>
  );
};

export default EditorPanel;
