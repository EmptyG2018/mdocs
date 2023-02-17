import React, { useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineMinusSquare,
} from "react-icons/ai";

import {
  Path,
  Section,
  MarkdownEditor,
  MarkdownPreview,
  PanelDividerHandle,
} from "../../components";
import { useMarked } from "../../hooks";
import useResource from "./hooks/useResource";
import useModule from "./hooks/useModule";
import EditorPanel from "./components/EditorPanel";
import Header from "./components/Header";
import Main from "./components/Main";
import ModulePanel from "./components/ModulePanel";
import PreviewPanel from "./components/PreviewPanel";
import ResourcePanel from "./components/ResourcePanel";
import ResourceHeader from "./components/ResourceHeader";
import ResourceSearch from "./components/ResourceSearch";
import { PanelGroup, Panel } from "react-resizable-panels";

import { ModuleConext, StoreModule } from "./store";

/**
 * @title 新增文件夹按钮
 */
const ResourceExtraButtonRoot = styled.div`
  padding: 6px;
  border: 0;
  font-size: 16px;
  color: #8e98a3;
`;

type ResourceExtraButtonProps = {
  children?: React.ReactNode;
};

const ResourceExtraButton: React.FC<ResourceExtraButtonProps> = ({
  children,
}) => {
  return <ResourceExtraButtonRoot>{children}</ResourceExtraButtonRoot>;
};

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
          <PanelGroup direction="horizontal">
            {/* <Panel defaultSize={10} maxSize={10}>
            <ResourcePanel
              header={
                <ResourceHeader
                  extra={[
                    <ResourceExtraButton>
                      <AiOutlineFileAdd />
                    </ResourceExtraButton>,
                    <ResourceExtraButton>
                      <AiOutlineFolderAdd />
                    </ResourceExtraButton>,
                    <ResourceExtraButton>
                      <AiOutlineMinusSquare />
                    </ResourceExtraButton>,
                  ]}
                >
                  <ResourceSearch
                    placeholder="搜索文件资源"
                    keyword={keyword}
                    onChange={changeKeyword}
                  />
                </ResourceHeader>
              }
            >
              <Path
                openKeys={openResourceKeys}
                selectedKeys={selectedResourceKeys}
                items={resources}
                onOpenChange={changeOpenResourceKey}
                onSelect={changeSelectedResourceKey}
              />
            </ResourcePanel>
          </Panel> */}
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
          </PanelGroup>
        </Main>
      </EditorRoot>
    </ModuleConext.Provider>
  );
};

export default Editor;
