
import React from 'react';
export default function Label({ children, className='' }) { 
    return <label className={`label ${className}`}>{children}</label> 
}
