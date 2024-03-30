import { useState } from 'react';
import { pencil, calendarIcon, add, } from '../../assets/Icons/index.js';
import { White_btn, Red_btn } from '../index.js';
import style from './company_description.module.css';

function Company_description(){
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const placeholderText = "A short description about your company";
    

    return(
        <>
            <div className={style.header_wrapper}>
                <p className={style.header}>This is us:</p>               
                <textarea className={style.inputfield} placeholder={`${placeholderText} `}></textarea>
            </div>
            <div className={style.date_wrapper}>
                <img src={calendarIcon} className={style.date_icon} />
                <p className='date-text'>Application period:</p>
                <p className='date-return-text'>Date goes here</p>
            </div>

            <div className={style.date_btn_wrapper}>
                <Red_btn className={style.date_btn}>MM/DD/YYYY</Red_btn>
                <White_btn className={style.end_date_btn}>END DATE</White_btn>
            </div>

            <div className={style.checkboxWrapper}>

                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={style.checkboxInput}
                />
                <label htmlFor="checkbox" className={style.checkbox_text}>we are not looking for interns in the near future</label>
        
            </div>

            <div className='online-profile-wrapper'>
                <White_btn className={style.online_profile_btn}>
                    <img src={add} />
                    <p>add online profile</p>                    
                </White_btn>
            </div>

           

            
        </>
    );
}

export default Company_description