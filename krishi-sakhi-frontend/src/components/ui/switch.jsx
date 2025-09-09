
import React from 'react';
export default function Switch({ checked, onChange }){
  return (
    <button onClick={()=>onChange && onChange(!checked)} className={`w-12 h-7 rounded-full relative transition ${checked?'bg-leaf-600':'bg-leaf-200'}`}>
      <span className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition ${checked?'translate-x-5':''}`}></span>
    </button>
  );
}
