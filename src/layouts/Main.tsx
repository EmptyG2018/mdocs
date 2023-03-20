import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { ActionBtn } from "../components";
import { Container, Header, Setting } from "./components";
import styled from "styled-components";

const MainRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: rgb(29, 37, 50);
`;

const Main: React.FC = () => {
  const [settingModalShow, setSettingModalShow] = useState(false);

  return (
    <>
      <MainRoot>
        <Header
          logo="Hello Markdown！"
          extra={
            <ActionBtn
              icon={<AiOutlineSetting size={22} color="rgb(106, 124, 143)" />}
              spaceSize={6}
              hover
              hoverBackgroundColor="rgba(33, 45, 63, 0.6)"
              onClick={() => setSettingModalShow(true)}
            />
          }
        />
        <Container>
          <Outlet />
        </Container>
      </MainRoot>
      <Setting open={settingModalShow} />
    </>
  );
};

export default Main;
