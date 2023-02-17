import { useRef, useEffect, useState } from "react";

const Child = ({ onChange }) => {
  const mounted = useRef(false);

  useEffect(() => {
    console.log("render 2.");
    if (!mounted.current) {
      console.log("还没");
      onChange();
    }
  }, []);
  useEffect(() => {
    mounted.current = true;
    console.log("render 1.");
  }, []);

  return <input type='' />;
};

const Demo = () => {
  const [num, setNum] = useState(1);
  const change = () => {
    console.log(num);
  };
  return (
    <>
      {num}
      <button onClick={() => setNum(Math.random())}>rand</button>
      <Child onChange={change} />
    </>
  );
};

export default Demo;
