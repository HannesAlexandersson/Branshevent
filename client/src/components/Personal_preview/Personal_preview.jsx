import { useState, useEffect } from 'react';
import { About, Contact, QR_Code, Card, get_a_company } from '../index.js';
import * as avatars from '../../assets/student_default_avatars/index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';

function Personal_preview({ userData }){
    const [img , setImg ] = useState(null);
    const [preView, setPreView] = useState({});


    

      //set the state of this pages state of the userdata to the userdata prop
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

        
        // select a avatar at random from all the student avatars
        const student_avatars = Object.values(avatars);
        const randomIndex = Math.floor(Math.random() * student_avatars.length);
        const randomAvatar = student_avatars[randomIndex];

        // Set image state with that random selected avatar
        setImg(randomAvatar);
       
    }
   
     
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                { /*{...(userRole === 'student' ? { student }  : { company })}  */}
                <Card 
                   {...(userRole === 'student' ? { student, img: img } : { company })}
                />
            </div>
        </>
    );
}

export default Personal_preview