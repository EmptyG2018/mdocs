import React from "react";
import styled from "styled-components";
import { Section } from "../../../components";
import { useModule } from "../store";

/**
 * @title 模块管理器
 */
const ModulePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #141c28;
`;

const ModulePanelHeader = styled.div`
  padding: 12px 16px;
`;

const ModulePanelMain = styled.div`
  flex: 1 0 auto;
`;

const ModulePanelFooter = styled.div`
  padding: 12px 16px;
`;

const ModulePanel: React.FC = () => {
  const { module, moduleDispatch } = useModule();

  return (
    <ModulePanelRoot>
      <ModulePanelHeader></ModulePanelHeader>
      <ModulePanelMain>
        <Section
          selectedKey={module.moduleKey}
          items={module.modules}
          drag
          onDragEnd={(modules) =>
            moduleDispatch({
              type: "changeModule",
              modules,
            })
          }
          onChange={(moduleKey) =>
            moduleDispatch({
              type: "changeModuleKey",
              moduleKey,
            })
          }
        />
      </ModulePanelMain>
      <ModulePanelFooter></ModulePanelFooter>
    </ModulePanelRoot>
  );
};

export default ModulePanel;
