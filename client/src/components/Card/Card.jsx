import { useState } from 'react';
import { About, Contact, QR_Code } from '../index.js';
import { briefcase, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './card.module.css';

function Card({userRole, student, company, img, }){    
    const [showAbout, setShowAbout] = useState(true); 
    const [showContact, setShowContact] = useState(false); 
    const [showQRCode, setShowQRCode] = useState(false);
    
   
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
   

    

/* we get userData as props from either company view or the accountpage, so it can either be 
 a student that want to view a company, or a student that want to watch their own details, 
 or a company watching their own details or another company etc etc, so we need to know who is
 watching what */

    let userData;
    if (student) {
        userData = student;

      
    }else if(company){
        userData = company;
    }
    
    
    
    return(
        <>
            <div className={style.redBox}>
                    <div className={style.img_container}>
                        <div className={style.img_display_area}>
                            <img src={img} />
                        </div>
                    </div>
                   
                        
                    <div className={style.user_account}>

                    {student && (
                        <div className={style.user_details}>
                            <img src={circle_user_round} />
                            <div className={style.user_name_wrapper}>                                
                                <h1 className={style.user_header}>{userData.first_name} {userData.last_name}</h1>
                            </div>
                        </div>                        
                    )}

                     {company && (
                        <div className={style.user_details}>
                            <img src={briefcase} />
                            <div className={style.user_name_wrapper}>                                
                                <h1 className={style.user_header}>{userData.company_name}</h1>
                            </div>
                        </div>
                    )}

                    {student && (
                        <div>
                            <div className={style.role_details}>
                                <img src={briefcase} />
                                <p className={style.user_role}>{userData.occupation}</p>
                            </div>
                        </div>
                        )}

                     {company && (
                        <div>
                            <div className={style.role_details}>
                                <div className={style.usher}>
                                    <img src={userSml} />
                                    <p className={style.user_role}>{userData.first_name} {userData.last_name}</p>
                                </div>
                                <div className={style.usher}>
                                    <img src={locationBlack} />
                                    <p className={style.user_role}>Gothenburg</p>
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
                                {student ? 'About me' : student === false ? 'About us' : null}
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
                      
                            {userData && showAbout && <About userData={userData}/>}           
                            {userData&& showContact && <Contact userData={userData} />}
                            {showQRCode && <QR_Code  firstName={userData.first_name} lastName={userData.last_name} phone={userData.phone_number} email={userData.email}/>}
                    </div>

                </div>
        </>
    );
}
/*
    
*/
export default Card