import React from 'react';

function Button({ size = 'small', children, ...props }) {
  const classNames = ['button', size].join(' ');
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
