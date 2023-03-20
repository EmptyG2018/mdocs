import React from "react";
import {
  createBrowserRouter,
  RouterProvider as BrowserRouterProvider,
} from "react-router-dom";
import { Main } from "../layouts";
import Demo from "../pages/demo";
import Editor from "../pages/editor";
import IndexedDB from "../pages/indexedDB";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Editor />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
      {
        path: "/indexedDB",
        element: <IndexedDB />,
      },
    ],
  },
]);

const LocaleProvider: React.FC = () => {
  return <BrowserRouterProvider router={routes} />;
};
export default LocaleProvider;
