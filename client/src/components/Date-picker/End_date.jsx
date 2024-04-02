import React, { useState } from 'react';
import Props from 'prop-types';
import DatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import style from './date_picker.module.css';

function EndDate_picker({ onSelectEndDate, ...props}) {
    const [endDate, setEndDate] = useState(new Date());

    const handleEndDateChange = endDate => {
        setEndDate(endDate);
        onSelectEndDate(endDate); // Pass selected end date to parent component
    };

        
    
    const White_button = forwardRef(({ value, onClick }, ref) => (
        <button className={style.white_button} onClick={onClick} ref={ref}>
          {props.children}
        </button>
      ));
    return (
      <DatePicker       
        selected={endDate}
        dateFormat="MM/dd/yyyy"
        onChange={handleEndDateChange}
        
        popperClassName="some-custom-class"
        popperPlacement="top-start"
        customInput={<White_button />}
      />
    );

}
export default EndDate_picker