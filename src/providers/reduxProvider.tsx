import React from "react";
import { Provider } from "react-redux";
import stores from "../stores";

type ReduxProviderProps = {
  children?: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={stores}>{children}</Provider>;
};

export default ReduxProvider;
