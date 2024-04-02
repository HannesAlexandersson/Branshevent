import React from 'react';
import Props from 'prop-types';
import styles from './company_signup_form.module.css';

function Company_signup_form({ handleSubmit }) {
    return (
        <div className={styles.container}>
            <h2>Contact Person</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.form_group}>                    
                    <input type="text" id="companyName" name="companyName" placeholder="Company Name" required className={styles.inputField}/>
                </div>
                <div className={styles.form_group}>                    
                    <input type="text" id="firstName" name="firstName" placeholder="First Name" required className={styles.inputField}/>
                </div>
                <div className={styles.form_group}>                    
                    <input type="text" id="lastName" name="lastName" placeholder="Last Name" required className={styles.inputField}/>
                </div>
                <div className={styles.form_group}>                    
                    <input type="email" id="email" name="email" placeholder="Email" required className={styles.inputField}/>
                </div>
                <div className={styles.form_group}>                    
                    <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Phone Number" required className={styles.inputField}/>
                </div>
                
            </form>
        </div>
    );
}
Company_signup_form.propTypes = {
    handleSubmit: Props.func,
}
export default Company_signup_form