import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import Nav from '../../views/Navigation/Navigation.jsx';
import Progressbar from '../../components/Progress-bar/Progressbar.jsx';
import Form from '../../components/Company-form/Company_signup_form.jsx';
import Gdpr from '../../components/GDPR/Gdpr.jsx';
import styles from './company_sign_up.module.css';

function Company_sign_up(){
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 4;
    

    const handleSubmit = (event) => {
        event.preventDefault(); // stop default form submission so we can handle it ourselfs
       

        if (currentStep < totalSteps) {//add 1 to the progressbar prop
            setCurrentStep(currentStep + 1); 
        }
        // enter the path to the next page here when its finished
        navigate('/');
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
            <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                <Form id="companySignupForm" handleSubmit={handleSubmit}/>                

                
                    <Gdpr
                     isChecked={isChecked}
                     handleCheckboxChange={handleCheckboxChange}
                    />                

                <div className={styles.footer_btn_wrapper}>
                    <Link to="/sign-in">
                        <button className={`${styles.back_btn} ${styles.btn}`}>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </button>
                    </Link>

                    
                    <button 
                        className={`${styles.next_btn} ${styles.btn}`}                       
                        onClick={() => {
                            console.log('click');
                            if (!isChecked) {
                                alert("You must read and agree to the GDPR before continuing."); // if the user havent agreed to gdpr we show an alert
                            } else {
                                handleSubmit(); // else we can go ahead and handle the form submission
                            }
                        }}
                    >                        
                        <p>NEXT STEP</p>
                        <img src={nextArrow} />
                    </button>
                    
                </div>
            </div>
        </>
    );
}


export default Company_sign_up