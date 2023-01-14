import React, { useState } from "react";
import { createGlobalStyle } from "styled-components";
import Editor from "./pages/editor";

const GloablStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  line-height: 1.5;
}
body {
  /* background-color: #202734; */
}
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <GloablStyle />
      <Editor />
    </div>
  );
};

export default App;
