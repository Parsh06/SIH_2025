
import React from 'react';
export default function Alert({ variant='info', children }){
  const map = {
    info: 'bg-leaf-50 border-leaf-200 text-leaf-800',
    warn: 'bg-yellow-50 border-yellow-200 text-yellow-900',
    error: 'bg-red-50 border-red-200 text-red-900'
  };
  return <div className={`rounded-2xl border p-4 ${map[variant]||map.info}`}>{children}</div>;
}
