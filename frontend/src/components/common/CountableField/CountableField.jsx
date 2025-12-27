import React, { useState } from 'react';
import style from './CountableField.module.css';

const CountableField = ({ label, initialValue = 1, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value) || 1;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={style.container}>
            <label className={style.label}>{label}</label>
            <input 
                type="number" 
                value={value} 
                onChange={handleChange} 
                className={style.input}
                min="1"
            />
        </div>
    );
};

export default CountableField;
