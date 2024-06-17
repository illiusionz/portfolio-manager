// src/components/ButtonGroup.js
import React from 'react';

const ButtonGroup = ({ onCalculate, onReset }) => (
  <div className='button-group'>
    <button type='button' className='btn btn-primary' onClick={onCalculate}>
      Calculate
    </button>
    <button type='button' className='btn btn-danger' onClick={onReset}>
      Reset
    </button>
  </div>
);

export default ButtonGroup;
