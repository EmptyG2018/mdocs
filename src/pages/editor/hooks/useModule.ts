import { useState, useMemo } from "react";

const constData = [
  {
    id: "1",
    label: "标题和描述",
    content: "",
  },
  {
    id: "2",
    label: "快捷入口",
    content: "",
  },
  {
    id: "3",
    label: "附录",
    content: "",
  },
  {
    id: "4",
    label: "技术栈",
    content: "",
  },
];

const useModule = () => {
  const [moduleKey, changeModuleKey] = useState("3");
  const [modules, changeModule] = useState(constData);

  const currentModule = useMemo(() => {
    return modules.find((item) => item.id === moduleKey);
  }, [moduleKey, modules]);

  const changeModuleContent = (id: string, doc: string) => {
    changeModule(
      modules.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            content: doc,
          };
        }
        return item;
      })
    );
  };

  return {
    modules,
    moduleKey,
    currentModule,
    changeModule,
    changeModuleKey,
    changeModuleContent,
  };
};

export default useModule;
