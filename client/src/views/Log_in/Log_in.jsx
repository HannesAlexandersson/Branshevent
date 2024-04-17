import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Spacer_bottom } from '../../components/index';
import { Nav } from '../index';
import style from './login.module.css';
import { login } from '../../apiFunctions/user.jsx'


function Log_in(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [userType, setUserType] = useState('');
    sessionStorage.clear;
    localStorage.clear;
    

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    }


    const handleSignIn = () => {
        if(userType === 'student'){
            
            signInStudent();
        }else if(userType === 'company'){
            signInCompany();
        }
    }

    async function signInStudent() {
        const promise = login(email, password, 'student');
        promise.then(() => navigate("/home"));
    }
    
     async function signInCompany () {
        const promise = login(email, password, 'company');
        promise.then(() => navigate("/home"));
    } 

    //if user press sign up we take them to the registration form
    const handleSignUp = () => {
        navigate('/sign-in');
    };

    return(
        <>            
            <div className={style.main}>

            <Nav/>
           

            <div className={style.content_wrapper}>
                <div className={style.content_text}>
                    <h1>Sign in to account</h1>                    
                </div>
                
                <form className={style.formfield}>
                    <div className={style.radio}>
                        <div>
                            <input
                                type="radio"
                                id="company"
                                name="userType"
                                value="company"
                                checked={userType === 'company'}
                                onChange={handleUserTypeChange}
                                className={style.radiobtn}
                            />
                            <label className={style.label} htmlFor="company">Company</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="student"
                                name="userType"
                                value="student"
                                checked={userType === 'student'}
                                onChange={handleUserTypeChange}
                                className={style.radiobtn}
                            />
                            <label className={style.label} htmlFor="student">Student</label>
                        </div>
                    </div>
                    <div className={style.inputbox}>
                        <label className={style.label} htmlFor='username' >Username</label> 
                        <input className={style.inputfield} name="username" placeholder="Your mail" value={email} onChange={handleUsernameChange} />
                    </div>
                    <div className={style.inputbox}>
                        <label className={style.label} htmlFor='password' >Password</label>
                        <input className={style.inputfield} type="password" name="password" placeholder="Password"  value={password} onChange={handlePasswordChange} />
                    </div>
                </form>
                <div className={style.content_btn_wrapper}   >                   
                <button onClick={() => handleSignIn()} className={style.content_btn} >Sign in</button> 
                </div>
                {errors ? (<div className={style.error}><p>{errors}</p></div>) : (<span></span>)}

                <div className={style.content_text}>
                    <h4>or</h4>
                    <h1>Join the event</h1>                    
                </div>
                <div className={style.content_btn_wrapper}>
                    <button onClick={() => handleSignUp()} className={style.content_btn} >CREATE ACCOUNT</button>                    
                </div>
            </div>

            <Spacer_bottom />
           
        </div>
    </>
    );
}

export default Log_in