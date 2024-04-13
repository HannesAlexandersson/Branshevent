import { useState, useEffect } from 'react';
import props from 'prop-types';
import { briefcase, wrench, laptop, calendarBlue } from '../../assets/Icons';
import style from './about.module.css';
import { Tags_name_from_server } from '../../components/index.js';
import get_company_tags from '../../components/Get-company-tags/Get_company_tags.jsx';
import tagsArray from '../../tagArray';

function Preview( { company,  userRole } ){
    const [companyAbout, setCompanyAbout] = useState(null);
    const [ tags, setTags ] = useState([]);

    //get the JTW token for server calls
    const token = localStorage.getItem('token');
    //useEffect hook to set the company data from the provided prop 
    useEffect(() => {
        if (company) {
            setCompanyAbout(company);
        }
    }, [company]);

    // we need to manually set the id to a var
    const companyId = company.id;
    //and use another hook to get the selected hooks from the db and set the response to the tags state
    useEffect(() => {
        if (companyId) { 
            get_company_tags(companyId, token)
                .then(data => setTags(data))
                .catch(error => console.error('Error fetching company tags:', error));
        }
    }, [companyId]);

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
    
    //if there is any error we present a loading decoy instead of a crash
    if (!companyAbout) {
        return <div>Loading...</div>;
    }
    
    //set all the vars
    const { company_name: companyName, first_name: firstName, last_name: lastName, description, location, app_start: startDate, app_end: endDate } = companyAbout;
    
    

    return(
        <>
            <div className={style.about_container}>
                <textarea 
                className={style.user_aboutme}
                type="text"
                value={description}
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
                            {location ? location : 'not set'}
                        </label>
                        </div>
                    </div>

                    <div className={style.app_period_wrapper}>
                        <div className={style.sub}>
                            <img src={calendarBlue} />
                            <p className={style.loc_txt}>Application period</p>
                        </div>
                        <div className={style.app_period_display_container}>
                            {startDate&&endDate ? (<p className={style.dates}><span>Startdate:{startDate} </span><span>Enddate: {endDate}</span></p>)
                            :
                            (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                    </div>

               
        </>
    );
}

export default Preview