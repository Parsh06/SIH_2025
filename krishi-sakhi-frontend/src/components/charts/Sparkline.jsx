import React from 'react';

export default function Sparkline({ data=[10,20,15,25,18,30], width=220, height=60, stroke='#16a34a' }){
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data.map((d,i)=>{
    const x = (i/(data.length-1)) * (width-8) + 4;
    const y = height - ((d-min)/(max-min||1)) * (height-12) - 6;
    return `${x},${y}`
  }).join(' ');
  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((d,i)=>{
        const x = (i/(data.length-1)) * (width-8) + 4;
        const y = height - ((d-min)/(max-min||1)) * (height-12) - 6;
        return <circle key={i} cx={x} cy={y} r="2.5" fill={stroke} />
      })}
    </svg>
  )
}
