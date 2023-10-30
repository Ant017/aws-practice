import React from 'react'
import './dropdown.scss'

function Dropdown({ title, labels, options, selectedOption, onChange }) {
    return (
        <div className='dropdown-container'>
            <label className='dropdown-label'>{title}</label>
            <select value={selectedOption} onChange={onChange} className='dropdown-select'>
                {options.map((option, index) => (
                    <option key={option.value} value={option.value} className='dropdown-option'>
                        {labels[index]}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown