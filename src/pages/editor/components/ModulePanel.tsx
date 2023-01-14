import React from "react";
import styled from "styled-components";

/**
 * @title 模块管理器
 */
const ModulePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #141c28;
`;

const ModulePanelHeader = styled.div`
  padding: 12px 16px;
`;

const ModulePanelMain = styled.div`
  felx: 1;
`;

const ModulePanelFooter = styled.div`
  padding: 12px 16px;
`;

type ModulePanelProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const ModulePanel: React.FC<ModulePanelProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <ModulePanelRoot>
      {header && <ModulePanelHeader>{header}</ModulePanelHeader>}
      {children && <ModulePanelMain>{children}</ModulePanelMain>}
      {footer && <ModulePanelFooter>{footer}</ModulePanelFooter>}
    </ModulePanelRoot>
  );
};

export default ModulePanel;
