import White_btn from '../White-btn/White_btn';
import Props from 'prop-types';
import styles from './student_form.module.css';

function Student_form({ handleSubmit }){


    return(
        <>
           <div className={styles.header}>
                <p>Your information</p>
           </div>

           <div className={styles.btn_wrapper}>
                <White_btn>
                    <p>WEB DEVELOPER</p>
                </White_btn>

                <White_btn>
                    <p>DESIGNER</p>
                </White_btn>
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