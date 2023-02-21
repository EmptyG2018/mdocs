import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { MarkdownEditor } from "../../../components";
import { useModule } from "../store";

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
      <EditorPanelFooter></EditorPanelFooter>
    </EditorPanelRoot>
  );
};

export default EditorPanel;
