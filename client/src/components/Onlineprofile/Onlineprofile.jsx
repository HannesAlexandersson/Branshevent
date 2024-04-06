import { useState } from 'react';
import validator from 'validator'; 
import { add, image } from '../../assets/Icons/index.js';
import { Red_btn, White_btn } from '../index.js';
import style from './onlineprofile.module.css';


function Onlineprofile(){
    const [onlineProfiles, setOnlineProfiles] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showInputFields, setShowInputFields] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddOnlineProfile = () => {
        setShowInputFields(true);
    };

    const handleCancelOnlineProfile = () => {
        setInputValue('');
        setShowInputFields(false);
    };

    const handleInputValueChange = (index, value) => {
        const updatedProfiles = [...onlineProfiles];
        updatedProfiles[index] = value;
        setOnlineProfiles(updatedProfiles);
    };

    const handleAddProfileField = () => {
        setOnlineProfiles([...onlineProfiles, inputValue]);
        setInputValue('');
    };

    const handleSubmitOnlineProfiles = () => {
        const isValid = onlineProfiles.every(url => validator.isURL(url.trim()));
    
        if (isValid) {
           // Save the online profiles array to session storage
            sessionStorage.setItem('onlineProfiles', JSON.stringify(onlineProfiles.map(url => url.trim())));
            
            // Reset input fields and hide the popup
            setOnlineProfiles([]);
            setShowInputFields(false);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter valid URLs for all profiles.');
            alert('Please enter valid URLs for all profiles.');
        }
    };

    return(
        <>
            {showInputFields && (
                <div className={style.wrapper}>
                    {onlineProfiles.map((profile, index) => (
                        <div key={index} className={style.item}>
                            <input
                                type="text"
                                value={profile}
                                onChange={(e) => handleInputValueChange(index, e.target.value)}
                                className={style.onlineProfile_input}
                            />
                        </div>
                    ))}
                    <div className={style.btn_wrap}>
                        <Red_btn className={style.add} onClick={handleAddProfileField}>Add Profile</Red_btn>
                        <White_btn className={style.add}  onClick={handleSubmitOnlineProfiles}>Submit</White_btn>
                        <Red_btn className={style.add}  onClick={handleCancelOnlineProfile}>Cancel</Red_btn>
                    </div>
                </div>
            )}
            {!showInputFields && (              
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
            )}
        
        </>
    );
}
 

export default Onlineprofile