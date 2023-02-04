import styled from "styled-components";
import Editor from "react-run-code";

const DemoRoot = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Demo = () => {
  return (
    <DemoRoot>
      <Editor
        id="10"
        
        modelsInfo={[
          {
            value: 'console.log("make a new file")',
            filename: "new.ts",
            language: "typescript",
          },
        ]}
      />
    </DemoRoot>
  );
};

export default Demo;
