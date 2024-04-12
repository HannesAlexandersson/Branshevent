import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Nav } from '../index.js';
import { Card, QR_Code, White_btn, About, Contact } from '../../components/index.js';
import * as avatarsc from '../../assets/company_default_avatars/index';
import style from './view_company.module.css';
import { backArrow, briefcase, circle_user_round, } from '../../assets/Icons';
import { account, accountBlack } from '../../assets/Icons/dropdownicons/index.js';

function View_company(){
    const [showAbout, setShowAbout] = useState(true); 
    const [showContact, setShowContact] = useState(false); 
    const [img, setImg] = useState(null);
  
    const locations = useLocation();
    const { companyId, companies } = locations.state;

    const company = companies.find(company => company.id === companyId);
    
    //if the user havent uploaded a image we use a default random avatar, but we dont want the avatar to re render. so 
    // we put it in a hook and with an empty dependencie array it only renders once, thus setting the img var only once
    useEffect(() => {
        // Get the random avatar image
        const company_avatars = Object.values(avatarsc);
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        const randomAvatar = company_avatars[randomIndex];

        // Set image state
        setImg(randomAvatar);
    }, []); 

  
    const companyName = company.company_name; 
    const firstName = company.first_name; 
    const lastName = company.last_name; 
    const phone = company.phone_number;
    const email = company.email;
    const description = company.description;
    const location = company.location;
    const startDate =  company.app_start; 
    const endDate = company.app_end; 
    const userData = sessionStorage.getItem('userData');
    const userRole = userData.userType;




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

     
   
    

    return(
        <>
            <div className={style.main}>
                <Nav />

                <Card company={company} firstName={firstName} lastname={lastName} email={email} phone={phone} img={img} />

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
                                    
                                    {showAbout && <About company={company}/>}           
                                    {showContact && <Contact company={company}/>}
                                    
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