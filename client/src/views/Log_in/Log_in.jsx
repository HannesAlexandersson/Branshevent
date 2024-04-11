import { Link, useNavigate } from 'react-router-dom';
import {  Navbar_landing } from '../../components/index';
import { Nav } from '../index';
import style from './login.module.css';


function Log_in(){
    const navigate = useNavigate();


    const handleSignIn = () => {
        //compare input to users in db, if user inputs correct data, log them in. 
        /*
        
        */

        navigate('/home');
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
                        <input className={style.inputfield} name="username" placeholder="Your mail"/>
                    </div>
                    <div className={style.inputbox}>
                        <label className={style.label} htmlFor='password' >Password</label>
                        <input className={style.inputfield} name="password" placeholder="Password"/>
                    </div>
                </form>
                <div className={style.content_btn_wrapper}   >                   
                <button onClick={() => handleSignIn()} className={style.content_btn} >Sign in</button> 
                </div>

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