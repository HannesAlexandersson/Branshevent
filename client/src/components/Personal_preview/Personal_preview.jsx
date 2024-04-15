import { useState, useEffect } from 'react';
import { About, Contact, QR_Code, Card, get_a_company, Get_avatars } from '../index.js';
import * as avatars from '../../assets/student_default_avatars/index.js';
import * as avatarsc from '../../assets/company_default_avatars/index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';
import get_a_student from '../get_a_company/get_a_student.jsx';

function Personal_preview( {userData} ){
    const [img , setImg ] = useState(null);
    const [company, setCompany] = useState({});
    const [student, setStudent] = useState({});
    const [userDataObj, setUserDataObj] = useState({});  
    const [avatarDataObj, setAvatarDataObj] = useState(null);  
    
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
// company/companyAvatars, student/studentAvatars
//NEW REMOVE IF DONT WORK AND USE OLD
    useEffect(() => {        
        if (decodedToken.userType === 'student') {
          Promise.all([
            get_a_student(token, id),
            Get_avatars(id, token, 'studentAvatars/'),
           
          ])
          .then(([userData, avatarData]) => {
            setUserDataObj(userData);
            setAvatarDataObj(avatarData);
            console.log( 'avatar??');
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
          });
        } else if (decodedToken.userType === 'company') {
          Promise.all([
            get_a_company(token, id),
            Get_avatars(id, token, 'companyAvatars/')
          ])
          .then(([userData, avatarData]) => {
            setUserDataObj(userData);
            setAvatarDataObj(avatarData);
            console.log( 'avatar??');
          })
          .catch((error) => {
            console.error('Error fetching company data:', error);
          });
        } else {
          console.log('error fetching userdata');
        }
      }, []);


   /*  THIS IS WORKIN SAVE IF NEW DONT WORK
     useEffect(() => {
        console.log('hej');
        if (decodedToken.userType === 'student') {
            get_a_student(token, id)
                .then((rows) => {
                    setUserDataObj(rows);                                      
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                });
            }else if(decodedToken.userType === 'company'){
                get_a_company(token, id)
                .then((rows) => {
                    setUserDataObj(rows);                    
                })
                .catch((error) => {
                    console.error('Error fetching company data:', error);
                });
            }else{
                console.log('error fetching userdata');
            }
        }, []); */
    
          
   
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
    
       //if there is no user image we supply the user with a default avatar
    if(avatarDataObj === null){   
       if (userRole === 'student'){     
            // select a avatar at random from all the student avatars
            const student_avatars = Object.values(avatars);
            const randomIndex = Math.floor(Math.random() * student_avatars.length);
            randomAvatar = student_avatars[randomIndex];
       }else if(userRole === 'company'){
            const company_avatars = Object.values(avatarsc);
            const randomIndex = Math.floor(Math.random() * company_avatars.length);
            randomAvatar = company_avatars[randomIndex];
       }
    }        
    console.log(avatarDataObj, 'avatarobj');
    useEffect(() => {
        if (randomAvatar) {
            // Set image state with that random selected avatar, if randomAvatar is set, 
            // that means the user didn't upload an image
            setImg(randomAvatar);  
            console.log(randomAvatar, 'randomav');      
        } else {
            // Else, it means the user has an image. Decode the binary image data to base64
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                // Set the img state to the base64 image string
                setImg(base64Image);
            };
            // Read the Blob data as a data URL (base64)
            reader.readAsDataURL(avatarDataObj);
        }
    }, [randomAvatar, avatarDataObj]);

    
    return(
        <>
            <div className={style.user_preview}>
                <p className={style.sub_header}>Here you can see what your account looks like to others.</p>

                
                <Card 
                   {...(userRole === 'student' ? { student, img: img } : { company, img: img })}
                />
            </div>
        </>
    );
}

export default Personal_preview