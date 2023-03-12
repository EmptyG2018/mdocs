import React, { useState, useMemo } from "react";
import {
  AiOutlineCheck,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHolder,
  AiOutlinePlus,
} from "react-icons/ai";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { ActionBtn, Input, Section, SectionItem } from "../../../components";
import { useRandPrimaryKey } from "../../../hooks";
import { useStoreModule } from "../stores";
import Modal from "./Modal";
import ModuleAddBtn from "./ModuleAddBtn";
import ModuleGroup from "./ModuleGroup";

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
  height: 0;
`;
const ModuleScrollOuter = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ModulePanelFooter = styled.div`
  padding: 12px 16px;
`;

/**
 * @title 模块管理器
 */
const ModulePanel: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [addModalName, setAddModalName] = useState("");
  const [editModalId, setEditModalId] = useState("");

  const { rand: moduleRand } = useRandPrimaryKey({
    type: "module",
  });

  const { selectedModule, modules, templateModules, moduleDispatch } =
    useStoreModule();

  const filteredTemplateModules = useMemo(() => {
    return templateModules.filter(
      (templateModule) =>
        !modules.some((module) => templateModule.id === module.templateId)
    );
  }, [templateModules, modules]);

  const createModule = (callback: () => void) => {
    const addId = moduleRand(0);

    moduleDispatch({
      type: "SET_MODULES",
      payload: [
        ...modules,
        {
          id: addId,
          label: addModalName,
          content: "",
        },
      ],
    });

    moduleDispatch({
      type: "SET_SELECTED_MODULE",
      payload: addId,
    });

    typeof callback === "function" && callback();
  };

  const moveModule = (module: any) => {
    const moveId = moduleRand(0);

    moduleDispatch({
      type: "SET_MODULES",
      payload: [
        ...modules,
        {
          ...module,
          templateId: module.id,
          id: moveId,
        },
      ],
    });

    moduleDispatch({
      type: "SET_SELECTED_MODULE",
      payload: moveId,
    });
  };

  const deleteModule = (module: any) => {
    moduleDispatch({
      type: "SET_MODULES",
      payload: modules.filter((item) => item.id !== module.id),
    });
  };

  const updateModule = (module: any) => {};

  return (
    <>
      <ModulePanelRoot>
        <ModulePanelMain>
          <ModuleScrollOuter>
            <ModuleGroup
              title={
                <FormattedMessage
                  id="module.usedModule.title"
                  defaultMessage="已使用模块"
                />
              }
              desc={
                <FormattedMessage
                  id="module.usedModule.desc"
                  defaultMessage="选中下列模块列表，可切换模块内容"
                />
              }
            >
              <Section
                multiple={false}
                selectedKeys={[selectedModule]}
                drag
                items={modules}
                onDragEnd={(modules) =>
                  moduleDispatch({
                    type: "SET_MODULES",
                    payload: modules,
                  })
                }
                onChange={(_, key) =>
                  moduleDispatch({
                    type: "SET_SELECTED_MODULE",
                    payload: key,
                  })
                }
              >
                {(item, drag) => (
                  <SectionItem
                    title={item.label}
                    extendGap={4}
                    key={item.id}
                    prefixIcon={drag ? <AiOutlineHolder /> : null}
                    extend={[
                      <ActionBtn icon={<AiOutlineEdit />} spaceSize={6} />,
                      <ActionBtn
                        icon={<AiOutlineDelete />}
                        spaceSize={6}
                        onClick={() => deleteModule(item)}
                      />,
                    ]}
                  />
                )}
              </Section>
            </ModuleGroup>
            <ModuleGroup
              title={
                <FormattedMessage
                  id="module.templateModule.title"
                  defaultMessage="模块模版"
                />
              }
              desc={
                <FormattedMessage
                  id="module.templateModule.desc"
                  defaultMessage="更多好地模块，任由你使用"
                />
              }
              placeholder={
                <ModuleAddBtn
                  icon={<AiOutlinePlus size={20} />}
                  desc={
                    <FormattedMessage
                      id="module.btnText.add"
                      defaultMessage="点击这里，创建模块"
                    />
                  }
                  onClick={() => setModalShow(true)}
                />
              }
            >
              <Section
                multiple={false}
                selectedKeys={[selectedModule]}
                items={filteredTemplateModules}
                onChange={(_, key) =>
                  moduleDispatch({
                    type: "SET_SELECTED_MODULE",
                    payload: key,
                  })
                }
              >
                {(item) => (
                  <SectionItem
                    title={item.label}
                    extendGap={4}
                    key={item.id}
                    extend={[
                      <ActionBtn
                        icon={<AiOutlineCheck />}
                        spaceSize={6}
                        onClick={() => moveModule(item)}
                      />,
                    ]}
                  />
                )}
              </Section>
            </ModuleGroup>
          </ModuleScrollOuter>
        </ModulePanelMain>
        <ModulePanelFooter></ModulePanelFooter>
      </ModulePanelRoot>

      <Modal
        title={
          <FormattedMessage
            id="module.modalTitle.add"
            defaultMessage="创建模块"
          />
        }
        open={modalShow}
        width={420}
        mode="dark"
        opacity={0.6}
        modalBackground="#111823"
        onCancel={() => setModalShow(false)}
        onConfirm={() => {
          createModule(() => {
            setModalShow(false);
          });
        }}
      >
        <Input
          value={addModalName}
          placeholder={
            <FormattedMessage
              id="module.input.add.placeholder"
              defaultMessage="模块名称"
            />
          }
          color="#8e98a3"
          size={14}
          autoFocus
          backgroundColor="#141c28"
          focusBorderColor="#0351ff"
          placeholderColor="#8e98a3"
          onChange={setAddModalName}
          onEnter={() => {
            createModule(() => {
              setModalShow(false);
            });
          }}
        />
      </Modal>
    </>
  );
};

export default ModulePanel;
