
import { locationBlack, userSml } from '../../assets/Icons';
import { heart, heartlight } from '../../assets/Icons/dropdownicons';
import * as avatarsc from '../../assets/company_default_avatars/index';
import style from './mini_card.module.css';

function Mini_card({ companyName, firstName, lastName, location, avatar, onClick }){
   
    const compName = companyName;
    let image;
    const company_avatars = Object.values(avatarsc);
    if (avatar === null) {
        const randomIndex = Math.floor(Math.random() * company_avatars.length);
        
        image = company_avatars[randomIndex];
    }else{
        image = avatar;
    }   
    
    return(
            <>
                <div className={style.mini_card_wrapper} onClick={onClick}>
                    <div className={style.mini_card_img_wrapper}>
                        <div className={style.img_heart_wrap}>
                            <img src={heartlight} className={style.heart} />
                        </div>
                        <img className={style.img} src={image} />
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