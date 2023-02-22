import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { MarkdownEditor } from "../../../components";
import { useModule } from "../store";
import { AiFillInfoCircle } from "react-icons/ai";

/**
 * @title md编辑器
 */

const EditorPanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const EditorPanelHeader = styled.div`
  padding: 12px 16px;
`;
const EditorPanelMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
  height: 0;
`;
const EditorPanelFooter = styled.div`
  padding: 12px 16px;
`;

const EditorPanel: React.FC = () => {
  const { module, moduleDispatch } = useModule();

  const currentModule = useMemo(() => {
    return module.modules.find((item) => item.id === module.moduleKey);
  }, [module.moduleKey, module.modules]);

  const handleEditorChange = useCallback(
    (doc: string) => {
      moduleDispatch({
        type: "changeModuleContent",
        moduleKey: currentModule.id,
        doc,
      });
    },
    [currentModule]
  );

  return (
    <EditorPanelRoot>
      <EditorPanelHeader></EditorPanelHeader>
      <EditorPanelMain>
        <MarkdownEditor
          theme="vs-dark"
          model={{
            value: currentModule?.content,
            uri: currentModule?.id,
          }}
          onChange={handleEditorChange}
        />
      </EditorPanelMain>
      <EditorPanelFooter>
        <div
          title="
#(1-^)： (1-6)级标题
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
---：  分隔线

        "
        >
          <AiFillInfoCircle />
        </div>
      </EditorPanelFooter>
    </EditorPanelRoot>
  );
};

export default EditorPanel;
