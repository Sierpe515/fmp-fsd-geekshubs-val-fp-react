import React from 'react';
import './ButtonSubmit.css';

export const ButtonSubmit = ({className, name, onClick}) => {
     return (
         <>
            <div
                className={className} 
                onClick={onClick}
                name={name}          
            >
            {name}</div>
         </>
     )
}