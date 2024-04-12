import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  get_user_data } from '../../components/index';
import { Nav } from '../index';

import style from './login.module.css';


function Log_in(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSignIn = () => {
        //compare input to users in db, if user inputs correct data, log them in. 
        const endpoint = 'api/user/login';
        
        get_user_data(endpoint, email, password)
        .then(data => {          
            sessionStorage.setItem('loggedIn', 'true');
            console.log('Successfully logged in');

            if(sessionStorage.getItem('loggedIn') === 'true'){
                navigate('/home');
            }
        })
        .catch(error => {
            // If the request fails, check the error status
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {                
                console.error('Invalid credentials');                
                setErrors('Incorrect username or password');
            } else {
                
                console.error('Error:', error);
            }
        });
    

        
    };

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

           
        </div>
    </>
    );
}

export default Log_in