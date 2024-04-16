import { useState, useEffect } from 'react';
import props from 'prop-types';
import { briefcase, wrench, laptop, calendarBlue } from '../../assets/Icons';
import style from './company_about.module.css';
import { Tags_name_from_server } from '../../components/index.js';
import get_company_tags from '../../components/Get-company-tags/Get_company_tags.jsx';
import tagsArray from '../../tagArray';

function Company_about( { userData } ){  
    const [companyAbout, setCompanyAbout] = useState({});    
    const [ tags, setTags ] = useState([]);


    //get the JTW token for server calls
    const token = localStorage.getItem('token');    
    
    useEffect(() => {
        if (userData) {
            setCompanyAbout(userData);
           
        }
    }, [userData]);
    
    if (companyAbout && companyAbout.id) {
       
        //hinder rerender of entire page due to the state resetting by only run the fetch call if tags is not set already
        if(tags === null){
        get_company_tags(companyAbout.id, token)
            .then(data => setTags(data))
            .catch(error => console.error('Error fetching company tags:', error));
        }
    }
      

        //if there is any error we present a loading decoy instead of a crash
    if (!companyAbout) {
        return <div>Loading...</div>;
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
    
  /*---------- */
    let formattedStartDate;
    let formattedEndDate;
    let app_start;
    let app_end;
  if(companyAbout.app_start && companyAbout.app_end){
    //initialize date variables
    let unformatedDateStart = new Date();
    let unformatedDateEnd = new Date();
  
    //if the userdata have date set format the dates
    if (companyAbout && companyAbout.app_start && companyAbout.app_end) {
        unformatedDateStart = new Date(companyAbout.app_start);
        unformatedDateEnd = new Date(companyAbout.app_end);
    }
    //formate the user dates to our desired display format(ie we take away the time and only display date)
    formattedStartDate = unformatedDateStart.toISOString().split('T')[0]; 
    formattedEndDate = unformatedDateEnd.toISOString().split('T')[0];
    //set the display variables to the formatted dates
    app_start = formattedStartDate;
    app_end = formattedEndDate;
    /**........... */
}else{
    app_start = 'not set';
    app_end = 'not set';
}
    


    return(
        <>
            <div className={style.about_container}>
                <textarea 
                className={style.user_aboutme}
                type="text"
                value={companyAbout.description}
                />                    
                
            </div>

            <div className={style.work_details_wrapper}>
                        <div className={style.work_subheader}>
                            <img src={wrench} />
                            {companyAbout.company_name === null ? (
                                <p className={style.work_subheader_txt}>I work with</p>
                            ) : (
                                <p className={style.work_subheader_txt}>We work with</p>
                            )}
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
                            {companyAbout.work_place ? companyAbout.work_place : 'not set' }
                        </label>
                        </div>
                    </div>

                    <div className={style.app_period_wrapper}>
                        <div className={style.sub}>
                            <img src={calendarBlue} />
                            <p className={style.loc_txt}>Application period</p>
                        </div>
                        <div className={style.app_period_display_container}>
                           
                               
                                    {app_start && app_end ? (
                                        <div className={style.dattes}>
                                        <p className={style.dates}>
                                            <span>Startdate: {app_start}</span>
                                            </p>
                                            <p className={style.dates}>
                                            <span>Enddate: {app_end}</span>
                                        </p>
                                        </div>
                                    ) : ( <p className={style.online_txt_value}>not set</p>  )}
                       
                        </div>
                    </div>

               
        </>
    );
}

export default Company_about