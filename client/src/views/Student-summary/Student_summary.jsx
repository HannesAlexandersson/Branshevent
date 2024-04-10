import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progressbar, Red_btn, Spacer_bottom, White_btn } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Nav } from '../index.js';
import style from './student_summary.module.css';




function Student_summary(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(6);
    const totalSteps = 7;

    const studentData = [];

    let studentDescription;
    let studentUsername;
    let studentOrientation;
    let studentOnlineProfiles;
    let studentTags;
    let studentLocation;
    let studentPassword;
    let studentImage;
    let studentFormData;
    if( sessionStorage.getItem('studentData') !== null){
    studentFormData = JSON.parse(sessionStorage.getItem('studentData'));
    }else {
        studentFormData = {
            firstName: 'not set',
            lastName: 'not set',
            email: 'not set',
            phoneNumber: 'not set',
        }
    }

    let liaStartdate = sessionStorage.getItem("startDate");
    let liaEnddate = sessionStorage.getItem("endDate");    
    const hasDates = liaStartdate && liaEnddate;

   
    if (sessionStorage.getItem('studentDescription') !== null) {
        studentDescription = sessionStorage.getItem('studentDescription');
    }else{
        studentDescription = 'not set';
    }
    
    if (sessionStorage.getItem('username') !== null) {
        studentUsername = sessionStorage.getItem('username');
    }else{
        studentUsername = 'not set';
    }
    
    if (sessionStorage.getItem('occupation') !== null) {
        studentOrientation = sessionStorage.getItem('occupation');
    }else {
        studentOrientation = 'not set';
    }
    
    if (sessionStorage.getItem('onlineProfiles') !== null) {
        studentOnlineProfiles = JSON.parse(sessionStorage.getItem('onlineProfiles'));
    }else {
        studentOnlineProfiles = {profile: 'not set'};
    }
    
    if (sessionStorage.getItem('selectedTags') !== null) {
        studentTags = JSON.parse(sessionStorage.getItem('selectedTags'));
    }else {
        studentTags = {tag: 'not set'};
    }
    
    if (sessionStorage.getItem('selectedLocation') !== null) {
        studentLocation = sessionStorage.getItem('selectedLocation');
    }else {
        studentLocation = 'not set';
    }
    
    if (sessionStorage.getItem('password') !== null) {
        studentPassword = sessionStorage.getItem('password');
    }else {
        studentPassword = 'not set';
    }
    
    if (localStorage.getItem('image') !== null) {
        studentImage = localStorage.getItem('image');
    }else {
        studentImage = 'not set';
    }
   
   const handleNextStep = () => {
    const studentData = [
        studentFormData,
        { orientation: studentOrientation },
        { onlineProfiles: studentOnlineProfiles },
        { studentDescription },
        { liaStartdate },
        { liaEnddate },        
        studentTags,
        { studentLocation },
        { username: studentUsername },
        { password: studentPassword },
        { image: studentImage },
    ];

    sessionStorage.setItem('studentData', JSON.stringify(studentData));
     
    if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
    }
    navigate('/student-finish');
   } 
  
    return(
        <>
            <div className={style.main}>

            <Nav />

                    <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                    <div className={style.review_title}>
                        <h2>Review and confirm student information</h2>
                    </div>

                <div className={style.large_device_container}>

                    <div className={style.container}>
                        


                        <div className={style.red_ball}>
                            1
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>Profession</h2>
                                {studentOrientation ? <h3>{studentOrientation}</h3> : <h3>Not registred</h3>}
                            </div>
                            <div className={style.comp_name}>
                                <h2>First name</h2>
                                {studentFormData.firstName ? <h3>{studentFormData.firstName}</h3> : <h3>Not registred</h3>}
                            </div>
                            <div className={style.comp_name}>
                                <h2>Last name</h2>
                                {studentFormData.lastName ? <h3>{studentFormData.lastName}</h3> : <h3>Not registred</h3>}
                            </div>
                            <div className={style.comp_name}>
                                <h2>Email (and sign in username)</h2>
                                {studentFormData.email ? <h3>{studentFormData.email}</h3> : <h3>Not registred</h3>}
                            </div>
                            <div className={style.comp_name}>
                                <h2>Phone number</h2>
                                {studentFormData.phoneNumber ?  <h3>{studentFormData.phoneNumber}</h3> : <h3>Not registred</h3>}                               
                            </div>
                            
                        </div>
                        



                    </div>

                    <div className={style.container}>
                        <div className={style.red_ball}>
                            2
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>This is me</h2>
                                <h3 className={style.descr_box}>{studentDescription ? studentDescription : 'Not registred'}</h3>
                            </div>

                            
                            <div className={style.comp_name}>
                                <h2>Application Dates</h2>
                                {hasDates ? (<h3>Start: {liaStartdate} End: {liaEnddate}</h3>) : (<h3>I don&apos;t know when my LIA is</h3>)}                            
                            </div>


                            <div className={style.comp_name}>
                                <h2>Online profile</h2>
                                <div className={style.profile_container}>
                                    {studentOnlineProfiles ? (Object.keys(studentOnlineProfiles).map((platform, index) => (
                                        <div key={index} className={style.profile_sack}>
                                            <p className={style.profiles_sack_child}>{platform}: {studentOnlineProfiles[platform] !== "" ? <p className={style.profiles_sack_child}>{studentOnlineProfiles[platform]}</p> : "Not provided"}</p>
                                        </div>
                                                ))
                                            ) : (
                                                <p>Not set</p>
                                            )}
                                </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Image attached</h2>
                                <div className={style.image_wrapper}>
                                    <img src={studentImage} alt="user uploaded image" className={style.user_image}/>
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
                                <h2>How do I want to work?</h2>
                                <div className={style.tag_container}>
                                    {studentTags.tags ? (
                                        studentTags.tags.map((tag, index) => (
                                        <p key={index} className={style.tag}>{tag}</p>
                                        ))
                                    ) : (
                                        <p>Not set</p>
                                    )}
                                </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Where do I want to work?</h2>
                                {studentLocation ? <h3>{studentLocation}</h3> : <h3>Not registred</h3>}                                
                            </div>
                                                        
                        </div>
                    </div>
                </div>
                    <Spacer_bottom className={style.Spacer_bottom} />

                <div className={style.footer_buttons}>
                   <Link to="/student-work">
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

export default Student_summary