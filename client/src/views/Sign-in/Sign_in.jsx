import React, { useState } from 'react';
import { backArrow } from '../../assets/Icons/index.js';
import { Link } from 'react-router-dom';
import Nav from '../Navigation/Navigation.jsx';
import Progressbar from '../../components/Progress-bar/Progressbar.jsx';
import styles from './sign_in.module.css';
import { Spacer_bottom } from '../../components/index.js';


function Sign_in(){
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 7;

  

    const handleNextStep = (role) => {
        sessionStorage.setItem('userRole', role);// save the role the user chooses in a sessionvariable 'role'

        if (currentStep < totalSteps) {
            console.log(`signin expected 1: ${currentStep}`);
            setCurrentStep(currentStep + 1); 
        }
    };

    return(
        <>            
            <div className={styles.main}>

            <Nav/>
                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                <div className={styles.content_wrapper}>
                    <div className={styles.content_text}>
                        <h1>Who are you?</h1>
                        <p>I am a…</p>
                    </div>
                    <div className={styles.content_btn_wrapper}>
                        <Link onClick={() => handleNextStep('student')} className={styles.content_btn} to="/student-signup">STUDENT</Link>
                        <Link onClick={() => handleNextStep('company')} className={styles.content_btn} to="/company-signup">COMPANY</Link>
                    </div>
                </div>

                <Spacer_bottom />

                <div className={styles.footer_btn_wrapper}>
                    <Link to="/">
                        <button className={styles.back_btn}>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </button>
                    </Link>
                </div>
                <Spacer_bottom />
            </div>
        </>
    );
}

export default Sign_in