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

  const checkSelected = useMemo(() => {
    return modules.some((item) => item.id === moduleKey);
  }, [moduleKey, modules]);

  return { modules, moduleKey, checkSelected, changeModule, changeModuleKey };
};

export default useModule;
