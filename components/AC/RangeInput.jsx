import React, { useState } from 'react';

function RangeInput(props) {
     const { label, min, max, value, onChange } = props;
     const [currentValue, setCurrentValue] = useState(value);

     const handleInputChange = (e) => {
          const newValue = e.target.value;
          setCurrentValue(newValue);
          if (onChange) {
               onChange(newValue);
          }
     };

     return (
          <div>
               <label>{label}</label>
               <input
                    type='range'
                    min={min}
                    max={max}
                    value={currentValue}
                    onChange={handleInputChange}
               />
               <span>{currentValue}</span>
          </div>
     );
}

export default RangeInput;
