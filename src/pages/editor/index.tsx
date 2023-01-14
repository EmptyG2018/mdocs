import React, { useState } from "react";
import styled from "styled-components";

import {
  Path,
  Section,
  MarkdownEditor,
  MarkdownPreview,
  PanelDividerHandle,
} from "../../components";
import EditorPanel from "./components/EditorPanel";
import Header from "./components/Header";
import Main from "./components/Main";
import ModulePanel from "./components/ModulePanel";
import PreviewPanel from "./components/PreviewPanel";
import ResourcePanel from "./components/ResourcePanel";
import ResourceHeader from "./components/ResourceHeader";
import ResourceSearch from "./components/ResourceSearch";
import { PanelGroup, Panel } from "react-resizable-panels";
import { marked } from "marked";

/**
 * @title 新增文件夹按钮
 */
const ResourceExtraButtonRoot = styled.div`
  padding: 6px;
  border: 0;
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
  const [doc, changeDoc] = useState("");
  const [keyword, changeKeyword] = useState("");
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectdKeys] = useState(["file1", "file2"]);
  const items = [
    {
      key: "sub1",
      label: "百度百科",
      children: [
        {
          key: "file1",
          label: "天猫优选",
        },
        {
          key: "file2",
          label: "美团优选",
        },
      ],
    },
  ];

  const sections = [
    {
      value: 1,
      label: "标题和描述",
    },
    {
      value: 2,
      label: "快捷入口",
    },
    {
      value: 3,
      label: "附录",
    },
    {
      value: 4,
      label: "技术栈",
    },
  ];

  const handleEditorChange = (doc: any) => {
    changeDoc(marked.parse(doc));
  };

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
                    <ResourceExtraButton>新增文件</ResourceExtraButton>,
                    <ResourceExtraButton>新增文件夹</ResourceExtraButton>,
                    <ResourceExtraButton>展开/折叠</ResourceExtraButton>,
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
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                items={items}
                onOpenChange={setOpenKeys}
                onSelect={setSelectdKeys}
              />
            </ResourcePanel>
          </Panel>
          <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
          <Panel defaultSize={12} maxSize={12}>
            <ModulePanel>
              <Section value={1} items={sections} />
            </ModulePanel>
          </Panel>
          <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
          <Panel defaultSize={38} minSize={20}>
            <EditorPanel>
              <MarkdownEditor onChange={handleEditorChange} />
            </EditorPanel>
          </Panel>
          <PanelDividerHandle hoverColor="#0351ff" activeColor="#0351ff" />
          <Panel defaultSize={40} minSize={25}>
            <PreviewPanel>
              <MarkdownPreview
                doc={doc}
                token={{
                  bgColor: "#282c34",
                  color: "#adbac7",
                  linkColor: "#539bf5",
                  hrColor: "#373e47",
                  headBorderColor: "#373e47",

                  blockquoteColor: "#768390",
                  blockquoteBorderColor: "#444c56",

                  tableColor: "#adbac7",
                  tableBorderColor: "#373e47",
                  tableHeadBgColor: "#22272e",
                  tableHeadColor: "#adbac7",
                  tableCellBgColor: "#22272e",
                  tableCellColor: "#adbac7",
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
