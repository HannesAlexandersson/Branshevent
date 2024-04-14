import { useState, useEffect } from 'react';
import { About, Contact, QR_Code, Card, get_a_company } from '../index.js';

import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview({ userData }){
    const [preView, setPreView] = useState({});

    useEffect(() => {
        if (userData) {
            const parsedData = JSON.parse(userData);
          
            setPreView(parsedData);
        }
    
    }, [userData]);
    let userRole;
    if (preView && preView.company_name !== undefined){
        userRole = 'company';
    }else{
        userRole = 'student';
    } 
    let company;
    let student;
    if(userRole === 'company'){
        company = preView;
    }else if(userRole === 'student'){
        student = preView;
    }
   /*  console.log(student); */
     
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