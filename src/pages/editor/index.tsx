import React from "react";
import styled from "styled-components";

// import { Panel, PanelGroup } from "react-resizable-panels";
// import { PanelDividerHandle } from "../../components";

import Split from "react-split";
import EditorPanel from "./components/EditorPanel";
import Header from "./components/Header";
import Main from "./components/Main";
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

const Editor: React.FC = () => {
  const { module, moduleDispatch } = StoreModule();

  return (
    <ModuleConext.Provider value={{ module, moduleDispatch }}>
      <EditorRoot>
        <Header logo="Hello Markdown！" />
        <Main>
          <Split className="split">
            <div></div>
            <div></div>
          </Split>
          {/* <PanelGroup direction="horizontal">
            <PanelDividerHandle hoverColor="#8694b0" activeColor="#0351ff" />
            <Panel defaultSize={12} maxSize={12}>
              <ModulePanel />
            </Panel>
            <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
            <Panel defaultSize={38} minSize={20}>
              <EditorPanel />
            </Panel>
            <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
            <Panel defaultSize={40} minSize={25}>
              <PreviewPanel />
            </Panel>
          </PanelGroup> */}
        </Main>
      </EditorRoot>
    </ModuleConext.Provider>
  );
};

export default Editor;
