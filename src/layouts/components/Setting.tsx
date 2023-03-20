import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Modal, SettingTab, Locale, ActionBtn } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { setLocale } from "../../stores/localeReducer";
import { localeOptions } from "../../locales";

const SettingSectionRoot = styled.div`
  margin-bottom: 20px;
`;

const SettingSectionTitle = styled.div`
  font-size: 15px;
  margin-bottom: 12px;
`;

const SettingSectionDesc = styled.span`
  font-size: 12px;
  margin-left: 6px;
`;

type SettingSectionProps = {
  title: string;
  desc?: string;
  children?: React.ReactNode;
};

const SettingSection: React.FC<SettingSectionProps> = ({
  title,
  desc,
  children,
}) => {
  return (
    <SettingSectionRoot>
      <SettingSectionTitle>
        {title}
        {desc && <SettingSectionDesc>({desc})</SettingSectionDesc>}
      </SettingSectionTitle>
      {children}
    </SettingSectionRoot>
  );
};

const BaseSettingPane: React.FC = () => {
  const { currentLocale } = useSelector(({ locale }) => locale);
  const dispatch = useDispatch();

  return (
    <>
      <SettingSection title="语言">
        <Locale
          selected={currentLocale}
          items={localeOptions}
          onChange={(key) => dispatch(setLocale(key))}
        />
      </SettingSection>
      <SettingSection title="文件过滤">仅对后缀为'.md'文件显示</SettingSection>
      <SettingSection title="模块级别" desc="根据标题级别划分模块">
        仅对后缀为'.md'文件显示
      </SettingSection>
    </>
  );
};

const ThemeSettingPane: React.FC = () => {
  return (
    <>
      <SettingSection title="界面">
        仅对后缀为'.md'文件显示
      </SettingSection>
      <SettingSection title="VS Code">
        仅对后缀为'.md'文件显示
      </SettingSection>
      <SettingSection title="Markdown">
        仅对后缀为'.md'文件显示
      </SettingSection>
    </>
  );
};

const AboutSettingPane: React.FC = () => {
  return <div>this is view.</div>;
};

const Setting: React.FC<{ open?: boolean }> = ({ open }) => {
  const [tabKey, setTabkey] = useState("base");
  const tabs = [
    {
      key: "base",
      title: "基础",
      render: <BaseSettingPane />,
    },
    {
      key: "theme",
      title: "主题",
      render: <ThemeSettingPane />,
    },
    {
      key: "about",
      title: "关于",
      render: <AboutSettingPane />,
    },
  ];

  return (
    <Modal
      title="设置"
      open={open}
      width={720}
      mode="dark"
      opacity={0.6}
      modalBackground="#111823"
      footer={false}
    >
      <SettingTab
        selected={tabKey}
        items={tabs}
        height={360}
        onChange={(key) => setTabkey(key)}
      />
    </Modal>
  );
};

export default Setting;
