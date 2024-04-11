import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav } from '../index.js';
import { Card, QR_Code, White_btn, About, Contact } from '../../components/index.js';
import style from './view_company.module.css';
import { backArrow, briefcase, circle_user_round, } from '../../assets/Icons';
import { account, accountBlack } from '../../assets/Icons/dropdownicons/index.js';

function View_company(){
    const [showAbout, setShowAbout] = useState(true); 
    const [showContact, setShowContact] = useState(false); 
    

     // Function to toggle between displaying the submenus
     const handleButtonClick = (component) => {
        if (component === 'About') {
            
            setShowAbout(true);
            setShowContact(false)
          
        } else if (component === 'Contact') {
            setShowAbout(false);
            setShowContact(true)
           
        }
    };






    const company = sessionStorage.getItem('companyData');//get the company data from db instead, when endpoints are a thing
    const img = localStorage.getItem('image');
    const companyName = sessionStorage.getItem('compName');
    const firstName = 'firstName lastname';
    const userRole = sessionStorage.getItem('userRole');
    

    return(
        <>
            <div className={style.main}>
                <Nav />

                <Card company={company} />

                <div className={style.footer_btns}>
                    <Link to="/home">
                        <White_btn>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </White_btn>
                    </Link>
                </div>

            </div>

            <div className={style.secondary}>
                <Nav />
                <div className={style.sec_page_container}>

                    <div className={style.sec_head_backbtn_container}>
                        <Link to="/home">
                            <img src={backArrow} />
                        </Link>
                    </div>

                    <div className={style.sec_center_container}>

                        <div className={style.sec_left_container}>

                            <div className={style.sec_img_container}>
                                <img src={img} />
                            </div>

                            <div className={style.sec_name_container}>
                                <img src={briefcase} />
                                <h5 className={style.sec_comp_name}>{companyName}</h5>
                            </div>
                            <div className={style.sec_name_container}>
                                <img src={accountBlack} />
                                <h6 className={style.sec_comp_name}>{firstName}</h6>
                            </div>

                            <div className={style.sec_share_prf_wrapper}>
                               <QR_Code />
                            </div>

                        </div>


                        <div className={style.sec_right_container}>
                            <div className={style.sec_padding_container}>

                            <div className={style.details_submenu}>

                                <div className={style.menu_btns}>
                                    <button
                                        className={`${style.info_btn} ${showAbout ? style.selected : ''}`}
                                        onClick={() => {
                                            setShowAbout(true);
                                            setShowContact(false);                                       
                                        }}
                                    >
                                        {userRole === 'student' ? 'About me' : 'About us'}
                                    </button>

                                    <button
                                        className={`${style.profile_preview_btn} ${showContact ? style.selected : ''}`}
                                        onClick={() => {
                                            setShowAbout(false);
                                            setShowContact(true);                                        
                                        }}
                                    >
                                        Contact
                                    </button>

                                
                                </div>
                                    
                                    {showAbout && <About />}           
                                    {showContact && <Contact />}
                                    
                                </div>

                            </div>
                        </div>

                    </div>
                    
                </div>

            </div>
        </>
    );
}

export default View_company