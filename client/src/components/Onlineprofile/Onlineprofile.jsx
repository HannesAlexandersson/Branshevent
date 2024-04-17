import { useState, useEffect } from 'react';
import validator from 'validator'; 
import { add, image } from '../../assets/Icons/index.js';
import { Red_btn, White_btn } from '../index.js';
import style from './onlineprofile.module.css';


function Onlineprofile(){
    const [showPopup, setShowPopup] = useState(false);
    const [profiles, setProfiles] = useState({
        CompanyWebsite: '',
        LinkedIn: '',
        GitHub: '',
        Portfolio: '',
        Behance: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    let userRole = sessionStorage.getItem('userRole');
    console.log(userRole);

    useEffect(() => {
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        const storedData = sessionStorage.getItem('userRole') === 'student' ?
            sessionStorage.getItem('onlineProfiles') :
            sessionStorage.getItem('onlineProfiles');

        if (storedData) {
            setProfiles(JSON.parse(storedData));
        }
    }, []);



    const handleAddOnlineProfiles = () => {
        setShowPopup(true);
    };

    const handleCancel = () => {
        setProfiles({
            CompanyWebsite: '',
            LinkedIn: '',
            GitHub: '',
            Portfolio: '',
            Behance: ''
        });
        setShowPopup(false);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        const validProfiles = Object.entries(profiles).every(([key, url]) => {
            // Skip empty fields
            if (!url.trim()) {
                return true;
            }
            // Validate non-empty URLs
            return validator.isURL(url.trim());
        });

        if (validProfiles) {           
            console.log('Online profiles:', profiles);
            const onlineProfiles = {
                CompanyWebsite: profiles.CompanyWebsite.trim(),
                LinkedIn: profiles.LinkedIn.trim(),
                GitHub: profiles.GitHub.trim(),
                Portfolio: profiles.Portfolio.trim(),
                Behance: profiles.Behance.trim(),
                // Add more profile types here if we want more
            };
            // save onlineProfiles to sessionStorage
            sessionStorage.setItem('onlineProfiles', JSON.stringify(onlineProfiles));

            // reset the form and hide the popup
            setProfiles({
                CompanyWebsite: '',
                LinkedIn: '',
                GitHub: '',
                Portfolio: '',
                Behance: ''
            });
            setShowPopup(false);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter valid URLs for all profiles.');
        }
    };

    const handleInputChange = (profile, value) => {
        setProfiles(prevProfiles => ({
            ...prevProfiles,
            [profile]: value
        }));
    };

    return (
        <>
            <button className={style.add_profiles_btn} onClick={handleAddOnlineProfiles}>
                <img src={add} alt="Add Icon" />
                <p>Add Online Profiles</p>
            </button>

            {showPopup && (
                <div className={style.popup}>
                    <div className={style.form}>
                    {userRole === 'company' && (
                        <input
                            type="text"
                            value={profiles.CompanyWebsite}
                            onChange={(e) => handleInputChange('CompanyWebsite', e.target.value)}
                            placeholder="Company website URL"
                            className={style.input}
                        />
                    )}
                        <input
                            type="text"
                            value={profiles.LinkedIn}
                            onChange={(e) => handleInputChange('LinkedIn', e.target.value)}
                            placeholder="LinkedIn URL"
                            className={style.input}
                        />
                        {userRole === 'student' && (
                        <input
                            type="text"
                            value={profiles.GitHub}
                            onChange={(e) => handleInputChange('GitHub', e.target.value)}
                            placeholder="GitHub URL"
                            className={style.input}
                        />
                        )}
                        {userRole === 'student' && (
                        <input
                            type="text"
                            value={profiles.Portfolio}
                            onChange={(e) => handleInputChange('Portfolio', e.target.value)}
                            placeholder="Portfolio URL"
                            className={style.input}
                        />
                        )}
                        {userRole === 'student' && (
                        <input
                            type="text"
                            value={profiles.Behance}
                            onChange={(e) => handleInputChange('Behance', e.target.value)}
                            placeholder="Behance URL"
                            className={style.input}
                        />
                        )}
                        {errorMessage && <p className={style.error}>{errorMessage}</p>}
                        <div className={style.button_wrapper}>
                            <Red_btn className={style.popup_button} onClick={handleSubmit}>Add</Red_btn>
                            <White_btn className={style.popup_button} onClick={handleCancel}>Cancel</White_btn>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
 
/**
 * {!showInputFields && (              
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
 */
export default Onlineprofile