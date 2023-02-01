import React, { Fragment } from "react";
import styled from "styled-components";

/**
 * @title 资源管理器头部
 * @param extra 拓展内容
 */

const ResourceHeaderRoot = styled.div``;

const ResourceHeaderContent = styled.div``;

const ResourceHeaderExtra = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

type ResourceHeaderProps = {
  children?: React.ReactNode;
  extra?: React.ReactNode[];
};

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ children, extra }) => {
  return (
    <ResourceHeaderRoot>
      <ResourceHeaderContent>{children}</ResourceHeaderContent>
      {extra && (
        <ResourceHeaderExtra>
          {extra.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </ResourceHeaderExtra>
      )}
    </ResourceHeaderRoot>
  );
};

export default ResourceHeader;
