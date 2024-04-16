import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progressbar, Red_btn, Spacer_bottom, White_btn,SendDataToServer } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import tagsArray from '../../tagArray.js';
import * as avatarsc from '../../assets/company_default_avatars/index';
import { Nav } from '../index.js';
import style from './company_summary.module.css';
import { register } from '../../apiFunctions/user';

function getBase64FromImage(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function Company_summary(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(6);
    const totalSteps = 7;
    const [img, setImg] = useState(null);
    let applicationStartdate;
    let applicationEnddate;
    const hasDates = applicationStartdate && applicationEnddate;

    let  companyParsed;
    let companyUsername; 
    let companyPassword; 
    let companyFormData; 
    let companyAddress;
    let compOnlineProfiles; 
    let companyTags;
    let companyStartDate
    let companyEndDate;
    let companyLocation; 
    let compAddress
    let companyDescription;
    let compWebsite;
    let compLinkedin;   
    let companyLIA;
    let compGdpr;
    let companyImage;
    let storedDate;
    let storedEnd;
    let binaryData;

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
        compAddress = sessionStorage.getItem('companyAddress');
    } else {
        compAddress = 'not set';
    }
//we need to extract the weburls
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
    if (sessionStorage.getItem('open_for_lia') !== null) {
        companyLIA = sessionStorage.getItem('open_for_lia');
    } else {
        companyLIA = 'not set';
    }
    if (sessionStorage.getItem('companyAddress') !== null) {
        companyAddress = sessionStorage.getItem('companyAddress');
    } else {
        companyAddress = 'not set';
    }

    if (sessionStorage.getItem('gdprChecked') !== null) {       
       compGdpr = true;
    } else {
        compGdpr = 'not set';
    }

    if (localStorage.getItem('image') !== null) {
        companyImage = localStorage.getItem('image');
    } else {
        const company_avatars = Object.values(avatarsc);
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        const randomAvatar = company_avatars[randomIndex];       
        companyImage = getBase64FromImage(randomAvatar);
        
    }

    if (sessionStorage.getItem('startDate') !== null) {
       
        storedDate = sessionStorage.getItem('startDate');
        companyStartDate = new Date(storedDate);
         
    } else {
        companyStartDate = 'not set';
    }

    if (sessionStorage.getItem('endDate') !== null) {
        storedEnd = sessionStorage.getItem('endDate');
        companyEndDate = new Date(storedEnd);
    } else {
        companyEndDate = 'not set';
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

    //handle useruploaded image to server: 
    if( companyImage !== null){
        const imageData = companyImage;

        
        //decode the user provided image, if there is a error set the var to a emoty string. 
        try {
            const base64Parts = imageData.split(",");  
            binaryData = atob(base64Parts[1]); 
                
        } catch (error) {
            binaryData = 'empty';        
            console.error('Error decoding base64 string:', error);
        }
    
    }


    const endpoint = 'api/company/registration';
    const requestData = {
        company_name: companyFormData.companyName,
        first_name: companyFormData.firstName,	
        last_name: companyFormData.lastName,	
        phone_number: companyFormData.phoneNumber,	
        email: companyFormData.email,
        password: companyPassword,
        tags: formattedTags,	
        open_for_lia: companyLIA,
        app_start: companyStartDate,
        app_end: companyEndDate,
        work_place: companyLocation,
        address: companyAddress,
        description: companyDescription,	
        company_website: compOnlineProfiles.CompanyWebsite,
        linkedin: compOnlineProfiles.LinkedIn,
        gdpr: compGdpr,
        avatar: binaryData,
    };
    register(requestData, 'company');
    
    if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
    }
    sessionStorage.setItem('loggedin', true);
    navigate('/company-finish');
   } 


   useEffect(() => { 
    if(companyImage === null){
        const company_avatars = Object.values(avatarsc);
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        const randomAvatar = company_avatars[randomIndex];
        setImg(randomAvatar);
    }else{
        setImg(companyImage);
    }    
    
}, []); 



  
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
                                    {compOnlineProfiles.CompanyWebsite ? (
                                    <div className={style.profile_sack}>
                                        <p className={style.profiles_sack_child}>Website: {compOnlineProfiles.CompanyWebsite}</p>
                                    </div>
                                ):(
                                    <p>Website: Not set</p>
                                )}
                                {compOnlineProfiles.CompanyWebsite ? (
                                    <div className={style.profile_sack}>
                                        <p className={style.profiles_sack_child}>LinkedIn: {compOnlineProfiles.LinkedIn}</p>
                                        </div>
                                ):(
                                    <p>LinkedIn: Not set</p>
                                )}
                               
                                </div>
                            </div>

                            <div className={style.comp_name}>
                                <h2>Image attached</h2>
                                <div className={style.image_wrapper}>
                                    {companyImage ? (
                                        <img src={companyImage} alt="user uploaded image" className={style.user_image}/>
                                    ) : (
                                        <img src={img} alt="default company avatar" className={style.user_image}/>
                                    )}
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