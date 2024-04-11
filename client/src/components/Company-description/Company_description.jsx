import { pencil, calendarIcon, add, close } from '../../assets/Icons/index.js';
import { White_btn, Red_btn, StartDate_picker, EndDate_picker, Onlineprofile, Add_image, } from '../index.js';
import 'react-datepicker/dist/react-datepicker.css'
import style from './company_description.module.css';

function Company_description({ description, handleDescriptionChange, isDatePendingChecked, isContinuousChecked, isNotLookingChecked, handleDatePendingChange, handleContinuousChange, handleNotLookingChange, startDate, endDate, setStartDate, setEndDate }) {   
    const placeholderText = "A short description about your company";   

   
    
    
    // Function to handle the selected end date
    const handleEndDateSelect = (endDate) => {
        setEndDate(endDate); // Update endDate state using the setEndDate prop
    };
    
    // Function to handle the selected start date
    const handleStartDateSelect = (startDate) => {
        setStartDate(startDate); // Update startDate state using the setStartDate prop
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
                {startDate && typeof startDate === 'object' ? (
                        <p className={style.date_return_text}>Start Date: {startDate.toLocaleDateString()}</p>
                            ) : (
                        <p className={style.date_return_text}>Start Date: {startDate}</p>
                            )}                        {endDate && typeof endDate === 'object' ? (
                        <p className={style.date_return_text}>End Date: {endDate.toLocaleDateString()}</p>
                            ) : (
                        <p className={style.date_return_text}>End Date: {endDate}</p>
                            )}
                </div>
            </div>

            <div className={style.date_btn_wrapper}>
                <StartDate_picker onSelectStartDate={handleStartDateSelect}>START DATE</StartDate_picker>
                <EndDate_picker onSelectEndDate={handleEndDateSelect}>END DATE</EndDate_picker>
            </div>
           

            <div className={style.checkboxWrapper}>
                <div className={style.check_cont}>
                    <input
                            type="checkbox"
                            id="date_pending"
                            checked={isDatePendingChecked}
                            onChange={handleDatePendingChange}
                            className={style.checkboxInput}
                            value={isDatePendingChecked}
                        />
                        <label htmlFor="date_pending" className={style.checkbox_text}>Internship openings, application date pending.</label>
                </div>
                <div className={style.check_cont}>
                    <input
                        type="checkbox"
                        id="continues"
                        checked={isContinuousChecked}
                        onChange={handleContinuousChange}
                        className={style.checkboxInput}
                        value={isContinuousChecked}
                    />
                    <label htmlFor="continues" className={style.checkbox_text}>Continuous internship openings.</label>
                </div>
                <div className={style.check_cont}>
                    <input
                        type="checkbox"
                        id="not_looking"
                        checked={isNotLookingChecked}
                        onChange={handleNotLookingChange}
                        className={style.checkboxInput}
                        value={isNotLookingChecked}
                    />
                    <label htmlFor="not_looking" className={style.checkbox_text}>we are not looking for interns in the near future</label>
                </div>
            </div>
        <div className={style.online_wrapper}>
          <Onlineprofile />
          <Add_image />
        </div>


        </>
    );
}


//SAVE FOR REFERENCE A LITTLE WHILE
/* const [showInputField, setShowInputField] = useState(false); 
    const [onlineProfile, setOnlineProfile] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
 */


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
    };
 */


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
            </div>
*/
export default Company_description