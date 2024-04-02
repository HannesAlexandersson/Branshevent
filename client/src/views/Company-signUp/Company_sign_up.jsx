import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import Nav from '../../views/Navigation/Navigation.jsx';
import Progressbar from '../../components/Progress-bar/Progressbar.jsx';
import Form from '../../components/Company-form/Company_signup_form.jsx';
import Gdpr from '../../components/GDPR/Gdpr.jsx';
import styles from './company_sign_up.module.css';
import Red_btn from '../../components/Red-btn/Red_btn.jsx';
import White_btn from '../../components/White-btn/White_btn.jsx';

function Company_sign_up(){
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


export default Company_sign_up