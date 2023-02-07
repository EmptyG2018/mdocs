import React, { useState, useRef, useMemo, useEffect } from "react";
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
import useEditor from "./hooks/useEditor";
import EditorPanel from "./components/EditorPanel";
import Header from "./components/Header";
import Main from "./components/Main";
import ModulePanel from "./components/ModulePanel";
import PreviewPanel from "./components/PreviewPanel";
import ResourcePanel from "./components/ResourcePanel";
import ResourceHeader from "./components/ResourceHeader";
import ResourceSearch from "./components/ResourceSearch";
import { PanelGroup, Panel } from "react-resizable-panels";

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
  const {
    keyword,
    resources,
    openResourceKeys,
    selectedResourceKeys,
    changeKeyword,
    changeOpenResourceKey,
    changeSelectedResourceKey,
  } = useResource();

  const {
    modules,
    moduleKey,
    currentModule,
    changeModule,
    changeModuleKey,
    changeModuleContent,
  } = useModule();

  const { markedMarkdown } = useMarked();

  const { markdownEditor } = useEditor();

  const doc = useMemo(() => {
    const markdown = modules.map((item) => item.content).join("");
    return markedMarkdown(markdown);
  }, [modules]);

  const handleEditorChange = (doc: string) => {
    // changeModuleContent(currentModule?.id, doc);
  };

  const mountEditor = (monaco, editor) => {};

  return (
    <EditorRoot>
      <Header logo="Hello Markdown！" />
      <Main>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={10} maxSize={10}>
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
          </Panel>
          <PanelDividerHandle hoverColor="#8694b0" activeColor="#0351ff" />
          <Panel defaultSize={12} maxSize={12}>
            <ModulePanel>
              <Section
                selectedKey={moduleKey}
                items={modules}
                drag
                onDragEnd={changeModule}
                onChange={changeModuleKey}
              />
            </ModulePanel>
          </Panel>
          <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
          <Panel defaultSize={38} minSize={20}>
            <EditorPanel>
              <MarkdownEditor
                theme="vs"
                model={{
                  value: currentModule?.content,
                  uri: currentModule?.id,
                }}
                onMount={mountEditor}
                onChange={handleEditorChange}
              />
            </EditorPanel>
          </Panel>
          <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
          <Panel defaultSize={40} minSize={25}>
            <PreviewPanel>
              <MarkdownPreview
                doc={doc}
                token={{
                  // *** github黑 *** //
                  // bgColor: "#282c34",
                  // color: "#adbac7",
                  // linkColor: "#539bf5",
                  // hrColor: "#373e47",
                  // headColor: "#adbac7",
                  // headBorderColor: "#373e47",

                  // blockquoteColor: "#768390",
                  // blockquoteBgColor: "#282c34",
                  // blockquoteBorderColor: "#444c56",

                  // codeColor: "#adbac7",
                  // codeBgColor: "#3C434D",
                  // codeBlockBgColor: "#2d333b",

                  // tableColor: "#adbac7",
                  // tableBorderColor: "#373e47",
                  // tableHeadBgColor: "#22272e",
                  // tableHeadColor: "#adbac7",
                  // tableCellBgColor: "#22272e",
                  // tableCellColor: "#adbac7",

                  // *** vue绿 *** //
                  // bgColor: "#ffffff",
                  // color: "#2c3e50",
                  // linkColor: "#3eaf7c",
                  // hrColor: "#eaecef",
                  // headColor: "#2c3e50",
                  // headBorderColor: "#eaecef",

                  // blockquoteColor: "#999",
                  // blockquoteBgColor: "#EDF8F3",
                  // blockquoteBorderColor: "#3eaf7c",

                  // codeColor: "#EB7B25",
                  // codeBgColor: "#F8F8F8",
                  // codeBlockBgColor: "#282c34",

                  // tableColor: "#5B6C7C",
                  // tableBorderColor: "#EBEDEE",
                  // tableHeadBgColor: "#F2F2F2",
                  // tableHeadColor: "#3A4E63",
                  // tableCellBgColor: "#ffffff",
                  // tableCellColor: "#5B6C7C",

                  // *** 掘金蓝 *** //
                  // bgColor: "#ffffff",
                  // color: "#252933",
                  // linkColor: "#0269c8",
                  // hrColor: "#ececec",
                  // headColor: "#252933",
                  // headBorderColor: "#ececec",

                  // blockquoteColor: "#666",
                  // blockquoteBgColor: "#f8f8f8",
                  // blockquoteBorderColor: "#cbcbcb",

                  // codeColor: "#ff502c",
                  // codeBgColor: "#fff5f5",
                  // codeBlockBgColor: "#f8f8f8",

                  // tableColor: "#252933",
                  // tableBorderColor: "#EBEDEE",
                  // tableHeadBgColor: "#F2F2F2",
                  // tableHeadColor: "#252933",
                  // tableCellBgColor: "#ffffff",
                  // tableCellColor: "#252933",

                  // *** 掘金蓝 *** //
                  bgColor: "#f5f4f8",
                  color: "#18113c",
                  linkColor: "#754ffe",
                  hrColor: "#ecebf1",
                  headColor: "#18113c",
                  headBorderColor: "#ecebf1",

                  blockquoteColor: "#666",
                  blockquoteBgColor: "#f8f8f8",
                  blockquoteBorderColor: "#cbcbcb",

                  codeColor: "#d63384",
                  codeBgColor: "transparent",
                  codeBlockBgColor: "#18113c",

                  tableColor: "#252933",
                  tableBorderColor: "#EBEDEE",
                  tableHeadBgColor: "#F2F2F2",
                  tableHeadColor: "#252933",
                  tableCellBgColor: "#ffffff",
                  tableCellColor: "#252933",
                }}
              />
            </PreviewPanel>
          </Panel>
        </PanelGroup>
      </Main>
    </EditorRoot>
  );
};

export default Editor;
