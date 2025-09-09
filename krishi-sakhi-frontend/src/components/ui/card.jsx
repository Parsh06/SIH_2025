import React from 'react';
export function Card({ className='', children, ...props }) {
  return <div className={`card ${className}`} { ...props }>{children}</div>;
}
export function CardHeader({ children }) { return <div className="px-5 pt-5">{children}</div>; }
export function CardTitle({ children }) { return <h3 className="text-lg font-semibold">{children}</h3>; }
export function CardDescription({ children }) { return <p className="text-sm text-soil-700 mt-1">{children}</p>; }
export function CardContent({ children }) { return <div className="p-5">{children}</div>; }
export default Card;
