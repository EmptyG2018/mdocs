import React from "react";
import styled from "styled-components";

/**
 * @title 资源管理器
 */
const ResourcePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #192230;
`;

const ResourcePanelHeader = styled.div`
  padding: 12px 16px;
`;

const ResourcePanelMain = styled.div`
  flex: 1;
`;

const ResourcePanelFooter = styled.div`
  padding: 12px 16px;
`;

type ResourcePanelProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const ResourcePanel: React.FC<ResourcePanelProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <ResourcePanelRoot>
      {header && <ResourcePanelHeader>{header}</ResourcePanelHeader>}
      {children && <ResourcePanelMain>{children}</ResourcePanelMain>}
      {footer && <ResourcePanelFooter>{footer}</ResourcePanelFooter>}
    </ResourcePanelRoot>
  );
};

export default ResourcePanel;
