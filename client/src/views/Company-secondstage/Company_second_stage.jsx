import { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Red_btn, White_btn, Progressbar, Company_description, Skip_btn, Spacer_bottom, } from '../../components/index.js';
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

    useEffect(() => {
        let storedData = null;
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        if(sessionStorage.getItem('userRole') === 'company'){
           storedData = {
            startDate: sessionStorage.getItem('startDate'),
            endDate: sessionStorage.getItem('endDate'),
            description: sessionStorage.getItem('companyDescription'),
            noInterns: sessionStorage.getItem('noInterns'),
            datePending: sessionStorage.getItem('applicationDatePending'),
            haveOpenings: sessionStorage.getItem('haveOpenings'),
            }
        } 

        if (storedData) {
            if(storedData.noInterns){
                setIsNotLookingChecked(storedData.noInterns);
            }
            if(storedData.datePending){
                setIsDatePendingChecked(storedData.datePending);
            }
            if(storedData.haveOpenings){
                setIsContinuousChecked(storedData.haveOpenings);
            }
            if(storedData.startDate){
                setStartDate(storedData.startDate);
            }
            if(storedData.endDate){
                setEndDate(storedData.endDate);
            }
            if(storedData.description){
                setDescription(storedData.description);
            }
        }
    }, []);

    /*---------------------------------------*/
   
    
    const formatDate = (date) => {
        if (typeof date === 'object') {
            // If it's a Date object, format it
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        } else {
            // If it's already formatted, return it as is
            return date;
        }
    };

    
    const handleNextStep = () => {
      /*   if(localStorage.getItem('image') === null){
            saveImageToLocalStorage(compAvatar);
         } */


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
            sessionStorage.setItem('open_for_lia', 'noInterns');
        }
        if(isDatePendingChecked){
            sessionStorage.setItem('open_for_lia','applicationDatePending');
        }
        if(isContinuousChecked){
            sessionStorage.setItem('open_for_lia','haveOpenings')
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

                    <Spacer_bottom />
                </div>
            </div>
        </>
    );
}

export default Company_second_stage



