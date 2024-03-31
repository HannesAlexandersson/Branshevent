import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import { Progressbar, Student_form, Gdpr, White_btn, Red_btn,  } from '../../components';
import { Nav, } from '../index.js';
import styles from './student_signup.module.css';

function Student_signup_firststage(){
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 4;

    const handleSubmit = (event) => {
        event.preventDefault(); // stop default form submission so we can handle it ourselfs, Here we need to add formhandling, like validation and zanitation of the form data adn then send to db       

        if (currentStep < totalSteps) {//add 1 to the progressbar prop
            setCurrentStep(currentStep + 1); 
        }
        
        navigate('/student-description');
    };
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);        
    };

    const isNextButtonDisabled = !isChecked;
    console.log(isNextButtonDisabled);

    return(
        <>
            <Nav />
            <div className={styles.main}>
                <Progressbar currentStep={currentStep} totalSteps={totalSteps}/>
            

                <Student_form id="studentSignupForm" handleSubmit={handleSubmit}/> 

                <Gdpr
                     isChecked={isChecked}
                     handleCheckboxChange={handleCheckboxChange}
                    />        

                <div className={styles.footer_btn_wrapper}>
                    <Link to="/sign-in">
                        <White_btn>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </White_btn>
                    </Link>

                    
                    <Red_btn                                                
                        onClick={(e) => {
                            console.log('click');
                            if (!isChecked) {
                                alert("You must read and agree to the GDPR before continuing."); // if the user havent agreed to gdpr we show an alert
                            } else {
                                handleSubmit(e); // else we can go ahead and handle the form submission
                            }
                        }}
                    >                        
                        <p>NEXT STEP</p>
                        <img src={nextArrow} />
                    </Red_btn>
                    
                </div>
            </div>
        </>
    );
}

export default Student_signup_firststage