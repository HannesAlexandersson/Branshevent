import { useState, useEffect } from 'react';
import { About, Contact, QR_Code, Card, get_a_company } from '../index.js';
import * as avatars from '../../assets/student_default_avatars/index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';
import get_a_student from '../get_a_company/get_a_student.jsx';

function Personal_preview( {userData} ){
    const [img , setImg ] = useState(null);
    const [company, setCompany] = useState({});
    const [student, setStudent] = useState({});
    const [userDataObj, setUserDataObj] = useState({});    
    
    const token = localStorage.getItem('token');           
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    
    const id = decodedToken.id;
    const userType = decodedToken.userType;
    
    let userRole; 
  
    
    //set the userole
    if(decodedToken.userType === 'student'){
        userRole = 'student';
    }else if(decodedToken.userType === 'company' ){
        userRole = 'company';
    }

    useEffect(() => {
        console.log('hej');
        if (decodedToken.userType === 'student') {
            get_a_student(token, id)
                .then((rows) => {
                    setUserDataObj(rows);
                   /*  console.log(rows.app_start, 'inside get a student PREVIEW'); */
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                });
            }else if(decodedToken.userType === 'company'){
                get_a_company(token, id)
                .then((rows) => {
                    setUserDataObj(rows);
                    /* console.log(JSON.stringify(rows), 'inside get a company PREVIEW'); */
                })
                .catch((error) => {
                    console.error('Error fetching company data:', error);
                });
            }else{
                console.log('error fetching userdata');
            }
        }, []);
    
          
   
    let randomAvatar;
    
    useEffect(() => {
        if(userDataObj){
            if (userType === 'company'){               
                setCompany(userDataObj);
               
            }else if(userType === 'student'){               
                setStudent(userDataObj);
                
            } 
        }
    }, [userDataObj, userType]);
    
        
    // select a avatar at random from all the student avatars
    const student_avatars = Object.values(avatars);
    const randomIndex = Math.floor(Math.random() * student_avatars.length);
    randomAvatar = student_avatars[randomIndex];
        

    useEffect(() => {
        if(randomAvatar){
        // Set image state with that random selected avatar
        setImg(randomAvatar);
        
        }

    }, [randomAvatar]);


    
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                
                <Card 
                   {...(userRole === 'student' ? { student, img: img } : { company })}
                />
            </div>
        </>
    );
}

export default Personal_preview