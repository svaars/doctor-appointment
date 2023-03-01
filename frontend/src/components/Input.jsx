import React, { useState } from 'react';

function Input(props) {
  const [value, setValue] = useState(props.value || '');

  const handleChange = (event) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  }

  return (
    <input
      type={props.type || 'text'}
      value={value}
      onChange={handleChange}
      placeholder={props.placeholder || ''}
    />
  );
}

export default Input;
