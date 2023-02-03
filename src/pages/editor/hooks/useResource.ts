import { useState } from "react";

const constData = [
  {
    key: "sub1",
    label: "百度百科",
  },
];

const useResource = () => {
  const [keyword, changeKeyword] = useState("");

  const [resources, changeResource] = useState(constData);

  const [openResourceKeys, changeOpenResourceKey] = useState(["sub1"]);

  const [selectedResourceKeys, changeSelectedResourceKey] = useState([
    "file1",
    "file2",
  ]);

  return {
    keyword,
    resources,
    openResourceKeys,
    selectedResourceKeys,
    changeKeyword,
    changeResource,
    changeOpenResourceKey,
    changeSelectedResourceKey,
  };
};

export default useResource;
