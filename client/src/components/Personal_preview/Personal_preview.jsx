import { useState } from 'react';
import { About, Contact, QR_Code, Card } from '../index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview(){
   sessionStorage.setItem('userRole', 'student');
    const userRole = sessionStorage.getItem('userRole');
    sessionStorage.setItem('firstname', 'Hannes');
    sessionStorage.setItem('lastName', 'Hansson');
    sessionStorage.setItem('compName', 'Gyllene Björnen');

    const firstName = sessionStorage.getItem('firstname');
    const lastname = sessionStorage.getItem('lastName');
    const compname = sessionStorage.getItem('compName');    


   
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                <Card userRole={userRole} firstName={firstName} lastname={lastname} compname={compname} />

            </div>
        </>
    );
}

export default Personal_preview