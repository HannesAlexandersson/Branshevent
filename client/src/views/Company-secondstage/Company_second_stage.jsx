import { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Red_btn, White_btn, Progressbar, Company_description, Skip_btn, } from '../../components/index.js';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import Nav from '../Navigation/Navigation.jsx';
import styles from './company_second_stage.module.css';


function Company_second_stage(){
    const [currentStep, setCurrentStep] = useState(3);
    const totalSteps = 4;
    const [description, setDescription] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [startDate, setStartDate] = useState(null); 
    const [endDate, setEndDate] = useState(null);
    

    
    const handleNextStep = () => {
        // Perform validation
        if (description.trim() === '') {
            alert('Please provide a description for your company.');
            return;
        }

        // Sanitize the description
        const sanitizedDescription = description.trim();
        // Save description to session storage
        sessionStorage.setItem('companyDescription', sanitizedDescription);
        // Save start and end dates to session storage
        if (startDate && endDate) {
            sessionStorage.setItem('startDate', startDate.toISOString()); 
            sessionStorage.setItem('endDate', endDate.toISOString()); 
        } else {
            alert('Please select both start and end dates.');
            return;
        }

        // Save checkbox state to session storage
        if (isChecked) {
            sessionStorage.setItem('noInterns', 'true');
        }
       
        // add 1 to the progressbar        
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1); //increase the progress bar with 1
        }
    };

    // handlers for the different states on the page
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return(
        <>
            <Nav />
            <div className={styles.main}>
                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />                
                
                <Company_description 
                    description={description}
                    handleDescriptionChange={handleDescriptionChange}
                    isChecked={isChecked}
                    handleCheckboxChange={handleCheckboxChange}
                    startDate={startDate} 
                    endDate={endDate}                    
                />

                <div className={styles.btn_container}>
                    <div className={styles.skip_wrapper}>
                        <Skip_btn />
                    </div>

                    <div className={styles.footer_btn_wrapper}>
                        <Link to="/company-signup">
                                <White_btn>
                                    <img src={backArrow} />
                                    <p>BACK</p>
                                </White_btn>
                        </Link>

                        <Link to="/company-work">
                        <Red_btn onClick={handleNextStep} >                        
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

export default Company_second_stage