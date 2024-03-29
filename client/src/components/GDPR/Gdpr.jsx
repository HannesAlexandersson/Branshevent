import { useState } from 'react';
import GdprPopup from './PopUp.jsx';
import styles from './gdpr.module.css';

function Gdpr({ isChecked, handleCheckboxChange }) {
    const [showPopup, setShowPopup] = useState(false);

    const handleGdprLinkClick = () => {
        setShowPopup(true); 
    };
    const handleClosePopup = () => {
        setShowPopup(false); 
    };
    const handleAcceptTerms = () => {
        handleCheckboxChange(true); 
        setShowPopup(false); 
    };
    return (
        <div className={styles.container}>
            <label className={styles.checkboxLabel}>
            <input                
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <span className={styles.checkmark}></span>
            <p className={styles.gdpr_text}>I have read and agree to the GDPR terms and conditions</p>
            </label> 
            <p className={styles.gdpr_link} onClick={handleGdprLinkClick}>READ THE GDPR Terms and conditions HERE</p>
            {showPopup && <GdprPopup onClose={handleClosePopup} onAccept={handleAcceptTerms} />}
        </div>
    );
}

export default Gdpr;