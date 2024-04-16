import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Nav } from '../index.js';
import { Company_card, QR_Code, White_btn, Company_about, Company_contact, Spacer_bottom } from '../../components/index.js';
import * as avatarsc from '../../assets/company_default_avatars/index';
import style from './view_company.module.css';
import { backArrow, briefcase } from '../../assets/Icons';
import {  accountBlack } from '../../assets/Icons/dropdownicons/index.js';
import Get_avatars from '../../components/get_student_avatar/Get_avatars.jsx';

function View_company(){
    const [showCompanyAbout, setShowCompanyAbout] = useState(true); 
    const [showCompanyContact, setShowCompanyContact] = useState(false);    
    const [avatarDataObj, setAvatarDataObj] = useState(null);  
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const [img, setImg] = useState(null);

    //we get the token for db service
    const token = localStorage.getItem('token');
  
   //we provide the viewpage with the company id from home page and the list of all companies.
    const { state } = useLocation();
    const { companyId, companies } = state;
   
   

    // then we get the correct company from companies using the company id and compare to the companylist
    const company = companies.find(company => company.id === companyId);
    //then set a var to company, we use this "userData" in about and details view for the personal information so it needs to be the same format even tho its not "personal" this time  
    const userData = company;

    //we fetch the avatar if the company have one
    useEffect(() => {
        Promise.all([
            Get_avatars(companyId, token, 'companyAvatars/')
        ])
        .then(([avatarData]) => {
            setAvatarDataObj(avatarData);
            setAvatarLoaded(true);
        })
        .catch((error) => {
            console.error('Error fetching company data:', error);
        });
    }, [companyId, token]);
    
    useEffect(() => {
        if (avatarLoaded) {
            
            if (avatarDataObj) { 
                console.log('hej blob');               
                const reader = new FileReader();
                reader.onload = function(event) {
                const base64Image = event.target.result;
                setImg(base64Image);
                };
                reader.readAsDataURL(avatarDataObj);
            } 
        }
            
        // No avatar image, set default image
        const company_avatars = Object.values(avatarsc);
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        const randomAvatar = company_avatars[randomIndex];
        setImg(randomAvatar);
        
    }, [avatarDataObj, avatarLoaded]);

    
    const companyName = company.company_name; 
    const firstName = company.first_name; 
    const lastName = company.last_name; 
    const phone = company.phone_number;
    const email = company.email;
    
    
    const userRole = sessionStorage.getItem('userType');




     // Function to toggle between displaying the submenus
     const handleButtonClick = (component) => {
        if (component === 'About') {
            
            setShowCompanyAbout(true);
            setShowCompanyContact(false)
          
        } else if (component === 'Contact') {
            setShowCompanyAbout(false);
            setShowCompanyContact(true)
           
        }
    };

     
   
    

    return(
        <>
            <div className={style.main}>
                <Nav />

                <Company_card userData={userData} img={img} />

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
                                <h6 className={style.sec_comp_name}>{firstName} {lastName}</h6>
                            </div>

                            <div className={style.sec_share_prf_wrapper}>
                               <QR_Code firstName={firstName} lastName={lastName} phone={phone} email={email}/>
                            </div>

                        </div>


                        <div className={style.sec_right_container}>
                            <div className={style.sec_padding_container}>

                            <div className={style.details_submenu}>

                                <div className={style.menu_btns}>
                                    <button
                                        className={`${style.info_btn} ${showCompanyAbout ? style.selected : ''}`}
                                        onClick={() => {
                                            setShowCompanyAbout(true);
                                            setShowCompanyContact(false);                                       
                                        }}
                                    >
                                        {userRole === 'student' ? 'About me' : 'About us'}
                                    </button>

                                    <button
                                        className={`${style.profile_preview_btn} ${showCompanyContact ? style.selected : ''}`}
                                        onClick={() => {
                                            setShowCompanyAbout(false);
                                            setShowCompanyContact(true);                                        
                                        }}
                                    >
                                        Contact
                                    </button>

                                
                                </div>
                                    <div className={style.big_screen}>
                                        {showCompanyAbout && <Company_about userData={userData}/>}           
                                        {showCompanyContact && <Company_contact userData={userData}/>}
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                    </div>
                    <Spacer_bottom />
                </div>

            </div>
        </>
    );
}

export default View_company