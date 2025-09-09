import React from 'react';

export default function Radial({ value=68, size=90, stroke=10, color='#16a34a' }){
  const r = (size - stroke)/2;
  const c = 2 * Math.PI * r;
  const dash = (value/100) * c;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e5f5eb" strokeWidth={stroke} fill="none"/>
      <circle
        cx={size/2} cy={size/2} r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${dash} ${c-dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="font-semibold fill-current" style={{fill:color}}>
        {value}%
      </text>
    </svg>
  )
}
