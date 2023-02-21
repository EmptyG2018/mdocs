import React from "react";
import styled from "styled-components";

import { Split } from "../../components";
import EditorPanel from "./components/EditorPanel";
import Header from "./components/Header";
import ModulePanel from "./components/ModulePanel";
import PreviewPanel from "./components/PreviewPanel";

import { ModuleConext, StoreModule } from "./store";

/**
 * @title 编辑
 */
const EditorRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #1d2532;
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
`;

const Aside = styled.div`
  flex-basis: 320px;
  height: 100%;
`;

const Container = styled.div`
  flex: 1 0 0;
  width: 0;
  height: 100%;
`;

const Editor: React.FC = () => {
  const { module, moduleDispatch } = StoreModule();

  return (
    <ModuleConext.Provider value={{ module, moduleDispatch }}>
      <EditorRoot>
        <Header logo="Hello Markdown！" />
        <Main>
          <Aside>
            <ModulePanel />
          </Aside>
          <Container>
            <Split
              direction="horizontal"
              layout="flex"
              minSize={400}
              color="#1d2532"
              hoverColor="#0351ff"
              activeColor="#0351ff"
              gutterSize={3}
            >
              <EditorPanel />
              <PreviewPanel />
            </Split>
          </Container>
        </Main>
      </EditorRoot>
    </ModuleConext.Provider>
  );
};

export default Editor;
