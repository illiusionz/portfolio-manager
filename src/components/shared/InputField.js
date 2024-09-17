// src/components/InputField.js
import React from 'react';

const InputField = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => (
  <div className='form-group'>
    <label className='form-label' htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      className='form-control'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
