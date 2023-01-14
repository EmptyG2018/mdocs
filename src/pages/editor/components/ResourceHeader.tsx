import React from "react";
import styled from "styled-components";

/**
 * @title 资源管理器头部
 * @param extra 拓展内容
 */

const ResourceHeaderRoot = styled.div``;

const ResourceHeaderContent = styled.div``;

const ResourceHeaderExtra = styled.div``;

type ResourceHeaderProps = {
  children?: React.ReactNode;
  extra?: React.ReactNode[];
};

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ children, extra }) => {
  return (
    <ResourceHeaderRoot>
      <ResourceHeaderContent>{children}</ResourceHeaderContent>
      {extra && (
        <ResourceHeaderExtra>{extra.map((item) => item)}</ResourceHeaderExtra>
      )}
    </ResourceHeaderRoot>
  );
};

export default ResourceHeader;
