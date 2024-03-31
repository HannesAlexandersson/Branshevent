import { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Progressbar,Red_btn, White_btn, Skip_btn, TagsSelector, } from '../../components/index.js';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import Nav from '../Navigation/Navigation';
import style from './student_third.module.css';

function Student_third_stage(){
    // we keep track of the checkboxes with this useState hook
    const [selectedLocation, setSelectedLocation] = useState('');
    //we keep track of the progrssbar with this hook
    const [currentStep, setCurrentStep] = useState(4);
    const totalSteps = 4;

    //progressbar
    if (currentStep < totalSteps) {//add 1 to the progressbar prop
        setCurrentStep(currentStep + 1); 
    }
    //checkboxes
    const handleCheckboxChange = (event) => {
        setSelectedLocation(event.target.value);
    };


    return(
        <>
            <Nav />
            <div className={style.main}>

                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />    

                <div className={style.content_container}>               

                    
                    <TagsSelector who="I" className={style.tag_selector}/>

                    <div className={style.location_container}>
                        <p>I work...</p>
                        <div className={style.checkBox_wrapper}>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="office" 
                                checked={selectedLocation === 'office'}
                                onChange={handleCheckboxChange}/>
                                In office
                            </label>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="remote" 
                                checked={selectedLocation === 'remote'}
                                onChange={handleCheckboxChange}/>
                                Remote
                            </label>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="both" 
                                checked={selectedLocation === 'both'}
                                onChange={handleCheckboxChange}/>
                                Both
                            </label>
                        </div>
                    </div>

                    <div className={style.btn_container}>
                    <div className={style.skip_wrapper}>
                        <Skip_btn />
                    </div>

                    <div className={style.footer_btn_wrapper}>
                        <Link to="/student-description">
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
            </div>
        </>
    );
}

export default Student_third_stage