import { useState, useEffect } from 'react';
import props from 'prop-types';
import { briefcase, wrench, laptop, calendarBlue } from '../../assets/Icons';
import style from './about.module.css';
import { Tags_name_from_server, get_a_company } from '../../components/index.js';
import get_company_tags from '../../components/Get-company-tags/Get_company_tags.jsx';
import tagsArray from '../../tagArray';
import get_student_tags from '../get-student-tags/get_student_tags.jsx';
import get_a_student from '../../components/get_a_company/get_a_student.jsx';

function About( { userData } ){
    /* const [userDataObj, setUserDataObj] = useState({}); */
    const [companyAbout, setCompanyAbout] = useState(null);
    const [studentAbout, setStudentAbout] = useState(null);
    const [userDataObj, setUserDataObj] = useState(null);
    const [ tags, setTags ] = useState(null);


    //get the JTW token for server calls
    const token = localStorage.getItem('token');       
    const parts = token.split('.');    
    const payload = JSON.parse(atob(parts[1]));
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    // Extract the value (e.g., id)
    const id = payload.id;
    const userType = payload.userType;


    useEffect(() => {
        if (decodedToken.userType === 'student') {
            get_a_student(token, id)
                .then((rows) => {
                    setUserDataObj(rows);
                   
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                });
            }else if(decodedToken.userType === 'company'){
                get_a_company(token, id)
                .then((rows) => {
                    setUserDataObj(rows);
                   
                })
                .catch((error) => {
                    console.error('Error fetching company data:', error);
                });
            }else{
                console.log('error fetching userdata');
            }
        }, []);

    //initialize empty vars
    let company;
    let student;
    let startDate;
    let endDate;
    
    let userRole;
    useEffect(() => {
        
        if(userDataObj){
            if (userType === 'company'){               
                setCompanyAbout(userDataObj);
            }else if(userType === 'student'){               
                setStudentAbout(userDataObj);
                
            } 
        }
    }, [userDataObj, userType]);

    if (userType === 'company') {
        userRole = 'company';
        if(userDataObj){
            company = userDataObj;
           }
      

        
        if (id) { 
            if(tags === null){
            get_company_tags(id, token)
                .then(data => setTags(data))
                .catch(error => console.error('Error fetching company tags:', error));
            }
        }
        
      

         //if there is any error we present a loading decoy instead of a crash
        if (!companyAbout) {
            return <div>Loading...</div>;
        }
    
        startDate = new Date(companyAbout.app_start);
        endDate = new Date(companyAbout.app_end);
        

    }else{
        userRole = 'student';
      
      
       if(userDataObj){
        student = userDataObj;
       }
        
        if (id) { 
            console.log('hej');
            if(tags === null){
            get_student_tags(id, token)
                .then(data => setTags(data))
                .catch(error => console.error('Error fetching company tags:', error));
            }
        }
    

         //if there is any error we present a loading decoy instead of a crash
        if (!studentAbout) {
            return <div>Loading...</div>;
        }
       
        
        startDate = new Date(studentAbout.app_start);
        
        endDate = new Date(studentAbout.app_end);
        
    }
    
    
    //a reverse function to compare the tags id from the db to the tagsArray to get the names of the selected tags
    const getSelectedTagNames = (tagIds) => {
        // we need to filter the tagsArray to find tags that match the IDs in tagIds
        const selectedTagNames = tagsArray
            .filter(tag => tagIds.includes(tag.id))
            .map(tag => tag.name);
        
        return selectedTagNames;
    };
    
    
    const tagIdsFromServer = tags; 
    const selectedTagNames = getSelectedTagNames(tagIdsFromServer);
    
  

    
    // format the date strings to correct format before render
    const formattedStartDate = startDate.toISOString().split('T')[0]; 
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const app_start = formattedStartDate;
    const app_end = formattedEndDate;
    console.log(selectedTagNames, 'about student');

    return(
        <>
            <div className={style.about_container}>
                <textarea 
                className={style.user_aboutme}
                type="text"
                value={userRole === 'company' ? companyAbout.description : studentAbout.description}
                />                    
                
            </div>

            <div className={style.work_details_wrapper}>
                        <div className={style.work_subheader}>
                            <img src={wrench} />
                           {company ? (<p className={style.work_subheader_txt}>We work with</p>) : (<p className={style.work_subheader_txt}>  I work with</p>)}
                        </div>

                        <Tags_name_from_server selectedTagNames={selectedTagNames} />
                       
                           

                    </div>

                    <div className={style.location_wrapper}>
                        <div className={style.sub}>
                            <img src={laptop} />
                            <p className={style.loc_txt}>WORKPLACE LOCATION</p>
                        </div>
                        <div className={style.chk_bx_wrap}>
                        <label className={style.chk_label}>
                            <input 
                                type="checkbox"
                                checked
                                disabled
                                name="location"
                            />
                            {userRole === 'company' ? (companyAbout.work_place ? companyAbout.work_place : 'not set') : (studentAbout.work_place ? studentAbout.work_place : 'not set')}
                        </label>
                        </div>
                    </div>

                    <div className={style.app_period_wrapper}>
                        <div className={style.sub}>
                            <img src={calendarBlue} />
                            <p className={style.loc_txt}>Application period</p>
                        </div>
                        <div className={style.app_period_display_container}>
                           
                                {userRole === 'company' ? (
                                    companyAbout.app_start && companyAbout.app_end ? (
                                        <div className={style.dattes}>
                                        <p className={style.dates}>
                                            <span>Startdate: {app_start}</span>
                                            </p>
                                            <p className={style.dates}>
                                            <span>Enddate: {app_end}</span>
                                        </p>
                                        </div>
                                    ) : (
                                        <p className={style.online_txt_value}>not set</p>
                                    )
                                ) : (
                                    studentAbout.app_start && studentAbout.app_end ? (
                                        <div className={style.dattes}>
                                        <p className={style.dates}>
                                            <span>Startdate: {app_start}</span>
                                        </p>
                                        <p className={style.dates}>
                                            <span>Enddate: {app_end}</span>
                                        </p>
                                        </div>
                                    ) : (
                                        <p className={style.online_txt_value}>not set</p>
                                    )
                                )}

                        </div>
                    </div>

               
        </>
    );
}

export default About