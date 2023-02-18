import React from "react";
import { createGlobalStyle } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Editor from "./pages/editor";
import Demo from "./pages/demo";

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Editor />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
]);

const App: React.FC = () => {
  return (
    <div className="App">
      <GloablStyle />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
