import React, { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';

// Do not change this
const LARGE_NUMBER = 1000000000;

function App() {
  const [value, setValue] = useState(0);
  const [dark, setTheme] = useState(true);
  const [themeName, setThemeName] = useState('dark');
  const [currentList, setList] = useState([]);
  const [delayResult, setDelayResult] = useState(null);
  const delayFunctionRef = useRef();

  // should not change the LOGIC inside this function - you can make changes to the function but logic should NOT change
  const delayFunction = useCallback(() => {
    console.log('Delay Function Ran');
    for (let index = 0; index < LARGE_NUMBER; index++) {}
    return value + 2;
  }, [value]);

  // Assign the delayFunction to delayFunctionRef.current
  useEffect(() => {
    delayFunctionRef.current = delayFunction;
  }, [delayFunction]);

  // Update themeName based on dark state
  useEffect(() => {
    if (dark) {
      setThemeName('dark');
    } else {
      setThemeName('light');
    }
  }, [dark]);

  // Log the callback function when value and delayFunctionRef change
  useEffect(() => {
    if (delayFunctionRef.current && value !== 0) {
      console.log('Callback Function was called');
    }
  }, [value, delayFunctionRef]);

  // Toggle dark theme
  const handleClick = () => {
    setTheme(!dark);
  };

  // Change the value and update the delay result
  const handleChangeValue = () => {
    setDelayResult(delayFunctionRef.current());
    setValue(value + 1);
  };

  // Update the list using the testFunction
  const handleList = () => {
    setList(testFunction());
  };

  // should not change the LOGIC inside this function - you can make changes to the function but logic should NOT change
  const testFunction = useCallback(() => {
    return [value * 3, value * 4];
  }, [value]);

  const styleTheme = {
    backgroundColor: dark ? 'black' : '#ccc7c7',
  };

  return (
    <div className="page" style={styleTheme}>
      <button onClick={handleClick}>{themeName}</button>
      <h1>{value}</h1>
      <button onClick={handleChangeValue}>Change Value</button>
      <button onClick={handleList}>Show List</button>
      <h2>{delayResult}</h2>
      <div>
        {currentList.map((item, index) => {
          return <h2 key={index}>{item}</h2>;
        })}
      </div>
    </div>
  );
}

export default App;
