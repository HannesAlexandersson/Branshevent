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
        
        navigate('/company-description');
    };

    return(
        <>
            <Nav />
            <div className={styles.main}>
                <Progressbar />
            </div>

            <Student_form id="studentSignupForm" handleSubmit={handleSubmit}/> 

            <Gdpr />
        </>
    );
}

export default Student_signup_firststage