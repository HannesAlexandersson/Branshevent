import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progressbar, Red_btn, White_btn } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Nav } from '../index.js';
import style from './company_summary.module.css';

function Company_summary(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(6);
    const totalSteps = 7;
    const companyData = [];

    const companyUsername = sessionStorage.getItem('username');
    const companyPassword = sessionStorage.getItem('password');
    const companyFormData = JSON.parse(sessionStorage.getItem('companyData'));
    const companyDescription = sessionStorage.getItem('companyDescription');
    const companyAddress = sessionStorage.getItem('companyAddress');
    let applicationStartdate;
    let applicationEnddate;
   if(sessionStorage.getItem("startDate") !== null){
        applicationStartdate = sessionStorage.getItem("startDate");
   }else {
        applicationStartdate = 'No application date';
   }
   if(sessionStorage.getItem("endDate") !== null){
        applicationEnddate = sessionStorage.getItem("endDate");
   }else{
        applicationEnddate = 'No application end date';
   }
   const compOnlineProfiles = JSON.parse(sessionStorage.getItem('onlineProfiles'));
   const companyTags = JSON.parse(sessionStorage.getItem('selectedTags'));
   const companyLocation = sessionStorage.getItem('selectedLocation');

   const handleNextStep = () => {
    const companyData = [
        companyFormData,
        { onlineProfiles: compOnlineProfiles },
        { companyDescription },
        { applicationStartdate },
        { applicationEnddate },        
        companyTags,
        { companyLocation },
        { username: companyUsername },
        { password: companyPassword }, 
    ];

    sessionStorage.setItem('companyData', JSON.stringify(companyData));
     
    if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
    }
    navigate('/company-finish');
   } 
  
    return(
        <>
           
                <div className={style.main}>

                <Nav />

                    <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                    

                    <div className={style.container}>
                        <div className={style.review_title}>
                            <h2>Review and confirm company information</h2>
                        </div>


                        <div className={style.red_ball}>
                            1
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>Company name</h2>
                                <h3>{companyFormData.companyName}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>First name</h2>
                                <h3>{companyFormData.firstName}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Last name</h2>
                                <h3>{companyFormData.lastName}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Email (and sign in username)</h2>
                                <h3>{companyFormData.email}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Phone number</h2>
                                <h3>{companyFormData.phoneNumber}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Address</h2>
                                <h3>{companyAddress}</h3>
                            </div>
                        </div>
                    </div>

                    <div className={style.container}>
                        <div className={style.red_ball}>
                            2
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>This is us</h2>
                                <h3 className={style.descr_box}>{companyDescription}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Application Dates</h2>
                                <h3>Start: {applicationStartdate} End: {applicationEnddate}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Online profile</h2>
                                <div className={style.profile_container}>
                                    {compOnlineProfiles.map((profile, index) => (
                                            <p key={index}>{profile}</p>
                                        ))}
                                </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Image attached</h2>
                                <h3>image link.jpg</h3>
                            </div>
                        </div>
                    </div>

                    <div className={style.container_last}>
                        <div className={style.red_ball}>
                            3
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>How do we work?</h2>
                            <div className={style.tag_container}>
                                {companyTags.tags.map((tag, index) => (
                                                <p key={index} className={style.tag}>{tag}</p>
                                            ))}
                            </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Where do we work?</h2>
                                <h3>{companyLocation}</h3>
                            </div>
                            
                            
                        </div>
                    </div>

                <div className={style.footer_buttons}>
                   <Link to="/company-work">
                        <White_btn>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </White_btn> 
                    </Link>

                    
                        <Red_btn onClick={handleNextStep}>                        
                            <p>CONFIRM</p>
                            <img src={nextArrow} />
                        </Red_btn>
                    
                </div>
                </div>
        </>
    );
}

export default Company_summary