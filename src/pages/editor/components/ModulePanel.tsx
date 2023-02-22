import React from "react";
import styled from "styled-components";
import { Section } from "../../../components";
import ModuleAddBtn from "./ModuleAddBtn";
import { useModule } from "../store";
import { AiFillPlusCircle } from "react-icons/ai";

/**
 * @title 模块管理器
 */
const ModulePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #141c28;
`;

const ModulePanelHeader = styled.div`
  padding: 12px 20px;
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
      <ModulePanelHeader>
        <ModuleAddBtn
          icon={<AiFillPlusCircle size={28} />}
          desc="点击这里，创建模块"
        />
      </ModulePanelHeader>
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
      <ModulePanelFooter>
      </ModulePanelFooter>
    </ModulePanelRoot>
  );
};

export default ModulePanel;
