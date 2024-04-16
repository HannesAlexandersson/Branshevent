import { useEffect, useState } from 'react';
import { heartRed, locationBlack, userSml } from '../../assets/Icons';
import { heartlight } from '../../assets/Icons/dropdownicons';
import * as avatarsc from '../../assets/company_default_avatars/index';
import style from './mini_card.module.css';
import Get_avatars from "../get_student_avatar/Get_avatars";

function Mini_card({ companyName, firstName, lastName, work_place, avatarID, onClick, favorite, onHeartClick}){
    const [img, setImg] = useState(null);
    const [avatarDataObj, setAvatarDataObj] = useState(null);  
    const [avatarLoaded, setAvatarLoaded] = useState(false);
    const compName = companyName;
   /*  let randomAvatar;
    const company_avatars = Object.values(avatarsc); */
    const token = localStorage.getItem('token');
    console.log(avatarID);
    useEffect(() => {
        Promise.all([
            Get_avatars(avatarID, token, 'cavatars/')
        ])
        .then(([avatarData]) => {
            setAvatarDataObj(avatarData);
            setAvatarLoaded(true);
        })
        .catch((error) => {
            console.error('Error fetching company data:', error);
        });
    }, [avatarID]);
    
    useEffect(() => {
        if (avatarLoaded) {
            
            if (avatarDataObj) {               
                const reader = new FileReader();
                reader.onload = function(event) {
                const base64Image = event.target.result;
                setImg(base64Image);
                };
                reader.readAsDataURL(avatarDataObj);
            } 
        }
            
        // No avatar image, set default image
        const company_avatars = Object.values(avatarsc);
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        const randomAvatar = company_avatars[randomIndex];
        setImg(randomAvatar);
        
    }, [avatarDataObj, avatarLoaded]);

    
    return(
            <>
                <div className={style.mini_card_wrapper} >
                    <div className={style.mini_card_img_wrapper}>
                        <div className={style.img_heart_wrap}>
                            <img src={ favorite && heartRed || heartlight } className={style.heart} onClick={onHeartClick}/>
                        </div>
                        <img className={style.img} src={img} />
                    </div>
                    <div className={style.mini_card_text}>
                        <div className={style.mini_card_title}>
                            <p>{compName}</p>
                        </div>
                        <div className={style.mini_subText}>
                            <div className={style.mini_card_sub_title}>
                                <img src={userSml} />
                                <p>{firstName} {lastName}</p>
                            </div>
                            <div className={style.mini_card_sub_title}>
                                <img src={locationBlack} />
                                <p>Gothenburg</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default Mini_card