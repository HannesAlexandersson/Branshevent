import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Progressbar, Student_form, Gdpr, White_btn, Red_btn, Spacer_bottom,  } from '../../components';
import { Nav, } from '../index.js';
import styles from './student_signup.module.css';

function Student_signup_firststage(){
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [currentStep, setCurrentStep] = useState(2);
    const totalSteps = 7;
    const [occupation, setOccupation] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        const storedData = sessionStorage.getItem('userRole') === 'student' ?
            sessionStorage.getItem('studentData') :
            sessionStorage.getItem('companyData');

        if (storedData) {
            setFormData(JSON.parse(storedData));
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); // stop default form submission so we can handle it ourselfs, Here we need to add formhandling, like validation and zanitation of the form data adn then send to db       

        // Check if occupation is selected
        if (!occupation) {
            // Prompt the user to select an occupation
            alert("Please select an occupation before continue!");
            return; 
        }

        if (isChecked) {
            // Set a session variable to indicate that GDPR is checked
            sessionStorage.setItem('gdprChecked', true);
        }else {
            alert("You must agree to GDPR to register!");
            return; 
        } 

         // Retrieve sanitized and validated form data
         const { firstName, lastName, email, phoneNumber } = formData;
         // Validate form data
        const isValid = validateForm();

        if (isValid) {

            if (currentStep < totalSteps) {//add 1 to the progressbar prop
                setCurrentStep(currentStep + 1); 
            }

            //save the formdata to the session storage
            sessionStorage.setItem('studentData', JSON.stringify(formData));
            

            // Save occupation to session storage
            sessionStorage.setItem('occupation', occupation);
            navigate('/student-account');
        }else {
            // Display error popup
            setShowPopup(true);
        }
    };
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);        
    };

    const handleOccupationChange = (selectedOccupation) => {
        setOccupation(selectedOccupation);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleChange = (name, value) => {
        // Update form data state with sanitized input value
        setFormData(prevData => ({
            ...prevData,
            [name]: value.trim() 
        }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate first name
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }

        // Validate last name
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        // Validate phone number
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^\d+$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = 'Phone number is invalid';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const isNextButtonDisabled = !isChecked;
    console.log(isNextButtonDisabled);

    
    return(
        <>           
            <div className={styles.main}>
            <Nav />
                <Progressbar currentStep={currentStep} totalSteps={totalSteps}/>
            

                <Student_form id="studentSignupForm" handleSubmit={handleSubmit} handleOccupationChange={handleOccupationChange} handleChange={handleChange} formData={formData} errors={errors} validateForm={validateForm} showPopup={showPopup} onClose={handleClosePopup}/> 
                    

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

                <Spacer_bottom />
            </div>
        </>
    );
}

export default Student_signup_firststage