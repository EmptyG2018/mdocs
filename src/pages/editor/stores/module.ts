import templates from "../../templates";
import { createContext, useReducer, useContext } from "react";

export const ModuleContext = createContext(null);

export const StoreModule = () => {
  const [module, moduleDispatch] = useReducer(moduleReducer, initialModule);

  return { module, moduleDispatch };
};

export const useStoreModule = () => useContext(ModuleContext);

const initialModule = {
  selectedModule: null,
  modules: [],
  templateModules: templates,
};

const moduleReducer = (state, action) => {
  switch (action.type) {
    /**
     * @title 设置模块列表
     * @param {array} payload 模块列表
     */
    case "SET_MODULES": {
      return {
        ...state,
        modules: action.payload,
      };
    }

    /**
     * @title 设置模版模块列表
     * @param {array} payload 模版模块列表
     */
    case "SET_TEMPLATE_MODULES": {
      return {
        ...state,
        templateModules: action.payload,
      };
    }

    /**
     * @title 设置选中模块状态
     * @param {object} payload 所选中的模块
     */
    case "SET_SELECTED_MODULE": {
      return {
        ...state,
        selectedModule: action.payload,
      };
    }

    /**
     * @title 设置模版内容
     * @param {string | number} moduleId 指定模块主键
     * @param {string} content 模块内容
     */
    case "SET_MODULE_CONTENT": {
      const { moduleId, content } = action.payload;
      return {
        ...state,
        modules: state.modules.map((item) => {
          if (item.id === moduleId) {
            return { ...item, content };
          }
          return item;
        }),
      };
    }
    default:
      throw new Error();
  }
};
