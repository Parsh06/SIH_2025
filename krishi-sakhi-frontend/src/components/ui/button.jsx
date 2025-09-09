
import React from 'react';
import { clsx } from 'clsx';

export function Button({ as:Comp='button', variant='primary', className, ...props }) {
  return <Comp className={clsx('btn', variant === 'primary' ? 'btn-primary' : 'btn-outline', className)} {...props} />;
}
export default Button;
