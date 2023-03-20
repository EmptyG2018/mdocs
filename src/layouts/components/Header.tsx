import React from "react";
import styled from "styled-components";
import { AiOutlineCode } from "react-icons/ai";

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
  extra?: React.ReactNode;
};

/**
 * @title 头部
 */
const HeaderTop: React.FC<HeaderProps> = ({ logo, extra }) => {
  return (
    <HeaderRoot>
      <HeaderWrap>
        <HeaderLogo>
          <HeaderLogoIcon />
          {logo}
        </HeaderLogo>
        <HeaderExtra>{extra}</HeaderExtra>
      </HeaderWrap>
    </HeaderRoot>
  );
};

export default HeaderTop;
