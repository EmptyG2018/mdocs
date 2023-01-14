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
      key: 1,
      label: "标题和描述",
    },
    {
      key: 2,
      label: "快捷入口",
    },
    {
      key: 3,
      label: "附录",
    },
    {
      key: 4,
      label: "技术栈",
    },
  ];

  const handleEditorChange = (doc: any) => {
    changeDoc(marked.parse(doc));
  };

  const Demo = styled.div`
    .Resizer {
      background: #000;
      opacity: 0.2;
      z-index: 1;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -moz-background-clip: padding;
      -webkit-background-clip: padding;
      background-clip: padding-box;
    }

    .Resizer:hover {
      -webkit-transition: all 2s ease;
      transition: all 2s ease;
    }

    .Resizer.horizontal {
      height: 11px;
      margin: -5px 0;
      border-top: 5px solid rgba(255, 255, 255, 0);
      border-bottom: 5px solid rgba(255, 255, 255, 0);
      cursor: row-resize;
      width: 100%;
    }

    .Resizer.horizontal:hover {
      border-top: 5px solid rgba(0, 0, 0, 0.5);
      border-bottom: 5px solid rgba(0, 0, 0, 0.5);
    }

    .Resizer.vertical {
      width: 11px;
      margin: 0 -5px;
      border-left: 5px solid rgba(255, 255, 255, 0);
      border-right: 5px solid rgba(255, 255, 255, 0);
      cursor: col-resize;
    }

    .Resizer.vertical:hover {
      border-left: 5px solid rgba(0, 0, 0, 0.5);
      border-right: 5px solid rgba(0, 0, 0, 0.5);
    }
    .Resizer.disabled {
      cursor: not-allowed;
    }
    .Resizer.disabled:hover {
      border-color: transparent;
    }
  `;

  return (
    <EditorRoot>
      <Header />
      <Main>
        <PanelGroup direction="horizontal">
          <Panel minSize={10}>
            <ResourcePanel
              header={
                <ResourceHeader
                  extra={[
                    <ResourceExtraButton>新增文件</ResourceExtraButton>,
                    <ResourceExtraButton>新增文件夹</ResourceExtraButton>,
                    <ResourceExtraButton>展开/折叠</ResourceExtraButton>,
                  ]}
                >
                  <ResourceSearch keyword={keyword} onChange={changeKeyword} />
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
          <PanelDividerHandle />
          <Panel defaultSize={10}>
            <ModulePanel>
              <Section items={sections} />
            </ModulePanel>
          </Panel>
          <PanelDividerHandle />
          <Panel defaultSize={10}>
            <EditorPanel>
              <MarkdownEditor onChange={handleEditorChange} />
            </EditorPanel>
          </Panel>
          <PanelDividerHandle />
          <Panel defaultSize={10}>
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
