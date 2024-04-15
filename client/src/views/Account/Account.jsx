import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Nav } from '../index';
import { Personal_information, Personal_preview, Red_btn, Spacer_bottom, get_a_company, } from '../../components';

import style from './account.module.css';
import get_a_student from '../../components/get_a_company/get_a_student';

//need an endpoint to server to fetch user data here
function Account(){
    const [showPersonalInfo, setShowPersonalInfo] = useState(true); // set to true to mount the state fromt he start
    const [showProfilePreview, setShowProfilePreview] = useState(false); // set to default false to hide the preview until iser clicks the btn
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

   
    
  
     // first we need to find out what userrole is here
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    
    let userRole; 
    let id = decodedToken.id;
    
    //set the userole
    if(decodedToken.userType === 'student'){
        userRole = 'student';
    }else if(decodedToken.userType === 'company' ){
        userRole = 'company';
    }
//the hook fetch the data CONFIRMED
    useEffect(() => {
        if (decodedToken.userType === 'student') {
            get_a_student(token, id)
                .then((rows) => {
                    setUserData(JSON.stringify(rows));                    
                })
                .catch((error) => {
                    console.error('Error fetching student data:', error);
                });
            }else if(decodedToken.userType === 'company'){
                get_a_company(token, id)
                .then((rows) => {
                    setUserData(JSON.stringify(rows));
                    console.log(JSON.stringify(rows), 'inside get a company');
                })
                .catch((error) => {
                    console.error('Error fetching company data:', error);
                });
            }else{
                console.log('error fetching userdata');
            }
        }, []);

    
   

    const handleLogOut = () => {
        // Clear localStorage when user loggs out
        localStorage.clear();

        // Clear sessionStorage hen user loggs out
        sessionStorage.clear();
            
        navigate('/log-in');
    }
   
    return (
    
        <div className={style.main}>
            <Nav />

            <div className={style.info_menu_container}>
                <div className={style.menu_btns}>
                    <button
                        className={`${style.info_btn} ${showPersonalInfo ? style.selected : ''}`}
                        onClick={() => {
                            setShowPersonalInfo(true);
                            setShowProfilePreview(false);
                        }}
                    >
                        Your Information
                    </button>

                    <button
                        className={`${style.profile_preview_btn} ${showProfilePreview ? style.selected : ''}`}
                        onClick={() => {
                            setShowPersonalInfo(false);
                            setShowProfilePreview(true);
                        }}
                    >
                        Preview
                    </button>
                </div>


                <div className={style.footer_btns_big_dev}>
                    <Red_btn onClick={handleLogOut}>Log Out</Red_btn>
                </div>


            </div>

           
            {userData && showPersonalInfo && <Personal_information userData={userData} />}
            {showProfilePreview && <Personal_preview userData={userData} />}

            

            <Spacer_bottom />
            <div className={style.footer_btns}>
                <Red_btn onClick={handleLogOut}>Log Out</Red_btn>
            </div>
            <Spacer_bottom />
        </div>
    );
}

export default Account