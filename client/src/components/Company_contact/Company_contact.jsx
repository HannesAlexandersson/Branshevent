import { useState, useEffect } from 'react';
import {phone, mail, globe, office} from '../../assets/Icons/index.js';
import style from './company_contact.module.css';
function Company_contact({ userData }){
    const [companyContact, setCompanyContact] = useState(null);
    

    //get the JTW token for server calls
    const token = localStorage.getItem('token');
    let company;
    let companywebsite = 'not set';
    let companyPhone = 'not set';
    let companylinkedin = 'not set';
    let companyAddress = 'not set';
    let companyemail = 'not set';

   
    
    company = userData;

        //useEffect hook to set the company data from the provided prop 
    useEffect(() => {
        if (company) {
            setCompanyContact(company);            
        }
    }, [company]);

    
   //set the vars
    if (companyContact) {
        companywebsite = companyContact.company_website || 'not set';
        companyPhone = companyContact.phone_number || 'not set';
        companyemail = companyContact.email || 'not set';
        companylinkedin = companyContact.linkedin || 'not set';
        companyAddress = companyContact.address || 'not set';
    }
  
    return(
        <>
            <div className={style.contact_wrapper}>
                <div className={style.online_container}>
                    

                    <div className={style.online_profile_display_wrap}>
                        <div className={style.onlin_header_wrap}>
                            <img src={globe} />
                            <p className={style.head_txt}>Online Profile</p>
                        </div>

                        <div className={style.box}>
                            <p className={style.online_txt_display}>Linkedin:</p>
                            {
                                companylinkedin ? (
                                    <p className={style.online_txt_value}>{companylinkedin}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                           }

                        </div>

                       
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Website:</p>
                            {companywebsite ? (<p className={style.online_txt_value}>{companywebsite}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                       

                       
                       
                        
                        

                    </div>


                    <div className={style.online_profile_display_wrap}>
                        <div className={style.onlin_header_wrap}>                        
                            <img src={mail} />
                            <p className={style.head_txt}>Email</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>

                        
                                {companyemail ? (
                                    <p className={style.online_txt_value}>{companyemail}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )}
                           

                        </div>
                    </div>

                    <div className={style.online_profile_display_wrap}>                        
                        <div className={style.onlin_header_wrap}>      
                            <img src={phone} />
                            <p className={style.head_txt}>Phonenumber</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>

                       
                                {companyPhone ? (
                                    <p className={style.online_txt_value}>{companyPhone}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )}
                           
                          


                        </div>                        
                    </div>

                   
                         <div className={style.online_profile_display_wrap}>                        
                            <div className={style.onlin_header_wrap}>      
                                <img src={office} />
                                <p className={style.head_txt}>Company Address</p>
                            </div>
                            <div className={style.online_profile_display_wrap}>
                                {companyAddress ? (<p className={style.online_txt_value}>{companyAddress}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                            </div>                        
                        </div>
                   
                </div>



                
            </div>
        </>
    );
}

export default Company_contact