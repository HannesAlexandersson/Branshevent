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
    const navigate = useNavigate();
   
    
    const formatDate = (date) => {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    
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
            console.log(startDate);
            const formattedStartDate = formatDate(startDate);
            console.log(formattedStartDate);
            const formattedEndDate = formatDate(endDate);
            sessionStorage.setItem('startDate', formattedStartDate); 
            sessionStorage.setItem('endDate', formattedEndDate);
        } else {
            alert('Please select both start and end dates.');
            return;
        }

        // Save checkbox state to session storage
        if (isChecked) {
            sessionStorage.setItem('noInterns', 'true');
        }
       
       // Only navigate if all validation checks pass
        if (description.trim() !== '' && startDate && endDate) {
            // add 1 to the progress bar
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }

            navigate('/company-work');
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
                    setStartDate={setStartDate} 
                    setEndDate={setEndDate}                
                />

                <div className={styles.btn_container}>
                    <div className={styles.skip_wrapper}>
                        <Link to='/company-work'>
                            <Skip_btn />
                        </Link>
                    </div>

                    <div className={styles.footer_btn_wrapper}>
                        <Link to="/company-signup">
                                <White_btn>
                                    <img src={backArrow} />
                                    <p>BACK</p>
                                </White_btn>
                        </Link>

                        
                        <Red_btn onClick={handleNextStep} >                        
                            <p>NEXT STEP</p>
                            <img src={nextArrow} />
                        </Red_btn>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
{/* <Link to="/company-work"></Link> */}
export default Company_second_stage



