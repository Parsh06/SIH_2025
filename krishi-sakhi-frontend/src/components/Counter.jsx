import React, { useEffect, useState } from 'react';

export default function Counter({ to=100, duration=900 }){
  const [v,setV] = useState(0);
  useEffect(()=>{
    let start = performance.now();
    let raf;
    const tick = (now)=>{
      const t = Math.min(1, (now - start)/duration);
      setV(Math.round(to * (t*(2 - t)))); // ease-out
      if(t<1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{v}</span>;
}
