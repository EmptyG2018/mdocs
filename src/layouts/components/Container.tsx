import React from "react";
import styled from "styled-components";

const ContainerRoot = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  height: 0;
`;

type ContainerProps = {
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <ContainerRoot {...rest}>{children}</ContainerRoot>;
};

export default Container;
