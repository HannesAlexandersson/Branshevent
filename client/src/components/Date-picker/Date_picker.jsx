import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { forwardRef } from 'react';
import styles from './date_picker.module.css';


function StartDate_picker({ onSelectStartDate, ...props}) {
    const [date, setStartDate] = useState(new Date());

    const handleStartDateChange = date => {
        setStartDate(date);
        onSelectStartDate(date);
    };

     
    const Red_button = forwardRef(({ value, onClick }, ref) => (
        <button className={styles.red_button} onClick={onClick} ref={ref}>
          {props.children}
        </button>
      ));
    return (
      <DatePicker       
        selected={date}
        dateFormat="MM/dd/yyyy"
        onChange={handleStartDateChange}
            
        popperClassName="some-custom-class"
        popperPlacement="top-start"    
        customInput={<Red_button />}
      />
    );
}

export default StartDate_picker