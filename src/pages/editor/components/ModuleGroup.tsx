import React from "react";
import styled from "styled-components";
import { useSpring } from "react-spring";
import { ActionBtn } from "../../../components";
import { AiOutlineUp } from "react-icons/ai";

const ModuleGroupRoot = styled.div`
  padding: 16px 20px;
`;

const ModuleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const ModuleHeaderAside = styled.div`
  flex: 1 1 0;
  width: 0;
  .module-header__title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    padding: 0;
    color: #6a7c8f;
  }
  .module-header__desc {
    font-size: 12px;
    color: #6a7c8f;
    padding: 0;
    margin: 0;
  }
`;

const ModuleHeaderIcon = styled.span`
  margin-left: 6px;
  line-height: 1;
`;

const ModulePlaceholder = styled.div`
  margin-bottom: 16px;
`;

type ModuleGroupProps = {
  title: string;
  desc?: string;
  placeholder?: React.ReactNode;
  expand?: boolean;
  children?: React.ReactNode;
};

/**
 * @title 模块头部
 */
const ModuleGroup: React.FC<ModuleGroupProps> = ({
  title,
  desc,
  placeholder,
  expand = true,
  children,
}) => {
  return (
    <ModuleGroupRoot>
      <ModuleHeader>
        <ModuleHeaderAside>
          <h2 className="module-header__title">{title}</h2>
          <p className="module-header__desc">{desc}</p>
        </ModuleHeaderAside>
        <ModuleHeaderIcon>
          <ActionBtn
            hover
            icon={<AiOutlineUp color="#6a7c8f" size={18} />}
            spaceSize={6}
            hoverBackgroundColor="rgba(33, 45, 63, .6)"
          />
        </ModuleHeaderIcon>
      </ModuleHeader>
      {placeholder && <ModulePlaceholder>{placeholder}</ModulePlaceholder>}

      {children}
    </ModuleGroupRoot>
  );
};

export default ModuleGroup;
