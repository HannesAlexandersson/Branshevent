import { useState } from 'react';
import { About, Contact, QR_Code, Card, get_a_company } from '../index.js';

import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview({ userData }){
   

    let userDataObj = JSON.parse(userData);
    let userRole;
    if ('company_name' in userDataObj) {
        userRole = 'company';
    }else{
        userRole = 'student';
    } 
    let company;
    let student;
    if(userRole === 'company'){
        company = userDataObj;
    }else if(userRole === 'student'){
        student = userDataObj;
    }
    /* console.log(userDataObj); */
     
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                {/* <Card userRole={userRole} firstName={userData.first_name} lastname={userData.last_name} compname={userData.company_name} /> */}
                <Card 
                    {...(userRole === 'student' ? { student } : { company })}
                />
            </div>
        </>
    );
}

export default Personal_preview