import { useState } from 'react';
import White_btn from '../White-btn/White_btn';
import Props from 'prop-types';
import styles from './student_form.module.css';

function Student_form({ handleSubmit }){
    const [isWebDeveloperSelected, setIsWebDeveloperSelected] = useState(false);
    const [isDesignerSelected, setIsDesignerSelected] = useState(false);

    const handleWebDeveloperClick = () => {
        setIsWebDeveloperSelected(true);
        setIsDesignerSelected(false); // Deselect designer
    };

    const handleDesignerClick = () => {
        setIsDesignerSelected(true);
        setIsWebDeveloperSelected(false); // Deselect web developer
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
           <form onSubmit={handleSubmit} className={styles.form}>
                
                
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
        </>
    );
}

export default Student_form