import { briefcase, wrench, laptop, calendarBlue } from '../../assets/Icons';
import style from './about.module.css';

function About(){

    return(
        <>
            <div className={style.about_container}>
                <textarea 
                className={style.user_aboutme}
                type="text"
                value="HERE IS THE USERS DESCRIPTION SECTION GONNA BE WHEN WE SORT OYT THE SERVER CLIENT COMUNICATION. FOR NOW ITS
                LOREM IPSUM DUMMY TEXT LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM LOREM IPSUM"
                />                    
                
            </div>

            <div className={style.work_details_wrapper}>
                        <div className={style.work_subheader}>
                            <img src={wrench} />
                            <p className={style.work_subheader_txt}>We work with</p>
                        </div>

                        <div className={style.tag_wrapper}>
                            {/* tags goes here */}
                        </div>

                    </div>

                    <div className={style.location_wrapper}>
                        <div className={style.sub}>
                            <img src={laptop} />
                            <p className={style.loc_txt}>WORKPLACE LOCATION</p>
                        </div>
                        <div className={style.chk_bx_wrap}>
                            <input 
                            type="checkbox"
                            disabled
                            name="location"
                            value="BOTH"
                            />
                            
                        </div>
                    </div>

                    <div className={style.app_period_wrapper}>
                        <div className={style.sub}>
                            <img src={calendarBlue} />
                            <p className={style.loc_txt}>Application period</p>
                        </div>
                        <div className={style.app_period_display_container}>
                            <p className={style.dates}><span>Startdate: </span><span>Enddate: </span></p>
                        </div>
                    </div>

               
        </>
    );
}

export default About