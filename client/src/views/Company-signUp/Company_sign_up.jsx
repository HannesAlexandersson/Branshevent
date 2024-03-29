import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState } from 'react';
import Nav from '../../views/Navigation/Navigation.jsx';
import Form from '../../components/Company-form/Company_signup_form.jsx';
import Gdpr from '../../components/GDPR/Gdpr.jsx';
import styles from './company_sign_up.module.css';

function Company_sign_up(){
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
       

        // enter the path to the next page here when its finished
        navigate('/');
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const isNextButtonDisabled = !isChecked;

    return(
        <>
            <Nav />
            <div className={styles.main}>
            <div className={styles.progress_bar}>PROGRESSBAR HERE</div>

                <Form id="companySignupForm" handleSubmit={handleSubmit}/>                

                
                    <Gdpr
                     isChecked={isChecked}
                     handleCheckboxChange={handleCheckboxChange}
                    />                

                <div className={styles.footer_btn_wrapper}>
                    <Link to="/sign-in">
                        <button className={`${styles.back_btn} ${styles.btn}`}>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </button>
                    </Link>

                    
                    <button className={`${styles.next_btn} ${styles.btn}`} onClick={handleSubmit} disabled={isNextButtonDisabled}>                        
                        <p>NEXT STEP</p>
                        <img src={nextArrow} />
                    </button>
                    
                </div>
            </div>
        </>
    );
}


export default Company_sign_up