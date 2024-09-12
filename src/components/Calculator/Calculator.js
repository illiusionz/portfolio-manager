import React, { useState } from 'react';
import './Calculator.scss';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleAllClear = () => {
    setInput('');
    setResult('');
  };

  const handleSignChange = () => {
    setInput((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
  };

  const handlePercentage = () => {
    try {
      setInput((prev) => (parseFloat(prev) / 100).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(input); // Note: Using eval has security risks, consider safer alternatives
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className='calculator'>
      <div className='calculator-display'>
        <div className='calculator-input'>{input}</div>
        <div className='calculator-result'>{result}</div>
      </div>
      <div className='calculator-buttons'>
        <button className='calculator-action' onClick={handleAllClear}>
          AC
        </button>
        <button className='calculator-action' onClick={handleSignChange}>
          +/-
        </button>
        <button className='calculator-action' onClick={handlePercentage}>
          %
        </button>
        <button className='calculator-action' onClick={() => handleClick('/')}>
          ÷
        </button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button className='calculator-action' onClick={() => handleClick('*')}>
          ×
        </button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button className='calculator-action' onClick={() => handleClick('-')}>
          -
        </button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button className='calculator-action' onClick={() => handleClick('+')}>
          +
        </button>
        <button className='zero' onClick={() => handleClick('0')}>
          0
        </button>
        <button onClick={() => handleClick('.')}>.</button>
        <button className='calculator-action' onClick={handleCalculate}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
