import { useState } from 'react';

function Button() {
  const [counter, setCounter] = useState(0);

  function incrementCounter() {
    setCounter(counter + 1);
    console.log(counter);
  }

  return (
    <button type="button" onClick={ incrementCounter }>
      { counter }
    </button>
  )
}

export default Button;
