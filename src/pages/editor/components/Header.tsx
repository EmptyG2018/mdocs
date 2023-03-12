import React, { cloneElement } from "react";
import styled from "styled-components";
import { AiOutlineCode } from "react-icons/ai";
import { ActionBtn } from "../../../components";
import { useSelector, useDispatch } from "react-redux";
import { setLocale } from "../../../stores/localeReducer";

const LocaleRoot = styled.div`
  display: flex;
  gap: 12px;
`;

type LocaleProps = {
  selected: string | number;
  children?: React.ReactNode;
  onChange?: (locale: string | number) => void;
};

const Locale: React.FC<LocaleProps> = ({ selected, children }) => {
  return <LocaleRoot>{children}</LocaleRoot>;
};

type LocaleItemProps = {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
};

const LocaleItem: React.FC<LocaleItemProps> = ({ icon, label, value }) => {
  return (
    <ActionBtn
      icon={icon}
      title={label}
      spaceSize={[2, 6]}
      color="#6a7c8f"
      size={14}
      backgroundColor="#192230"
    />
  );
};

const HeaderRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 0 0 64px;
  background-color: #081120;
`;

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 0 0;
  padding: 0 24px;
`;

const HeaderLogo = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-size: 22px;
  font-weight: 500;
  color: #fff;
`;

const HeaderLogoIcon = styled(AiOutlineCode)`
  margin-right: 8px;
  font-size: 36px;
`;

const HeaderExtra = styled.div`
  display: flex;
  align-items: center;
`;

type HeaderProps = {
  logo?: string;
};

/**
 * @title 头部
 */
const HeaderTop: React.FC<HeaderProps> = ({ logo }) => {
  const { currentLocale, locales } = useSelector(({ locale }) => locale);
  const dispatch = useDispatch();

  return (
    <HeaderRoot>
      <HeaderWrap>
        <HeaderLogo>
          <HeaderLogoIcon />
          {logo}
        </HeaderLogo>
        <HeaderExtra>
          <Locale
            selected={currentLocale}
            onChange={(value) => dispatch(setLocale(value))}
          >
            <div style={{ color: 'red' }} onClick={() => dispatch(setLocale("zh-CN"))}>简体</div>
            <div style={{ color: 'red' }} onClick={() => dispatch(setLocale("zh-HK"))}>繁体</div>
            <div style={{ color: 'red' }} onClick={() => dispatch(setLocale("en-US"))}>英语</div>
            {Object.keys(locales).map((item) => (
              <LocaleItem label={item} value={item} />
            ))}
          </Locale>
        </HeaderExtra>
      </HeaderWrap>
    </HeaderRoot>
  );
};

export default HeaderTop;
