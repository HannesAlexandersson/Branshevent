import React from 'react';
import Props from 'prop-types';
import styles from './company_signup_form.module.css';

function Company_signup_form({ handleChange, formData }) {
    const sanitizeInput = (value) => {       
        return value.trim();
    };

   
   
    return (
        <div className={styles.container}>
            <h2>Contact Person</h2>
            <form className={styles.form}>
                
            <div className={styles.form_group}>
                <input 
                    type="text" 
                    id="companyName" 
                    name="companyName" 
                    placeholder="Company Name" 
                    required 
                    className={styles.inputField} 
                    value={formData.companyName}
                    onChange={(e) => handleChange('companyName', sanitizeInput(e.target.value))}
                />
            </div>
            <div className={styles.form_group}>
                <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name" 
                    required 
                    minLength="2" 
                    maxLength="50" 
                    className={styles.inputField} 
                    value={formData.firstName}
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
                    minLength="2" 
                    maxLength="50" 
                    className={styles.inputField} 
                    value={formData.lastName}
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
                    value={formData.email}
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
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                    className={styles.inputField} 
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', sanitizeInput(e.target.value))}
                />                
            </div>
                
            </form>
        </div>
    );
}
Company_signup_form.propTypes = {
    handleSubmit: Props.func,
}
export default Company_signup_form