import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const markdownEditor = useRef(null);
  const { modules, moduleKey, checkSelected, changeModule, changeModuleKey } =
    useModule();
  const { markedDoc } = useEditor();

  const [doc, changeDoc] = useState("");
  const [keyword, changeKeyword] = useState("");
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const [selectedKeys, setSelectdKeys] = useState(["file1", "file2"]);

  // const doc = modules.map((item) => item.content).join("");

  useEffect(() => {
    if (checkSelected) {
      markdownEditor.current?.setValue("gegeg");
    }
  }, [moduleKey]);

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

  const handleEditorChange = (doc: any) =>
    markedDoc(doc, (error, html) => {
      changeDoc(html);
    });

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
                ref={markdownEditor}
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
                  // *** github *** //
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

                  // *** 柠檬黄 *** //
                  // bgColor: "#ffffff",
                  // color: "#4a5568",
                  // linkColor: "#f2b500",
                  // hrColor: "#eeeeee",
                  // headColor: "#2c3e50",
                  // headBorderColor: "#eeeeee",

                  // blockquoteColor: "#6c757d",
                  // blockquoteBgColor: "#FFFCF2",
                  // blockquoteBorderColor: "#ffc107",

                  // codeColor: "#2f3137",
                  // codeBgColor: "#ffefbe",
                  // codeBlockBgColor: "#e5e5e5",

                  // tableColor: "#4a5568",
                  // tableBorderColor: "#eeeeee",
                  // tableHeadBgColor: "#f8f8f8",
                  // tableHeadColor: "#343a40",
                  // tableCellBgColor: "#ffffff",
                  // tableCellColor: "#4a5568",


                  // *** 柠檬黄 *** //
                  bgColor: "#ffffff",
                  color: "#4a5568",
                  linkColor: "#f2b500",
                  hrColor: "#eeeeee",
                  headColor: "#2c3e50",
                  headBorderColor: "#eeeeee",

                  blockquoteColor: "#6c757d",
                  blockquoteBgColor: "#FFFCF2",
                  blockquoteBorderColor: "#ffc107",

                  codeColor: "#2f3137",
                  codeBgColor: "#ffefbe",
                  codeBlockBgColor: "#e5e5e5",

                  tableColor: "#4a5568",
                  tableBorderColor: "#eeeeee",
                  tableHeadBgColor: "#f8f8f8",
                  tableHeadColor: "#343a40",
                  tableCellBgColor: "#ffffff",
                  tableCellColor: "#4a5568",
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
