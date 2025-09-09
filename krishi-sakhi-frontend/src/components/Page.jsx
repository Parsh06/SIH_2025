
import React from 'react';
export default function Page({ title, subtitle, children }){
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-soil-700">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
