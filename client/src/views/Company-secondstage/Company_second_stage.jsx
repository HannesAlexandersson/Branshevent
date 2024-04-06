import { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Red_btn, White_btn, Progressbar, Company_description, Skip_btn, } from '../../components/index.js';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import Nav from '../Navigation/Navigation.jsx';
import styles from './company_second_stage.module.css';


function Company_second_stage(){
    const [currentStep, setCurrentStep] = useState(4);
    const totalSteps = 7;
    const [description, setDescription] = useState('');
    const [isDatePendingChecked, setIsDatePendingChecked] = useState(false);
    const [isContinuousChecked, setIsContinuousChecked] = useState(false);
    const [isNotLookingChecked, setIsNotLookingChecked] = useState(false);
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
        if (isNotLookingChecked) {
            sessionStorage.setItem('noInterns', 'true');
        }
        if(isDatePendingChecked){
            sessionStorage.setItem('applicationDatePending', 'true');
        }
        if(isContinuousChecked){
            sessionStorage.setItem('haveOpenings', 'true')
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
    //only 1 checkbox can be checked, if the user checks another the others gets put in false state
    const handleDatePendingChange = () => {
        setIsDatePendingChecked(true);
        setIsContinuousChecked(false);
        setIsNotLookingChecked(false);
    };

    const handleContinuousChange = () => {
        setIsDatePendingChecked(false);
        setIsContinuousChecked(true);
        setIsNotLookingChecked(false);
    };

    const handleNotLookingChange = () => {
        setIsDatePendingChecked(false);
        setIsContinuousChecked(false);
        setIsNotLookingChecked(true);
    };

    return(
        <>
            
            <div className={styles.main}>

            <Nav />
            
                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />                
                
                <Company_description 
                    description={description}
                    handleDescriptionChange={handleDescriptionChange}
                    handleDatePendingChange={handleDatePendingChange}
                    isDatePendingChecked={isDatePendingChecked}
                    handleContinuousChange={handleContinuousChange}
                    isContinuousChecked={isContinuousChecked}
                    handleNotLookingChange={handleNotLookingChange}
                    isNotLookingChecked={isNotLookingChecked}
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
                        <Link to="/company-account">
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

export default Company_second_stage



