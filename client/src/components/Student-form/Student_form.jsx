import { useState } from 'react';
import White_btn from '../White-btn/White_btn';
import { close } from '../../assets/Icons/index.js';
import Props from 'prop-types';
import styles from './student_form.module.css';

function Student_form({ handleSubmit, handleOccupationChange, handleChange, formData, errors, validateForm, showPopup, onClose  }){
    const [isWebDeveloperSelected, setIsWebDeveloperSelected] = useState(false);
    const [isDesignerSelected, setIsDesignerSelected] = useState(false);
    

    const handleWebDeveloperClick = () => {
        setIsWebDeveloperSelected(true);
        setIsDesignerSelected(false); // Deselect designer
        handleOccupationChange('WEB DEVELOPER');
    };

    const handleDesignerClick = () => {
        setIsDesignerSelected(true);
        setIsWebDeveloperSelected(false); // Deselect web developer
        handleOccupationChange('DESIGNER');
    };

    const sanitizeInput = (value) => {       
        return value.trim();
    };

    

    return(
        <>
           <div className={styles.header}>
                <p>Your information</p>
           </div>

           <div className={styles.btn_wrapper}>
                <button
                    className={`${isWebDeveloperSelected ? styles.selected : ''} ${styles.btn}`} 
                    onClick={handleWebDeveloperClick}
                >
                    <p>WEB DEVELOPER</p>
                </button>

                <button
                    className={`${isDesignerSelected ? styles.selected : ''} ${styles.btn}`}
                    onClick={handleDesignerClick}
                >
                    <p>DESIGNER</p>
                </button>
           </div>

           <div className={styles.form_container}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (validateForm()) {
                        handleSubmit(e);
                    }
                }} className={styles.form}>


                    <div className={styles.form_group}>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            required
                            className={styles.inputField}
                            onChange={(e) => handleChange('firstName', sanitizeInput(e.target.value))}
                        />
                        
                    </div>
                    <div className={styles.form_group}>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            required
                            className={styles.inputField}
                            onChange={(e) => handleChange('lastName', sanitizeInput(e.target.value))}
                        />
                       
                    </div>
                    <div className={styles.form_group}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            className={styles.inputField}
                            onChange={(e) => handleChange('email', sanitizeInput(e.target.value))}
                        />
                        
                    </div>
                    <div className={styles.form_group}>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            required
                            className={styles.inputField}
                            onChange={(e) => handleChange('phoneNumber', sanitizeInput(e.target.value))}
                        />
                        
                    </div>                   
                    {showPopup && (
                        <div className={styles.errorPopup}>
                            <div className={styles.btn_close_wrapper}>
                                <button className={styles.closeButton} onClick={onClose}>
                                    <img src={close} />
                                </button>
                            </div>
                            <div className={styles.error_txt_wrapper}>
                                {Object.values(errors).map((error, index) => (
                                    <span key={index} className={styles.error}>
                                        {error}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}

export default Student_form