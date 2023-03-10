import { createContext, useReducer, useContext } from "react";

export const ResourceContext = createContext(null);

export const StoreResource = () => {
  const [resource, resourceDispatch] = useReducer(
    resourceReducer,
    initialResource
  );

  return { resource, resourceDispatch };
};

export const useStoreResource = () => useContext(ResourceContext);

const initialResource = {
  selectedResource: null,
  opendResources: [],
  resources: [],
  collpased: false,
};

const resourceReducer = (state, action) => {
  switch (action.type) {
    /**
     * @title 设置资源列表
     * @param {array} payload 资源列表
     */
    case "SET_RESOURCES": {
      return {
        ...state,
        resources: action.payload,
      };
    }

    /**
     * @title 设置选中资源状态
     * @param {object} payload 所选中的资源
     */
    case "SET_SELECTED_RESOURCE": {
      return {
        ...state,
        selectedResource: action.payload,
      };
    }

    /**
     * @title 设置打开资源状态列表
     * @param {array} payload 所打开的资源列表
     */
    case "SET_OPEND_RESOURCES": {
      return {
        ...state,
        opendResources: action.payload,
      };
    }

    /**
     * @title 设置资源管理器展开状态
     * @param {boolean} payload 展开状态
     */
    case "SET_RESOURCE_COLLPASED": {
      return {
        ...state,
        collpased: action.payload,
      };
    }
  }
};
