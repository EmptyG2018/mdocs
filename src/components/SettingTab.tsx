import React from "react";
import styled, { css } from "styled-components";

const SettingTabRoot = styled.div`
  display: flex;
  height: ${({ height }) => (height ? height + "px" : null)};
`;

const SettingTabNav = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 160px;
  box-sizing: border-box;
  gap: 6px;
  margin-right: 16px;
`;

const SettingTabNavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 16px;
  ${({ selected }) => css`
    background-color: ${selected ? "rgb(3, 81, 255)" : null};
    color: ${selected ? "#fff" : null};
  `}
  border-radius: 4px;
`;

const SettingTabIcon = styled.div`
  line-height: 1;
`;

const SettingTabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1 0 0;
  width: 0;
  min-height: 100%;
  overflow-y: auto;
`;

const SettingTabPane = styled.div``;

const SettingTabPaneTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;
`;

const SettingTabPaneContent = styled.div``;

export type TabKey = string | number;

export type Tab = {
  key: TabKey;
  icon?: React.ReactNode;
  title: string;
  render: React.ReactNode;
};

export type SettingTabProps = {
  selected?: TabKey;
  items: Tab[];
  height?: number;
  onChange?: (key: TabKey, item: Tab) => void;
};

const SettingTab: React.FC<SettingTabProps> = ({
  selected,
  items,
  onChange,
  ...rest
}) => {
  return (
    <SettingTabRoot {...rest}>
      <SettingTabNav>
        {items.map((item) => (
          <SettingTabNavItem selected={item.key === selected}>
            {item.icon && <SettingTabIcon>{item.icon}</SettingTabIcon>}
            {item.title}
          </SettingTabNavItem>
        ))}
      </SettingTabNav>
      <SettingTabContent>
        {items.map((item) => (
          <SettingTabPane>
            <SettingTabPaneTitle>{item.title}</SettingTabPaneTitle>
            <SettingTabPaneContent>{item.render}</SettingTabPaneContent>
          </SettingTabPane>
        ))}
      </SettingTabContent>
    </SettingTabRoot>
  );
};

export default SettingTab;
