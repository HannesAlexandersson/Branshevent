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
    const [formData, setFormData] = useState({
        companyName: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    

    const handleSubmit = (event) => {
        event.preventDefault(); // stop default form submission so we can handle it ourselfs       

        // Retrieve sanitized and validated form data
        const { companyName, firstName, lastName, email, phoneNumber } = formData;


        if (currentStep < totalSteps) {//add 1 to the progressbar prop           
            setCurrentStep(currentStep + 1); 
        }
       
           
        // Save company data to session storage
        sessionStorage.setItem('companyData', JSON.stringify(formData));

        navigate('/company-description');//route the user to the next step
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);        
    };

    const isNextButtonDisabled = !isChecked;
    console.log(isNextButtonDisabled);
    
    const handleChange = (name, value) => {
        // Update form data state with sanitized input value
        setFormData(prevData => ({
            ...prevData,
            [name]: value.trim() 
        }));
    };

    return(
        <>
            <Nav />
            <div className={styles.main}>
            <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                <Form 
                    id="companySignupForm"                    
                    handleChange={handleChange}                     
                    />                

                
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