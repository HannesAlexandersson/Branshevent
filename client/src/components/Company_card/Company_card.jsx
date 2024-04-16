import { useState } from 'react';
import { Company_about, Company_contact, QR_Code } from '../index.js';
import { briefcase, locationBlack, userSml } from '../../assets/Icons';

import style from './company_card.module.css';

function Company_card({ userData, img, }){
    
    const [showCompanyAbout, setShowCompanyAbout] = useState(true); 
    const [showCompanyContact, setShowCompanyContact] = useState(false); 
    const [showQRCode, setShowQRCode] = useState(false);
    
   
     // Function to toggle between displaying the submenus
     const handleButtonClick = (component) => {
        if (component === 'About') {
            
            setShowCompanyAbout(true);
            setShowCompanyContact(false)
            setShowQRCode(false);
        } else if (component === 'Contact') {
            setShowCompanyAbout(false);
            setShowCompanyContact(true)
            setShowQRCode(false);
        } else if (component === 'QRCode') {
            setShowCompanyAbout(false);
            setShowCompanyContact(false)
            setShowQRCode(true);
        }
    };
   

    return(
        <>
            <div className={style.redBox}>
                    <div className={style.img_container}>
                        <div className={style.img_display_area}>
                            <img src={img} />
                        </div>
                    </div>
                   
                        
                    <div className={style.user_account}>

                  

                  
                    <div className={style.user_details}>
                        <img src={briefcase} />
                        <div className={style.user_name_wrapper}>                                
                            <h1 className={style.user_header}>{userData.company_name}</h1>
                        </div>
                    </div>
                   

                   

                    
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
                     

                    </div>

                    <div className={style.details_submenu}>

                        <div className={style.menu_btns}>
                            <button
                                className={`${style.info_btn} ${showCompanyAbout ? style.selected : ''}`}
                                onClick={() => {
                                    setShowCompanyAbout(true);
                                    setShowCompanyContact(false);
                                    setShowQRCode(false);
                                }}
                            >
                               About us
                            </button>

                            <button
                                className={`${style.profile_preview_btn} ${showCompanyContact ? style.selected : ''}`}
                                onClick={() => {
                                    setShowCompanyAbout(false);
                                    setShowCompanyContact(true);
                                    setShowQRCode(false);
                                }}
                            >
                                Contact
                            </button>

                            <button
                                className={`${style.profile_preview_btn} ${showQRCode ? style.selected : ''}`}
                                onClick={() => {
                                    setShowCompanyAbout(false);
                                    setShowCompanyContact(false);
                                    setShowQRCode(true);
                                }}
                            >
                                QR code
                            </button>
                        </div>
                            
                            {showCompanyAbout && <Company_about userData={userData}/>}           
                            {showCompanyContact && <Company_contact userData={userData} />}
                            {showQRCode && <QR_Code  firstName={userData.first_name} lastName={userData.last_name} phone={userData.phone_number} email={userData.email}/>}
                    </div>

                </div>
        </>
    );
}

export default Company_card