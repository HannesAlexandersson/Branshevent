import { backArrow, nextArrow, closeRed, checkmarg, gren } from '../../assets/Icons/index.js';
import { Link, useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Nav, } from '../index.js'
import { Progressbar, Red_btn, Spacer_bottom, White_btn } from '../../components/index.js';
import styles from './company_account.module.css';

function Company_account(){
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [currentStep, setCurrentStep] = useState(5);
    const [errorMessage, setErrorMessage] = useState('');
    const totalSteps = 7;
    const data = JSON.parse(sessionStorage.getItem('companyData'));
    const user = data.email;
    
    useEffect(() => {
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        const storedData = sessionStorage.getItem('userRole') === 'student' ?
            sessionStorage.getItem('password') :
            sessionStorage.getItem('password');

        if (storedData) {
            setPassword(storedData);
        }
    }, []);

    const handlePasswordChange = (e) => {
        const newPassword = sanitizeInput(e.target.value);
        setPassword(newPassword);        
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = sanitizeInput(e.target.value);
        setConfirmPassword(newConfirmPassword);        
    };

    const sanitizeInput = (value) => {       
        return value.trim();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setPasswordMatch(false);
            return;
        } else {
            setPasswordMatch(true);
            setErrorMessage('');
        }

        // Check if password meets other requirements
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        } else if (!/\d/.test(password)) {
            setErrorMessage('Password must contain at least one number');
            return;
        } else if (!/[a-zA-Z]/.test(password)) {
            setErrorMessage('Password must contain at least one letter');
            return;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setErrorMessage('Password must contain at least one special character');
            return;
        } else {
            setErrorMessage('Password accepted');
        }

        
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('password', password);

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }

        navigate('/company-description');
    };

    
    return(
        <>
            
            <div className={styles.main}>

            <Nav />

            <Progressbar currentStep={currentStep} totalSteps={totalSteps} />            

            <form className={styles.form}>

            <div className={styles.container}>
                <h2>Create Log In:</h2>
            </div>
                
                <div className={styles.form_group}>
                    <label className={styles.label} htmlFor='companyName'>User</label>
                    <input 
                        type="text" 
                        id="user" 
                        name="user" 
                        placeholder={user} 
                        required 
                        className={styles.inputField_blue} 
                        disabled
                    />
                </div>

                <div className={styles.password_container}>
                    <div className={styles.form_group}>
                        <label className={styles.label} htmlFor='password'>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="password123"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            minLength="8"
                            maxLength="20"
                            className={styles.inputField}
                        />
                    </div>

                    
                    <div className={styles.form_group}>
                        <label className={styles.label} htmlFor='confirm'>Confirm password</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="password123"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            minLength="8"
                            maxLength="20"
                            className={styles.inputField}
                        />                       
                    </div>

                    {errorMessage && (
                    <div className={styles.validationIcon}>
                        {errorMessage !== 'Password accepted' ? 
                            <img src={closeRed} alt="Error" className={styles.red_cross} /> :
                            <img src={gren} alt="Success" className={styles.green_bock} />
                        }
                        <div className={styles.error_cont}>
                            <span className={styles.validationMessage}>{errorMessage}</span>
                        </div>
                    </div>
                    )}
                    
                </div>               
                
                
            </form>                


            </div>
            <Spacer_bottom />

            <div className={styles.footer_btn_container}>
                <Link to="/company-signup">
                    <White_btn>
                        <img src={backArrow} />
                        <p>BACK</p>
                    </White_btn>
                </Link>

                
                <Red_btn onClick={(e) => handleSubmit(e)} disabled={!passwordMatch || !password}>
                    <p>NEXT STEP</p>
                    <img src={nextArrow} />
                </Red_btn>
            </div>                         
        <Spacer_bottom />
        </>
    );
}


export default Company_account