import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Nav } from '../index';
import { Personal_information, Personal_preview, Red_btn, Spacer_bottom } from '../../components';

import style from './account.module.css';

//need an endpoint to server to fetch user data here
function Account(){
    const [showPersonalInfo, setShowPersonalInfo] = useState(true); // set to true to mount the state fromt he start
    const [showProfilePreview, setShowProfilePreview] = useState(false); // set to default false to hide the preview until iser clicks the btn
    const navigate = useNavigate();
    // Function to toggle between displaying personal information and profile preview
    const handleButtonClick = (component) => {
        if (component === 'personalInfo') {
            
            setShowPersonalInfo(true);
            setShowProfilePreview(false);
        } else if (component === 'profilePreview') {
            setShowPersonalInfo(false);
            setShowProfilePreview(true);
        }

        
    };

    const handleLogOut = () => {
        // Clear localStorage
        localStorage.clear();

        // Clear sessionStorage
        sessionStorage.clear();
            
        navigate('/log-in');
    }
    return (
        <div className={style.main}>
            <Nav />

            <div className={style.info_menu_container}>
                <div className={style.menu_btns}>
                    <button
                        className={`${style.info_btn} ${showPersonalInfo ? style.selected : ''}`}
                        onClick={() => {
                            setShowPersonalInfo(true);
                            setShowProfilePreview(false);
                        }}
                    >
                        Your Information
                    </button>

                    <button
                        className={`${style.profile_preview_btn} ${showProfilePreview ? style.selected : ''}`}
                        onClick={() => {
                            setShowPersonalInfo(false);
                            setShowProfilePreview(true);
                        }}
                    >
                        Preview
                    </button>
                </div>


                <div className={style.footer_btns_big_dev}>
                    <Red_btn onClick={handleLogOut}>Log Out</Red_btn>
                </div>


            </div>

           
            {showPersonalInfo && <Personal_information />}

           
            {showProfilePreview && <Personal_preview />}

            <Spacer_bottom />
            <div className={style.footer_btns}>
                <Red_btn onClick={handleLogOut}>Log Out</Red_btn>
            </div>
            <Spacer_bottom />
        </div>
    );
}

export default Account