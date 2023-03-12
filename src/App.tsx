import React from "react";
import { RouterProvider, ReduxProvider, LocaleProvider } from "./providers";
import GlobalStyle from "./globalStyle";

type ConfigProviderProps = {
  children?: React.ReactNode;
};

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <LocaleProvider>
        <RouterProvider />
        {children}
      </LocaleProvider>
    </ReduxProvider>
  );
};

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <div className="App">
        <GlobalStyle />
      </div>
    </ConfigProvider>
  );
};

export default App;
