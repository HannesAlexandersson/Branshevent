
import style from './company_sum.module.css';

function Company_sum(){
    const companyFormData = JSON.parse(sessionStorage.getItem('companyData'));
    const companyDescription = sessionStorage.getItem('companyDescription');
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

    return(
        <>
            <form>
                <div className={style.review_title}>
                    <h2>Review and confirm company information</h2>
                </div>

                <div className={style.red_ball}>
                    1
                </div>

                <label htmlFor="company-name">Company name</label>
                <input className={style.comp_name} name="company-name" disabled >{companyFormData.companyName}</input>
                <label htmlFor="first-name">First name</label>
                <input className={style.comp_name} name="first-name" disabled >{companyFormData.firstName}</input>
                <label htmlFor="last-name">Last name</label>
                <input className={style.comp_name} name="last-name" disabled >{companyFormData.lastName}</input>
                <label htmlFor="user-name">Email (and sign-in username)</label>
                <input className={style.comp_name} name="user-name" disabled >{companyFormData.email}</input>
                <label htmlFor="phonenumber">Phone number</label>
                <input className={style.comp_name} name="phonenumber" disabled >{companyFormData.phoneNumber}</input>
            </form>

            <form>

                <div className={style.red_ball}>
                    2
                </div>

                <label htmlFor="description">This is us</label>
                <input className={style.description} name="description" disabled >{companyDescription}</input>
                <label htmlFor="application-dates">Application Dates</label>
                <input className={style.description} name="application-dates" disabled >start:{applicationStartdate} end: {applicationEnddate}</input>
                <div className={style.comp_name}>
                                <h2>Online profile</h2>
                                <div className={style.profile_container}>
                                    {compOnlineProfiles.map((profile, index) => (
                                            <p key={index}>{profile}</p>
                                        ))}
                                </div>
                            </div>
                <label htmlFor="images">Image attached</label>
                <input className={style.description} name="images" disabled >image link.jpg</input>
            </form>

            <form>

                <div className={style.red_ball}>
                    3
                </div>

                <div className={style.comp_name}>
                                <h2>How do we work?</h2>
                            <div className={style.tag_container}>
                                {companyTags.tags.map((tag, index) => (
                                                <p key={index} className={style.tag}>{tag}</p>
                                            ))}
                            </div>
                            </div>
                <label htmlFor="location">Where do we work?</label>
                <input className={style.description} name="location" disabled >{companyLocation}</input>
            </form>
        </>

    );
}

export default Company_sum