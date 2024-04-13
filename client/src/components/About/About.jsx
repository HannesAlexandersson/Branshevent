import { useState, useEffect } from 'react';
import props from 'prop-types';
import { briefcase, wrench, laptop, calendarBlue } from '../../assets/Icons';
import style from './about.module.css';
import { Tags_name_from_server } from '../../components/index.js';
import get_company_tags from '../../components/Get-company-tags/Get_company_tags.jsx';
import tagsArray from '../../tagArray';
import get_student_tags from '../get-student-tags/get_student_tags.jsx';

function About( { userData } ){
    const [companyAbout, setCompanyAbout] = useState(null);
    const [studentAbout, setStudentAbout] = useState(null);
    const [ tags, setTags ] = useState([]);

    //get the JTW token for server calls
    const token = localStorage.getItem('token');
    //initialize empty vars
    let company;
    let student;
    /* const userDataObj = JSON.parse(userData); */
    let userRole;
    if ('company_name' in userData) {
        userRole = 'company';
        company = userData;

        //useEffect hook to set the company data from the provided prop 
        useEffect(() => {
            if (company) {
                setCompanyAbout(company);
            }
        }, [company]);

        //and use another hook to get the selected tags from the db and set the response to the tags state
        useEffect(() => {
            if (company.id) { 
                get_company_tags(company.id, token)
                    .then(data => setTags(data))
                    .catch(error => console.error('Error fetching company tags:', error));
            }
        }, [company.id]);


         //if there is any error we present a loading decoy instead of a crash
        if (!companyAbout) {
            return <div>Loading...</div>;
        }
    
        

    }else{
        userRole = 'student';
        student = userData;

         //useEffect hook to set the student data from the provided prop 
         useEffect(() => {
            if (student) {
                setStudentAbout(student);
            }
        }, [student]);

        //and use another hook to get the selected tags from the db and set the response to the tags state
        useEffect(() => {
            if (student.id) { 
                get_student_tags(student.id, token)
                    .then(data => setTags(data))
                    .catch(error => console.error('Error fetching company tags:', error));
            }
        }, [student.id]);

         //if there is any error we present a loading decoy instead of a crash
        if (!studentAbout) {
            return <div>Loading...</div>;
        }
    
        
    }


    /* console.log(`about studid ${student.id}`) */
    
    // we need to manually set the id to a var
    /* const companyId = compObj.id; */
   
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
                            <p className={style.work_subheader_txt}>We work with</p>
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
                                        <p className={style.dates}>
                                            <span>Startdate: {companyAbout.app_start}</span>
                                            <span>Enddate: {companyAbout.app_end}</span>
                                        </p>
                                    ) : (
                                        <p className={style.online_txt_value}>not set</p>
                                    )
                                ) : (
                                    studentAbout.app_start && studentAbout.app_end ? (
                                        <p className={style.dates}>
                                            <span>Startdate: {studentAbout.app_start}</span>
                                            <span>Enddate: {studentAbout.app_end}</span>
                                        </p>
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