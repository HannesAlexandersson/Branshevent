import { useState } from 'react';
import { About, Contact, QR_Code } from '../index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview(){
    const [showAbout, setShowAbout] = useState(true); 
    const [showContact, setShowContact] = useState(false); 
    const [showQRCode, setShowQRCode] = useState(false);
    const userRole = sessionStorage.getItem('userRole');
    sessionStorage.setItem('firstname', 'Hannes');
    sessionStorage.setItem('lastName', 'Hansson');
    sessionStorage.setItem('compName', 'Gyllene Björnen');

    const firstName = sessionStorage.getItem('firstname');
    const lastname = sessionStorage.getItem('lastName');
    const compname = sessionStorage.getItem('compName');

    const me = 'me';
    const us = 'us';
    


    // Function to toggle between displaying the submenus
    const handleButtonClick = (component) => {
        if (component === 'About') {
            
            setShowAbout(true);
            setShowContact(false)
            setShowQRCode(false);
        } else if (component === 'Contact') {
            setShowAbout(false);
            setShowContact(true)
            setShowQRCode(false);
        } else if (component === 'QRCode') {
            setShowAbout(false);
            setShowContact(false)
            setShowQRCode(true);
        }
    };
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                <div className={style.redBox}>
                    <div className={style.img_container}>
                        <div className={style.img_display_area}>
                            {/* img here */}
                        </div>
                    </div>
                   
                        
                    <div className={style.user_account}>

                    {userRole === 'student' && (
                        <div className={style.user_details}>
                            <img src={circle_user_round} />
                            <div className={style.user_name_wrapper}>                                
                                <h1 className={style.user_header}>{firstName} {lastname}</h1>
                            </div>
                        </div>                        
                    )}
                     {userRole === 'company' && (
                        <div className={style.user_details}>
                            <img src={briefcase} />
                            <div className={style.user_name_wrapper}>                                
                                <h1 className={style.user_header}>{compname}</h1>
                            </div>
                        </div>
                    )}

                    {userRole === 'student' && (
                        <div>
                            <div className={style.role_details}>
                                <img src={briefcase} />
                                <p className={style.user_role}>USER ROLE HERE</p>
                            </div>
                        </div>
                        )}
                     {userRole === 'company' && (
                        <div>
                            <div className={style.role_details}>
                                <div className={style.usher}>
                                    <img src={userSml} />
                                    <p className={style.user_role}>{firstName} {lastname}</p>
                                </div>
                                <div className={style.usher}>
                                    <img src={locationBlack} />
                                    <p className={style.user_role}>City Name</p>
                                </div>
                            </div>
                        </div>
                        )}

                    </div>

                    <div className={style.details_submenu}>

                        <div className={style.menu_btns}>
                            <button
                                className={`${style.info_btn} ${showAbout ? style.selected : ''}`}
                                onClick={() => {
                                    setShowAbout(true);
                                    setShowContact(false);
                                    setShowQRCode(false);
                                }}
                            >
                                {userRole === 'student' ? 'About me' : 'About us'}
                            </button>

                            <button
                                className={`${style.profile_preview_btn} ${showContact ? style.selected : ''}`}
                                onClick={() => {
                                    setShowAbout(false);
                                    setShowContact(true);
                                    setShowQRCode(false);
                                }}
                            >
                                Contact
                            </button>

                            <button
                                className={`${style.profile_preview_btn} ${showQRCode ? style.selected : ''}`}
                                onClick={() => {
                                    setShowAbout(false);
                                    setShowContact(false);
                                    setShowQRCode(true);
                                }}
                            >
                                QR code
                            </button>
                        </div>
                            
                            {showAbout && <About />}           
                            {showContact && <Contact />}
                            {showQRCode && <QR_Code />}
                    </div>

                    </div>
            </div>
        </>
    );
}

export default Personal_preview