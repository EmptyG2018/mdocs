import { useState } from "react";

const constData = [
  {
    id: "1",
    label: "Title and Description",
    content: `# Project Title

A brief description of what this project does and who it's for`,
  },
];

const useModule = () => {
  const [moduleKey, changeModuleKey] = useState("1");
  const [modules, changeModule] = useState(constData);

  const currentModule = modules.find((item) => item.id === moduleKey);

  const changeModuleContent = (id: string, doc: string) => {
    console.log(
      "modeulse",
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
