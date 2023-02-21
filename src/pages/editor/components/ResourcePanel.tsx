import React from "react";
import {
  AiOutlineFileAdd,
  AiOutlineFolderAdd,
  AiOutlineMinusSquare,
} from "react-icons/ai";
import styled from "styled-components";
import ResourceHeader from "./ResourceHeader";
import ResourceSearch from "./ResourceSearch";

/**
 * @title 资源管理器
 */
const ResourcePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
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

/**
 * @title 新增文件夹按钮
 */
const ResourceExtraButtonRoot = styled.div`
  padding: 6px;
  border: 0;
  font-size: 16px;
  color: #8e98a3;
`;

type ResourceExtraButtonProps = {
  children?: React.ReactNode;
};

const ResourceExtraButton: React.FC<ResourceExtraButtonProps> = ({
  children,
}) => {
  return <ResourceExtraButtonRoot>{children}</ResourceExtraButtonRoot>;
};

type ResourcePanelProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

const ResourcePanel: React.FC<ResourcePanelProps> = () => {
  return (
    <ResourcePanelRoot>
      <ResourcePanelHeader></ResourcePanelHeader>
      <ResourcePanelMain>
        <ResourceHeader
          extra={[
            <ResourceExtraButton>
              <AiOutlineFileAdd />
            </ResourceExtraButton>,
            <ResourceExtraButton>
              <AiOutlineFolderAdd />
            </ResourceExtraButton>,
            <ResourceExtraButton>
              <AiOutlineMinusSquare />
            </ResourceExtraButton>,
          ]}
        >
          <ResourceSearch
            placeholder="搜索文件资源"
            keyword={keyword}
            onChange={changeKeyword}
          />
        </ResourceHeader>
      </ResourcePanelMain>
      <ResourcePanelFooter></ResourcePanelFooter>
    </ResourcePanelRoot>
  );
};

export default ResourcePanel;
