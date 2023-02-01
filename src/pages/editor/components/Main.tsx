import React from "react";
import styled from "styled-components";

const MainRoot = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 auto;
`;

type MainProps = {
  children?: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ children }) => {
  return <MainRoot>{children}</MainRoot>;
};

export default Main;
