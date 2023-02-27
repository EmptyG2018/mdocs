import React, { useEffect, useRef } from 'react';

function Example() {
  const countRef = useRef(0); // 使用 useRef 存储 count 值

  useEffect(() => {
    console.log('useEffect count: ', countRef.current);
  }, [countRef]); // 将 countRef 作为 useEffect 的依赖项

  function handleClick() {
    countRef.current++; // 在 handleClick 中更新 countRef 的值
  }

  return (
    <div>
      <p>You clicked {countRef.current} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}

export default Example;