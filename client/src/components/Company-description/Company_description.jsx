import { useState } from 'react';
import validator from 'validator'; //for url validation
/* import sanitizeHtml from 'sanitize-html'; */ //to sanitize the userinputted url
import { pencil, calendarIcon, add, close } from '../../assets/Icons/index.js';
import { White_btn, Red_btn, StartDate_picker, EndDate_picker, } from '../index.js';
import 'react-datepicker/dist/react-datepicker.css'
import style from './company_description.module.css';

function Company_description({ description, handleDescriptionChange, isChecked, handleCheckboxChange, startDate, endDate, setStartDate, setEndDate }) {   
    const placeholderText = "A short description about your company";   
    
    const [showInputField, setShowInputField] = useState(false); 
    const [onlineProfile, setOnlineProfile] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle the selected end date
    const handleEndDateSelect = (endDate) => {
        setEndDate(endDate); // Update endDate state using the setEndDate prop
    };
    
    // Function to handle the selected start date
    const handleStartDateSelect = (startDate) => {
        setStartDate(startDate); // Update startDate state using the setStartDate prop
    };



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
    };

    
    return(
        <>
            <div className={style.header_wrapper}>
                <p className={style.header}>This is us:</p>               
                <textarea 
                    className={style.inputfield}
                    placeholder={placeholderText}
                    value={description}
                    onChange={handleDescriptionChange}
                ></textarea>
            </div>

           

            <div className={style.date_wrapper}>
                <img src={calendarIcon} className={style.date_icon} />
                <p className='date-text'>Application period:</p>
                <div className={style.date_return_text_wrapper}>
                    {startDate && <p className={style.date_return_text}>Start Date: {startDate.toLocaleDateString()}</p>}
                    {endDate && <p className={style.date_return_text}>End Date: {endDate.toLocaleDateString()}</p>}
                </div>
            </div>

            <div className={style.date_btn_wrapper}>
                <StartDate_picker onSelectStartDate={handleStartDateSelect}>START DATE</StartDate_picker>
                <EndDate_picker onSelectEndDate={handleEndDateSelect}>END DATE</EndDate_picker>
            </div>
           

            <div className={style.checkboxWrapper}>

                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={style.checkboxInput}
                />
                <label htmlFor="checkbox" className={style.checkbox_text}>we are not looking for interns in the near future</label>
        
            </div>

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
            </div>

        </>
    );
}

export default Company_description