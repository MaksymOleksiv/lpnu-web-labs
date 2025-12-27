import React from 'react';
import style from './SelectableField.module.css';

const SelectableField = ({ label, options = [] }) => {
    return (
        <div className={style.container}>
            <label className={style.label}>{label}</label>
            <select className={style.select}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectableField;
