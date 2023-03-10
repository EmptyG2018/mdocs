import React, { useEffect, useMemo, useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineSwitcher,
  AiTwotoneFolder,
} from "react-icons/ai";
import styled from "styled-components";
import { ActionBtn, Path } from "../../../components";
import {
  useMarkdownModuleParse,
  useMarkdownTitleParse,
  useRandPrimaryKey,
} from "../../../hooks";
import { useStoreModule, useStoreResource } from "../stores";
import ResourceHeader from "./ResourceHeader";
import ResourceSearch from "./ResourceSearch";

const ResourceCollpasedPlaceholderRoot = styled.div<
  Pick<ResourceCollpasedPlaceholderProps, "color" | "size">
>`
  position: relative;
  padding: 16px;
  .resource-collpased-placeholder {
    position: absolute;
    display: flex;
    padding-left: 8px;
    align-items: center;
    transform: rotate(90deg);
    transform-origin: 16px;
    user-select: none;
    white-space: nowrap;
    color: ${({ color }) => color};
    font-size: ${({ size }) => (size ? size + "px" : null)};
  }
  .resource-collpased-placeholder__icon {
    line-height: 1;
    margin-right: 8px;
    font-size: 0;
  }
  .resource-collpased-placeholder__title {
    letter-spacing: 0.32em;
  }
`;

type ResourceCollpasedPlaceholderProps = {
  color?: string;
  size?: number;
  icon?: React.ReactNode;
  title?: string;
};

/**
 * 资源折叠占位视图
 */
const ResourceCollpasedPlaceholder: React.FC<
  ResourceCollpasedPlaceholderProps
> = ({ icon, title, ...rest }) => {
  return (
    <ResourceCollpasedPlaceholderRoot {...rest}>
      <span className="resource-collpased-placeholder">
        {icon && (
          <span className="resource-collpased-placeholder__icon">{icon}</span>
        )}
        {title && (
          <span className="resource-collpased-placeholder__title">{title}</span>
        )}
      </span>
    </ResourceCollpasedPlaceholderRoot>
  );
};

const ResourceNullPlaceholderRoot = styled.div<{ color?: string }>`
  padding: 20px 16px;
  color: ${({ color }) => color};
  .resource-null-placeholder__section {
    margin-bottom: 24px;
  }
  .resource-null-placeholder__title {
    margin: 0 0 10px 0;
    font-size: 14px;
  }
  .resouce-null-placeholder__desc {
    font-size: 12px;
  }
`;

type ResourceNullPlaceholderProps = {
  items: {
    title: string;
    desc?: string;
    children?: React.ReactNode;
  }[];
  color?: string;
};

/**
 * 资源空占位视图
 */
const ResourceNullPlaceholder: React.FC<ResourceNullPlaceholderProps> = ({
  items,
  ...rest
}) => {
  return (
    <ResourceNullPlaceholderRoot {...rest}>
      {items.map((item) => (
        <div className="resource-null-placeholder__section">
          <h2 className="resource-null-placeholder__title">{item.title}</h2>
          {item.desc && (
            <p className="resouce-null-placeholder__desc">{item.desc}</p>
          )}
          {item.children}
        </div>
      ))}
    </ResourceNullPlaceholderRoot>
  );
};

/**
 * @title 资源管理器
 */
const ResourcePanelRoot = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #192230;
`;

const ResourcePanelHeader = styled.div`
  padding: 12px 16px 0 16px;
`;

const ResourcePanelMain = styled.div`
  flex: 1 1 0;
  height: 0;
`;

const ResourceScrollOuter = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const ResourcePanelFooter = styled.div`
  padding: 12px 16px;
`;

const ResourceActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResourceUsedList = styled.div``;
const ResourceUsedItem = styled.a`
  display: inline-block;
  color: #0351ff;
  margin: 2px 0;
  cursor: pointer;
`;

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

// 层级路径
const levelPath = (
  handle: FileSystemDirectoryHandle | FileSystemFileHandle
) => {
  const { name, kind, values } = handle;
  return {
    name,
    kind,
    children: values ? [] : undefined,
    handle,
  };
};

// 获取单层文件目录
const readChildLevelPaths = async (
  directoryHandle: FileSystemDirectoryHandle
) => {
  if (!directoryHandle.values) {
    return [];
  }
  const handles = [];
  for await (const handle of directoryHandle.values()) {
    handles.push(levelPath(handle));
  }
  return handles;
};

// 查找树形结构制定文件目录
const findTreePath = (trees, pathId) => {
  for (let i = 0, j = trees.length; i < j; i++) {
    if (trees[i].id === pathId) return trees[i];

    if (trees[i].children) {
      const path = findTreePath(trees[i].children, pathId);
      if (path) return path;
    }
  }
};

// 读取文件文本内容
const readFileText = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject("读取失败！");
    };
  });
};

const ResourcePanel: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [usedResources, setUsedResources] = useState([]);
  const [start, setStart] = useState(true);
  const { moduleDispatch } = useStoreModule();
  const {
    collpased,
    selectedResource,
    opendResources,
    resources,
    resourceDispatch,
  } = useStoreResource();

  const { rand: resourceRand } = useRandPrimaryKey({
    type: "path",
  });

  const { rand: moduleRand } = useRandPrimaryKey({
    type: "module",
  });

  const { parse: markdownModuleParse } = useMarkdownModuleParse({
    maxLevel: 2,
  });

  const { parse: markdownTitleParse } = useMarkdownTitleParse({ maxLevel: 2 });

  const selectedCurrentResource = useMemo(
    () => findTreePath(resources, selectedResource),
    [resources, selectedResource]
  );

  const rootDirectory = useMemo(() => {
    const { id, name } = resources[0] || {};
    return !!id && { id, name };
  }, [resources]);

  useEffect(() => {
    if (selectedCurrentResource) {
      const readFile = async (callback: (text: string) => void) => {
        const file = await selectedCurrentResource.handle.getFile();

        const fileText = (await readFileText(file)) as string;

        typeof callback === "function" && callback(fileText);
      };

      readFile((text) => {
        const modules = markdownModuleParse(text as string);

        moduleDispatch({
          type: "SET_MODULES",
          payload: modules.map((item) => {
            item = item || "";
            const label = markdownTitleParse(item);
            return {
              id: moduleRand(0),
              label: label || "未命名",
              content: item,
            };
          }),
        });
      });
    }
  }, [selectedCurrentResource, moduleDispatch]);

  useEffect(() => {
    setUsedResources([
      {
        name: "tencent",
        handle: null,
      },
      {
        name: "wechat",
        handle: null,
      },
      {
        name: "qqmusic",
        handle: null,
      },
    ]);
  }, []);

  const openDirectory = async () => {
    const handler = await showDirectoryPicker();

    const paths = [
      {
        id: resourceRand(0),
        ...levelPath(handler),
        children: await (
          await readChildLevelPaths(handler)
        ).map((item, index) => ({
          ...item,
          id: resourceRand(index),
        })),
      },
    ];
    resourceDispatch({
      type: "SET_RESOURCES",
      payload: paths,
    });

    setStart(false);
  };

  const handleExpandChange = async (keys, key) => {
    const path = findTreePath(resources, key);

    if (!path.children.length) {
      const childPaths = await (
        await readChildLevelPaths(path.handle)
      ).map((item, index) => ({
        ...item,
        id: resourceRand(index),
      }));

      path.children = childPaths;
    }

    resourceDispatch({
      type: "SET_RESOURCES",
      payload: resources,
    });

    resourceDispatch({
      type: "SET_OPEND_RESOURCES",
      payload: keys,
    });
  };

  return (
    <ResourcePanelRoot>
      {!collpased ? (
        <>
          {!start && (
            <ResourcePanelHeader>
              <ResourceSearch
                keyword={keyword}
                onChange={setKeyword}
                placeholder="搜索"
              />
              <ResourceHeader
                back
                title={`目录：${rootDirectory.name}`}
                extra={[
                  <ActionBtn
                    color="#8e98a3"
                    icon={<AiOutlineSwitcher size={18} color="#8e98a3" />}
                    spaceSize={6}
                    hover
                    hoverBackgroundColor="rgba(33, 45, 63, .6)"
                    onClick={() =>
                      resourceDispatch({
                        type: "SET_OPEND_RESOURCES",
                        payload: [],
                      })
                    }
                  />,
                ]}
                onBack={() => {
                  setStart(true);
                }}
              />
            </ResourcePanelHeader>
          )}
          <ResourcePanelMain>
            <ResourceScrollOuter>
              {!start ? (
                <Path
                  items={resources}
                  selectedKey={selectedResource}
                  disabled={(item) =>
                    !item.children && item.name.split(".").pop() !== "md"
                  }
                  openKeys={opendResources}
                  onExpand={handleExpandChange}
                  onSelect={(key) => {
                    resourceDispatch({
                      type: "SET_SELECTED_RESOURCE",
                      payload: key,
                    });
                  }}
                />
              ) : (
                <ResourceNullPlaceholder
                  color="#8e98a3"
                  items={[
                    {
                      title: "打开文件夹",
                      desc: "可通过以下操作：",
                      children: (
                        <ResourceActionList>
                          {rootDirectory && (
                            <ActionBtn
                              title={"打开最近：" + rootDirectory.name}
                              size={14}
                              backgroundColor="#0351ff"
                              color="#ffffff"
                              spaceSize={6}
                              block
                              onClick={() => setStart(false)}
                            />
                          )}

                          <ActionBtn
                            title="打开文件夹"
                            size={14}
                            backgroundColor="#0351ff"
                            color="#ffffff"
                            spaceSize={6}
                            block
                            onClick={openDirectory}
                          />
                        </ResourceActionList>
                      ),
                    },
                    {
                      title: "最近打开的资源列表",
                      children: (
                        <ResourceUsedList>
                          {usedResources.map((item) => (
                            <>
                              <ResourceUsedItem>{item.name}</ResourceUsedItem>
                              <br />
                            </>
                          ))}
                        </ResourceUsedList>
                      ),
                    },
                  ]}
                ></ResourceNullPlaceholder>
              )}
            </ResourceScrollOuter>
          </ResourcePanelMain>
        </>
      ) : (
        <ResourcePanelMain>
          <ResourceCollpasedPlaceholder
            color="#8e98a3"
            icon={<AiTwotoneFolder color="#8e98a3" size={22} />}
            size={15}
            title="资源管理器"
          />
        </ResourcePanelMain>
      )}

      <ResourcePanelFooter>
        <ActionBtn
          icon={
            collpased ? (
              <AiOutlineMenuUnfold color="#8e98a3" size={18} />
            ) : (
              <AiOutlineMenuFold color="#8e98a3" size={18} />
            )
          }
          hover
          spaceSize={6}
          hoverBackgroundColor="rgba(33, 45, 63, .6)"
          onClick={() =>
            resourceDispatch({
              type: "SET_RESOURCE_COLLPASED",
              payload: !collpased,
            })
          }
        />
      </ResourcePanelFooter>
    </ResourcePanelRoot>
  );
};

export default ResourcePanel;
