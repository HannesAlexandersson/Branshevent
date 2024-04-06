import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Progressbar, Red_btn, White_btn } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Nav } from '../index.js';
import style from './student_summary.module.css';

function Student_summary(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(6);
    const totalSteps = 7;

    const studentData = [];

    const studentFormData = JSON.parse(sessionStorage.getItem('studentData'));
    const studentDescription = sessionStorage.getItem('studentDescription');
    const studentUsername = sessionStorage.getItem('username');
   
    let liaStartdate = sessionStorage.getItem("startDate");
    let liaEnddate = sessionStorage.getItem("endDate");    
    const hasDates = liaStartdate && liaEnddate;
    
  
        
   
   const studentOrientation = sessionStorage.getItem('occupation');
   const studentOnlineProfiles = JSON.parse(sessionStorage.getItem('onlineProfiles'));
   const studentTags = JSON.parse(sessionStorage.getItem('selectedTags'));
   const studentLocation = sessionStorage.getItem('selectedLocation');
   const studentPassword = sessionStorage.getItem('password');

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

                    

                    <div className={style.container}>
                        <div className={style.review_title}>
                            <h2>Review and confirm student information</h2>
                        </div>


                        <div className={style.red_ball}>
                            1
                        </div>

                        <div className={style.num_one_text}>
                            <div className={style.comp_name}>
                                <h2>Profession</h2>
                                <h3>{studentOrientation}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>First name</h2>
                                <h3>{studentFormData.firstName}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Last name</h2>
                                <h3>{studentFormData.lastName}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Email (and sign in username)</h2>
                                <h3>{studentFormData.email}</h3>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Phone number</h2>
                                <h3>{studentFormData.phoneNumber}</h3>
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
                                <h3 className={style.descr_box}>{studentDescription}</h3>
                            </div>

                            
                            <div className={style.comp_name}>
                                <h2>Application Dates</h2>
                                {hasDates ? (<h3>Start: {liaStartdate} End: {liaEnddate}</h3>) : (<h3>I don&apos;t know when my LIA is</h3>)}                            
                            </div>


                            <div className={style.comp_name}>
                                <h2>Online profile</h2>
                                <div className={style.profile_container}>
                                    {studentOnlineProfiles.map((profile, index) => (
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
                                <h2>How do I want to work?</h2>
                            <div className={style.tag_container}>
                                {studentTags.tags.map((tag, index) => (
                                                <p key={index} className={style.tag}>{tag}</p>
                                            ))}
                            </div>
                            </div>
                            <div className={style.comp_name}>
                                <h2>Where do I want to work?</h2>
                                <h3>{studentLocation}</h3>
                            </div>
                                                        
                        </div>
                    </div>

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