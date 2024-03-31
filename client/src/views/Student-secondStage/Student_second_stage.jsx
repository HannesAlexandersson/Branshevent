import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { calendarIcon, add, backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Progressbar, White_btn, Red_btn, Skip_btn,  } from '../../components';
import { Nav, } from '../index.js';
import style from './student_secondstage.module.css';

function Student_second_stage(){    
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 4;
    const placeholderText = "A short description about you";

    if (currentStep < totalSteps) {//add 1 to the progressbar prop
        setCurrentStep(currentStep + 1); 
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return(
        <>

            <Nav />

             <div className={style.main}>
                <Progressbar currentStep={currentStep} totalSteps={totalSteps}/>


                <div className={style.header_wrapper}>
                    <p className={style.header}>This is me:</p>               
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
                    <label htmlFor="checkbox" className={style.checkbox_text}>I don&apost know when my LIA-period is yet</label>
            
                </div>

                <div className='online-profile-wrapper'>
                    <White_btn className={style.online_profile_btn}>
                        <img src={add} />
                        <p>add online profile</p>                    
                    </White_btn>
                </div>


                <div className={style.btn_container}>
                    <div className={style.skip_wrapper}>
                        <Skip_btn />
                    </div>

                    <div className={style.footer_btn_wrapper}>
                        <Link to="/student-signup">
                                <White_btn>
                                    <img src={backArrow} />
                                    <p>BACK</p>
                                </White_btn>
                        </Link>
                        <Link to="#">
                            <Red_btn>                        
                                <p>NEXT STEP</p>
                                <img src={nextArrow} />
                            </Red_btn>
                        </Link>
                    </div>
                </div>


            </div>
        </>
    );
}

export default Student_second_stage