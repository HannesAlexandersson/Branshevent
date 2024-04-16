import { useState, useEffect } from 'react';
import { About, Contact, QR_Code, Card, get_a_company, Get_avatars } from '../index.js';
import * as avatars from '../../assets/student_default_avatars/index.js';
import * as avatarsc from '../../assets/company_default_avatars/index.js';
import { briefcase, wrench, laptop, calendarBlue, circle_user_round, locationBlack, userSml } from '../../assets/Icons';
import { account } from '../../assets/Icons/dropdownicons';
import style from './personal_preview.module.css';
import get_a_student from '../get_a_company/get_a_student.jsx';

function Personal_preview(){
    const [img , setImg ] = useState(null);
    const [company, setCompany] = useState({});
    const [student, setStudent] = useState({});
    const [userDataObj, setUserDataObj] = useState({});  //this was {}
    const [avatarDataObj, setAvatarDataObj] = useState(null);  
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    
    const token = localStorage.getItem('token');           
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    
    const id = decodedToken.id;
    const userType = decodedToken.userType;
    
    let userRole; 
    let randomAvatar;
    
    
    //set the userole
    if(decodedToken.userType === 'student'){
        userRole = 'student';
    }else if(decodedToken.userType === 'company' ){
        userRole = 'company';
    }

//we fetch the users data and their avatar

    useEffect(() => {      
        if (decodedToken.userType === 'student') {
          Promise.all([           
            Get_avatars(id, token, 'studentAvatars/'),                    
          ])
          .then(([avatarData]) => {           
            setAvatarDataObj(avatarData);
            setAvatarLoaded(true);
          })
          .catch((error) => {
            console.error('Error fetching student avatar:', error);
          });
        } else if (decodedToken.userType === 'company') {             
          Promise.all([                               
            Get_avatars(id, token, 'companyAvatars/'),           
          ])
          .then(([avatarData]) => {          
            setAvatarDataObj(avatarData);     
            setAvatarLoaded(true);                  
          })
          .catch((error) => {
            console.error('Error fetching company avatar:', error);
          });
        }
      }, []);

      useEffect(() => { 
        if (decodedToken.userType === 'student') {
          Promise.all([
            get_a_student(token, id),                               
          ])
          .then(([userData]) => {
            setUserDataObj(userData);           
          })
          .catch((error) => {
            console.error('Error fetching student data:', error);
          });
        } else if (decodedToken.userType === 'company') {             
          Promise.all([
            get_a_company(token, id),                        
          ])
          .then(([userData]) => {           
            setUserDataObj(userData);             
          })
          .catch((error) => {
            console.error('Error fetching company data:', error);
          });
        }
      }, []);
      
      //set the fetched data to the state of either company or student depending on userrole
      useEffect(() => {
        if(userDataObj){          
            if (userType === 'company'){               
                setCompany(userDataObj);
               
            }else if(userType === 'student'){               
                setStudent(userDataObj);
                
            } 
        }
    }, [userDataObj, userType]);
 
    useEffect(() => {
      //then check if there is no user image, we supply the user with a default avatar
        if(avatarDataObj === null){   
          if (userRole === 'student'){   
            
                  // select a avatar at random from all the student avatarsCONFIRMED
                  const student_avatars = Object.values(avatars);
                  const randomIndex = Math.floor(Math.random() * student_avatars.length);
                  randomAvatar = student_avatars[randomIndex];
          }else if(userRole === 'company'){
            
                  const company_avatars = Object.values(avatarsc);
                  const randomIndex = Math.floor(Math.random() * company_avatars.length);
                  randomAvatar = company_avatars[randomIndex];
          }
        }  
      
    }, [avatarLoaded]);
   
    //set the img state to either the default random avatar or the user avatar
    useEffect(() => {                        
            if (randomAvatar) {             
                // Set image state with that random selected avatar, if randomAvatar is set, 
                // that means the user didn't upload an image
                setImg(randomAvatar);                      
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
    }, [randomAvatar]);


    
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