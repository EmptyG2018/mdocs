import React, { Fragment } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import styled from "styled-components";
import { ActionBtn } from "../../../components";

const ResourceHeaderRoot = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
`;

const ResourceHeaderBackIcon = styled.div`
  margin-right: 4px;
  line-height: 1;
`;

const ResourceHeaderContent = styled.div`
  flex: 1 0 0;
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8e98a3;
`;

const ResourceHeaderExtra = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;

type ResourceHeaderProps = {
  back?: boolean;
  title: string;
  extra?: React.ReactNode[];
  onBack?: () => void;
};

/**
 * @title 资源管理器头部
 *
 * @param extra 拓展内容
 */
const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  back,
  title,
  extra,
  onBack,
}) => {
  return (
    <ResourceHeaderRoot>
      {back && (
        <ResourceHeaderBackIcon>
          <ActionBtn
            icon={<AiOutlineLeft size={16} color="#8e98a3" />}
            spaceSize={6}
            hover
            hoverBackgroundColor="rgba(33, 45, 63, .6)"
            onClick={() => {
              onBack && onBack();
            }}
          />
        </ResourceHeaderBackIcon>
      )}
      <ResourceHeaderContent>{title}</ResourceHeaderContent>
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
