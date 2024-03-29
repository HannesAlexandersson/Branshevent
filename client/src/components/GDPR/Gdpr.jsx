import styles from './gdpr.module.css';

function Gdpr({ isChecked, handleCheckboxChange }) {
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
            <p className={styles.gdpr_link}>READ THE GDPR Terms and conditions HERE</p>
        </div>
    );
}

export default Gdpr;