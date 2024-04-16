import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { calendarIcon, add, backArrow, nextArrow, image, redInfo } from '../../assets/Icons/index.js';
import { Progressbar, White_btn, Red_btn, Skip_btn, Onlineprofile, Spacer_bottom, Add_image  } from '../../components';
import { Nav, } from '../index.js';
import 'react-datepicker/dist/react-datepicker.css'
import style from './student_secondstage.module.css';

 

function Student_second_stage(){       
    const [isChecked, setIsChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(4);
    const [description, setDescription] = useState('');    
    const [startDate, setStartDate] = useState('11/25/2024'); 
    const [endDate, setEndDate] = useState('05/30/2025');
    const navigate = useNavigate();
    const totalSteps = 7;
    const placeholderText = "A short description about you";   

    

    useEffect(() => {
        let storedData = null;
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        if(sessionStorage.getItem('userRole') === 'student'){
           storedData = {
            startDate: sessionStorage.getItem('startDate'),
            endDate: sessionStorage.getItem('endDate'),
            description: sessionStorage.getItem('studentDescription'),
            noDates: sessionStorage.getItem('noDates'),
            }
        } 

        if (storedData) {
            if(storedData.noDates){
                setIsChecked(storedData.noDates);
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
    
    //'''''''''''''''''''''
    
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

   
    //format the date input the format we want
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
       /*  if(localStorage.getItem('image') === null){
           saveImageToLocalStorage(studAvatar);
        } */
        // Perform validation the user inputted description, If its empty prompt the user for input
        if (description.trim() === '') {
            alert('Please provide a description for your company.');
            return;
        }
        // Sanitize the description
        const sanitizedDescription = description.trim();
        // Save description to session storage
        sessionStorage.setItem('studentDescription', sanitizedDescription);
        // Save start and end dates to session storage // or Save checkbox state to session storage
        if (isChecked) {
            sessionStorage.setItem('noDates', 'true');
        }else if (startDate && endDate) {
            console.log(startDate);
            const formattedStartDate = formatDate(startDate);
            console.log(formattedStartDate);
            const formattedEndDate = formatDate(endDate);
            sessionStorage.setItem('startDate', formattedStartDate); 
            sessionStorage.setItem('endDate', formattedEndDate);
            sessionStorage.setItem('noDates', false);
        } else {
            alert('Please select both start and end dates OR check the checkbox for no dates.');//if the user havent entered any dates, prompt the user for both dates
            return;
        }        
        
       
       // Only navigate if all validation checks pass
        if (description.trim() !== '' && startDate && endDate || description.trim() !== '' && isChecked) {
            // add 1 to the progress bar
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }

            navigate('/student-work');
        }
    };

    // handlers for the different states on the page
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    
    return(
        <>
             <div className={style.main}>
             <Nav />

                <Progressbar currentStep={currentStep} totalSteps={totalSteps}/>


                <div className={style.header_wrapper}>
                    <p className={style.header}>This is me:</p>               
                    <textarea className={style.inputfield} placeholder={`${placeholderText} `} value={description} onChange={handleDescriptionChange}></textarea>
                    
                </div>

                <div className={style.date_wrapper}>
                    <div className={style.date_return_text_wrapper}>
                        <img src={calendarIcon} className={style.date_icon} />
                        <p className='date-text'>Application period:</p>
                    </div>              
                  

                    <div className={style.date_btn_wrapper}>
                        <div className={style.student_date_btn}>
                            <p><span>11/25/2024</span>-<span>05/30/2025</span></p>
                        </div>
                        <img className={style.redInfo} src={redInfo} alt="red info button" />                        
                        <span className={style.tooltip}>Student dates are fixed to current dates</span>                        
                    </div>
                </div>
             

                <div className={style.checkboxWrapper}>

                    <input
                        type="checkbox"
                        id="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className={style.checkboxInput}
                    />
                    <label htmlFor="checkbox" className={style.checkbox_text}>I don&apos;t know when my LIA-period is yet</label>
            
                </div>
                <div className={style.profiles_container}>
                    <Onlineprofile />
                    <Add_image />
                </div>
             
                <div className={style.btn_container}>
                    <div className={style.skip_wrapper}>
                        <Link to='/student-work'>
                            <Skip_btn />
                        </Link>
                    </div>

                   

                    <div className={style.footer_btn_wrapper}>
                        <Link to="/student-account">
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


                <Spacer_bottom />
            </div>
        </>
    );
}
//KEEP FOR REFERENCE A LITTLE WHILE UNTIL WE KNOW THE ONLINE COMPONENT WORKS FLAWLESS
/*  const [showInputField, setShowInputField] = useState(false); 
    const [onlineProfile, setOnlineProfile] = useState('');  
    const [errorMessage, setErrorMessage] = useState('');*/
/* 
    // Function to handle adding an online profile
    const handleAddOnlineProfile = () => {
        console.log('Button clicked');
        setShowInputField(true); 
    };

    // Function to handle submitting the online profile
    const handleSubmitOnlineProfile = () => {
        if (validator.isURL(onlineProfile)) {
            
            const sanitizedUrl = onlineProfile.trim();
            // save the url to the session
            sessionStorage.setItem('onlineProfile', sanitizedUrl);
            // Reset input field and hide the popup
            setOnlineProfile('');
            setShowInputField(false);
        } else {
            setErrorMessage('Please enter a valid URL.');
        }
    };

    const handleCancelOnlineProfile = () => {
        setShowInputField(false); // Hide the input field when "Cancel" is clicked
    }; */
/*
   {showInputField && (
                    <div className={style.popup}>
                        <input
                            className={style.onlineProfile_input}
                            type="text"
                            placeholder="Enter online profile URL"
                            value={onlineProfile}
                            onChange={(e) => setOnlineProfile(e.target.value)}
                        />
                        <div className={style.online_btns_wrapper}>
                            <Red_btn onClick={handleSubmitOnlineProfile}>Submit</Red_btn>
                            <Red_btn onClick={handleCancelOnlineProfile}>Cancel</Red_btn>
                        </div>
                    </div>
                    )}
                <div className={style.online_profile_wrapper}>
                    <White_btn className={style.online_profile_btn} onClick={handleAddOnlineProfile}>
                        <img src={add} alt="Add Icon" />
                        <p>Add online profile</p>
                    </White_btn>          

                    <White_btn className={style.image_icon}>
                        <img src={add} alt="add Icon" />
                        <img src={image} alt="image icon small" />
                    </White_btn>      
                </div>



*/
export default Student_second_stage