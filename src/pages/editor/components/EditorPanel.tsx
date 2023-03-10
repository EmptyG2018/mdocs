import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { ActionBtn, MarkdownEditor } from "../../../components";
import { useStoreModule } from "../stores";
import { AiFillCode, AiFillInfoCircle } from "react-icons/ai";

/**
 * @title markdown语法提示alt
 */
const EditorHelpAlt: React.FC = () => {
  return (
    <ActionBtn
      hover={false}
      icon={<AiFillInfoCircle size={18} />}
      spaceSize={6}
      alt="#(1-^)： (1-6)级标题
-：  无序列表
1.： 有序列表
>：  引用
*：  斜体
**： 加粗
~~： 中划线
![alt](URL)：  图片
[title](URL)：  链接
`代码`：  行内代码
```代码```：  代码块
---：  分隔线"
    />
  );
};

const EditorNullPlaceholderRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${({ color }) => color};

  .editor-null-placeholder__icon {
    line-height: 1;
  }
  .editor-null-placeholder__title {
    margin: 16px 0 0 0;
    font-size: 24px;
  }
  .editor-null-placeholder__desc {
    margin: 8px 0 0 0;
    font-size: 12px;
  }
`;

type EditorNullPlaceholderProps = {
  color?: string;
  icon: React.ReactNode;
  title?: string;
  desc?: string;
};

/**
 * @title 编辑器空占位视图
 */
const EditorNullPlaceholder: React.FC<EditorNullPlaceholderProps> = ({
  icon,
  title,
  ...rest
}) => {
  return (
    <EditorNullPlaceholderRoot {...rest}>
      {<div className="editor-null-placeholder__icon">{icon}</div>}
      {title && <h2 className="editor-null-placeholder__title">{title}</h2>}
    </EditorNullPlaceholderRoot>
  );
};

const EditorPanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorPanelHeader = styled.div`
  padding: 12px 16px;
`;
const EditorActionPanel = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 6px;
`;

const EditorPanelMain = styled.div`
  flex: 1 0 0;
  width: 100%;
  height: 0;
`;
const EditorPanelFooter = styled.div`
  padding: 12px 16px;
`;

/**
 * @title md编辑器
 */
const EditorPanel: React.FC = () => {
  const { selectedModule, modules, templateModules, moduleDispatch } =
    useStoreModule();

  const currentModule = useMemo(() => {
    const moduleItem = modules.find((item) => item.id === selectedModule);
    if (moduleItem) return { ...moduleItem, readOnly: false };

    const templateModuleItem = templateModules.find(
      (item) => item.id === selectedModule
    );
    if (templateModuleItem) return { ...templateModuleItem, readOnly: true };

    return undefined;
  }, [selectedModule, modules, templateModules]);

  const handleEditorChange = useCallback(
    (doc: string) => {
      moduleDispatch({
        type: "SET_MODULE_CONTENT",
        payload: {
          moduleId: currentModule.id,
          content: doc,
        },
      });
    },
    [currentModule]
  );

  return (
    <EditorPanelRoot>
      <EditorPanelHeader>
        <EditorActionPanel></EditorActionPanel>
      </EditorPanelHeader>
      <EditorPanelMain>
        {currentModule ? (
          <MarkdownEditor
            theme="vs-dark"
            model={{
              readOnly: currentModule.readOnly,
              value: currentModule.content,
              uri: currentModule.id,
            }}
            onChange={handleEditorChange}
          />
        ) : (
          <EditorNullPlaceholder
            color="#293241"
            icon={<AiFillCode size={96} color="#293241" />}
            title="Markdown Editor"
          />
        )}
      </EditorPanelMain>
      <EditorPanelFooter>
        <EditorHelpAlt />
      </EditorPanelFooter>
    </EditorPanelRoot>
  );
};

export default EditorPanel;
