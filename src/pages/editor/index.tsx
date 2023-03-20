import { Split } from "../../components";
import {
  ModuleContext,
  ResourceContext,
  StoreModule,
  StoreResource,
  useStoreResource,
} from "./stores";
import React from "react";
import styled from "styled-components";
import EditorPanel from "./components/EditorPanel";
import ModulePanel from "./components/ModulePanel";
import PreviewPanel from "./components/PreviewPanel";
import ResourcePanel from "./components/ResourcePanel";

type ConfigProviderProps = {
  children?: React.ReactNode;
};
const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const { resource, resourceDispatch } = StoreResource();
  const { module, moduleDispatch } = StoreModule();
  return (
    <ResourceContext.Provider value={{ ...resource, resourceDispatch }}>
      <ModuleContext.Provider value={{ ...module, moduleDispatch }}>
        {children}
      </ModuleContext.Provider>
    </ResourceContext.Provider>
  );
};

/**
 * @title 编辑
 */
const ApplicationRoot = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
`;

const Aside = styled.div<{ width: number }>`
  flex-basis: ${({ width }) => (width ? width + "px" : null)};
  height: 100%;
`;

const Container = styled.div`
  flex: 1 0 0;
  width: 0;
  height: 100%;
`;

const Application: React.FC = () => {
  const { collpased } = useStoreResource();
  return (
    <ApplicationRoot>
      <Aside width={collpased ? 64 : 280}>
        <ResourcePanel />
      </Aside>
      <Aside width={320}>
        <ModulePanel />
      </Aside>
      <Container>
        <Split
          direction="horizontal"
          layout="flex"
          minSize={400}
          color="#1d2532"
          hoverColor="#0351ff"
          activeColor="#0351ff"
          gutterSize={3}
        >
          <EditorPanel />
          <PreviewPanel />
        </Split>
      </Container>
    </ApplicationRoot>
  );
};

const Editor: React.FC = () => {
  return (
    <ConfigProvider>
      <Application />
    </ConfigProvider>
  );
};

export default Editor;
