import { useState, useEffect } from 'react';
import {phone, mail, globe, office} from '../../assets/Icons/index.js';
import style from './contact.module.css';
function Contact({ userData }){
    const [companyContact, setCompanyContact] = useState(null);
    const [studentContact, setStudentContact] = useState(null);

    //get the JTW token for server calls
    const token = localStorage.getItem('token');
    let company;
    let companywebsite = 'not set';
    let companyPhone = 'not set';
    let companylinkedin = 'not set';
    let companyAddress = 'not set';
    let companyemail = 'not set';

    let student;    
    let studentGithub;
    let studentPortfolio;
    let studentBehance;
    let studentlinkedin;
    let studentemail;
    let studentPhone;


    let userRole;
    if ('company_name' in userData) {
        userRole = 'company';
        company = userData;

         //useEffect hook to set the company data from the provided prop 
        useEffect(() => {
            if (company) {
                setCompanyContact(company);
            }
        }, [company]);
    }else{
        userRole = 'student';
        student = userData;

         //useEffect hook to set the company data from the provided prop 
         useEffect(() => {
            if (company) {
                setStudentContact(student);
            }
        }, [company]);
    }
    console.log(`contact compid ${company.id}`)
   
    if (companyContact) {
        companywebsite = companyContact.company_website || 'not set';
        companyPhone = companyContact.phone_number || 'not set';
        companyemail = companyContact.email || 'not set';
        companylinkedin = companyContact.linkedin || 'not set';
        companyAddress = companyContact.address || 'not set';
    }else if(studentContact){
        studentlinkedin = studentContact.linkedin || 'not set';
       studentGithub = studentContact.github || 'not set';
       studentPortfolio= studentContact.portfolio || 'not set';
       studentBehance = studentContact.behance || 'not set';
       studentPhone = studentContact.phone_number || 'not set';
       studentemail = studentContact.email || 'not set';
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
                            {userRole === 'company' ? (
                                companylinkedin ? (
                                    <p className={style.online_txt_value}>{companylinkedin}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            ) : (
                                studentlinkedin ? (
                                    <p className={style.online_txt_value}>{studentlinkedin}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            )}

                        </div>

                        {userRole === 'company' && (
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Website:</p>
                            {companywebsite ? (<p className={style.online_txt_value}>{companywebsite}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                        )}

                        {userRole === 'student' && (
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Github:</p>
                            {studentGithub ? (<p className={style.online_txt_value}>{studentGithub}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                        )}
                        {userRole === 'student' && (
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Portfolio:</p>
                            {studentPortfolio ? (<p className={style.online_txt_value}>{studentPortfolio}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                        )}
                         {userRole === 'student' && (
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Behance:</p>
                            {studentBehance ? (<p className={style.online_txt_value}>{studentBehance}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                        </div>
                        )}
                        

                    </div>


                    <div className={style.online_profile_display_wrap}>
                        <div className={style.onlin_header_wrap}>                        
                            <img src={mail} />
                            <p className={style.head_txt}>Email</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>

                        {userRole === 'company' ? (
                                companyemail ? (
                                    <p className={style.online_txt_value}>{companyemail}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            ) : (
                                studentemail ? (
                                    <p className={style.online_txt_value}>{studentemail}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            )}

                        </div>
                    </div>

                    <div className={style.online_profile_display_wrap}>                        
                        <div className={style.onlin_header_wrap}>      
                            <img src={phone} />
                            <p className={style.head_txt}>Phonenumber</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>

                        {userRole === 'company' ? (
                                companyPhone ? (
                                    <p className={style.online_txt_value}>{companyPhone}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            ) : (
                                studentPhone ? (
                                    <p className={style.online_txt_value}>{studentPhone}</p>
                                ) : (
                                    <p className={style.online_txt_value}>not set</p>
                                )
                            )}


                        </div>                        
                    </div>

                    {userRole === 'company' && (
                         <div className={style.online_profile_display_wrap}>                        
                            <div className={style.onlin_header_wrap}>      
                                <img src={office} />
                                <p className={style.head_txt}>Company Address</p>
                            </div>
                            <div className={style.online_profile_display_wrap}>
                                {companyAddress ? (<p className={style.online_txt_value}>{companyAddress}</p>) : (<p className={style.online_txt_value}>not set</p>)}
                            </div>                        
                        </div>
                    )}

                </div>



                
            </div>
        </>
    );
}

export default Contact