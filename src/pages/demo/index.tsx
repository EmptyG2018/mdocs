import React, { useEffect, useState } from 'react';

function Example() {
  const [state, setState] = useState(Math.random());


  useEffect(() => {
    console.log('mounted !');

    return () => {
      console.log('destoryed !');
    }
  }, []);

  useEffect(() => {
    console.log(state);
    console.time('state');
    return () => {
      console.timeEnd('state');
    }
  }, [state]);

  return (
    <div>
      <p>you is {state}.</p>
      <button onClick={() => setState(Math.random())}>Click me</button>
    </div>
  );
}

export default Example;