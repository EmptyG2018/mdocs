import { useState } from "react";
import styled from "styled-components";

const DemoRoot = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Demo = () => {
  const [modelIndex, setModelIndex] = useState(0);
  const [models, setModel] = useState([
    {
      id: 1,
      title: "第一次",
      content: "第一次",
    },
    {
      id: 2,
      title: "第二次",
      content: "第二次",
    },
    {
      id: 3,
      title: "第三次",
      content: "第三次",
    },
  ]);

  const current = models[modelIndex];

  const changeText = (e) => {
    setModel(
      models.map((item, index) => {
        if (index === modelIndex) {
          item.content = e.target.value;
        }
        return item;
      })
    );
  };

  const doc = models.map((item) => item.content).join("");

  return (
    <DemoRoot>
      <ul>
        {models.map((item, index) => (
          <li onClick={() => setModelIndex(index)}>{item.title}</li>
        ))}
      </ul>
      <textarea value={current.content} onChange={changeText}></textarea>
      <textarea disabled value={doc}></textarea>
    </DemoRoot>
  );
};

export default Demo;
