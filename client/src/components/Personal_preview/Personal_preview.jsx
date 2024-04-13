import { useState } from 'react';
import { About, Contact, QR_Code, Card, get_a_company } from '../index.js';

import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview({ userData }){
   
    const userRole = sessionStorage.getItem('userType'); 
    let company;
    let student;
    if(userRole === 'company'){
        company = userData;
    }else if(userRole === 'student'){
        student = userData;
    }
     
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