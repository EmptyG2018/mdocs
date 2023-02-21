import { createContext, useContext, useReducer } from "react";

export const ModuleConext = createContext(null);

export const StoreModule = () => {
  const [module, moduleDispatch] = useReducer(moduleReducer, initialModule);

  return { module, moduleDispatch };
};

export const useModule = () => {
  return useContext(ModuleConext);
};

const initialModule = {
  moduleKey: "1",
  modules: [
    {
      id: "1",
      label: "Title and Description",
      content: `# Project Title

A brief description of what this project does and who it's for`,
    },
    {
      id: "2",
      label: "Title and Description",
      content: `# Project Title

A brief description of what this project does and who it's for`,
    },
  ],
};

const moduleReducer = (module, action) => {
  switch (action.type) {
    case "changeModule": {
      return {
        ...module,
        modules: action.modules,
      };
    }
    case "changeModuleKey": {
      return {
        ...module,
        moduleKey: action.moduleKey,
      };
    }
    case "changeModuleContent": {
      return {
        ...module,
        modules: module.modules.map((item) => {
          if (item.id === action.moduleKey) {
            return {
              ...item,
              content: action.doc,
            };
          }
          return item;
        }),
      };
    }
  }
};
