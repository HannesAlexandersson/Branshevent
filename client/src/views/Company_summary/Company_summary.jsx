import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progressbar, Red_btn, Spacer_bottom, White_btn,SendDataToServer } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import tagsArray from '../../tagArray.js';

import { Nav } from '../index.js';
import style from './company_summary.module.css';

function Company_summary(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(6);
    const totalSteps = 7;
   
    let applicationStartdate;
    let applicationEnddate;
    const hasDates = applicationStartdate && applicationEnddate;

    let  companyParsed, 
    companyUsername, 
    companyPassword, 
    companyFormData, 
    companyDescription, 
    companyAddress, 
    compOnlineProfiles, 
    companyTags, 
    companyLocation, 
    companyImage;

    if (sessionStorage.getItem('username') !== null) {
        companyUsername = sessionStorage.getItem('username');
    } else {
        companyUsername = 'not set';
    }

    if (sessionStorage.getItem('password') !== null) {
        companyPassword = sessionStorage.getItem('password');
    } else {
        companyPassword = 'not set';
    }

    if (sessionStorage.getItem('companyData') !== null) {
        companyFormData = JSON.parse(sessionStorage.getItem('companyData'));
    } else {
        companyFormData = { data: 'not set'};
    }

    if (sessionStorage.getItem('companyDescription') !== null) {
        companyDescription = sessionStorage.getItem('companyDescription');
    } else {
        companyDescription = 'not set';
    }

    if (sessionStorage.getItem('companyAddress') !== null) {
        companyAddress = sessionStorage.getItem('companyAddress');
    } else {
        companyAddress = 'not set';
    }

    if (sessionStorage.getItem('onlineProfiles') !== null) {
        compOnlineProfiles = JSON.parse(sessionStorage.getItem('onlineProfiles'));
    } else {
        compOnlineProfiles = {profile: 'not set'};
    }

    if (sessionStorage.getItem('selectedTags') !== null) {
        companyTags = JSON.parse(sessionStorage.getItem('selectedTags'));
     
        companyParsed = sessionStorage.getItem('selectedTags');
    } else {
        companyTags = {tag: 'not set'};
    }

    if (sessionStorage.getItem('selectedLocation') !== null) {
        companyLocation = sessionStorage.getItem('selectedLocation');
    } else {
        companyLocation = 'not set';
    }

    if (localStorage.getItem('image') !== null) {
        companyImage = localStorage.getItem('image');
    } else {
        companyImage = 'not set';
    }

    const getSelectedTagIds = () => {
        // Filter the tagsArray to find tags that match the names in studentTags
        const selectedTagIds = tagsArray
            .filter(tag => companyParsed.includes(tag.name))
            .map(tag => tag.id);
    
        return selectedTagIds;
    };
  
    const tagIds = getSelectedTagIds(companyTags);
    
    let taagId = tagIds.join(',');
    const formattedTags = taagId.split(",").map(tag => parseInt(tag.trim()));
    console.log(formattedTags);

   const handleNextStep = () => {
    const endpoint = 'api/company/registration';
    const requestData = {
        company_name: companyFormData.companyName,
        first_name: companyFormData.firstName,	
        last_name: companyFormData.lastName,	
        password: companyPassword,
        email: companyFormData.email,
        phone_number: companyFormData.phoneNumber,	
        description: companyDescription,	
        tags: formattedTags	
    };
    SendDataToServer(requestData, endpoint)

    
     
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

                    <div className={style.review_title}>
                        <h2>Review and confirm company information</h2>
                    </div>

                <div className={style.page_wrapper}>

                    <div className={style.container}>
                        


                        <div className={style.red_ball}>
                            1
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>Company name</h2>
                                <h3>{companyFormData.companyName ? companyFormData.companyName : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>First name</h2>
                                <h3>{companyFormData.firstName ? companyFormData.firstName : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Last name</h2>
                                <h3>{companyFormData.lastName ? companyFormData.lastName : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Email (and sign in username)</h2>
                                <h3>{companyFormData.email ? companyFormData.email : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Phone number</h2>
                                <h3>{companyFormData.phoneNumber ? companyFormData.phoneNumber : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Address</h2>
                                <h3>{companyAddress ? companyAddress : 'Not registred'}</h3>
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
                                <h3 className={style.descr_box}>{companyDescription ? companyDescription : 'Not registred'}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Application Dates</h2>
                                {hasDates ? <h3>Start: {applicationStartdate} End: {applicationEnddate}</h3> : <h3>Not registred</h3>}
                            </div>

                            <div className={style.comp_name}>
                                <h2>Online profile</h2>
                                <div className={style.profile_container}>
                                {compOnlineProfiles ? (Object.keys(compOnlineProfiles).map((platform, index) => (                                    
                                    <div key={index} className={style.profile_sack}>
                                        <p className={style.profiles_sack_child}>{platform}: {compOnlineProfiles[platform] !== "" ? <p className={style.profiles_sack_child}>{compOnlineProfiles[platform]}</p> : "Not provided"}</p>
                                    </div>    
                                        ))
                                    ) : ( <p>Not set</p>  )}
                                </div>
                            </div>

                            <div className={style.comp_name}>
                                <h2>Image attached</h2>
                                <div className={style.image_wrapper}>
                                    <img src={companyImage} alt="user uploaded image" className={style.user_image}/>
                                </div>
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
                                    {companyTags.tags ? (
                                        companyTags.tags.map((tag, index) => (
                                        <p key={index} className={style.tag}>{tag}</p>
                                        ))
                                    ) : (
                                        <p>Not set</p>
                                    )}
                                </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Where do we work?</h2>
                                {companyLocation ? <h3>{companyLocation}</h3> : <h3>Not registred</h3>}
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                    <Spacer_bottom />

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