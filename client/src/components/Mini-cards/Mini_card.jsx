
import { locationBlack, userSml } from '../../assets/Icons';
import { heart, heartlight } from '../../assets/Icons/dropdownicons';
import style from './mini_card.module.css';

function Mini_card(){
    sessionStorage.setItem('userRole', 'company');
    sessionStorage.setItem('companyName', ' Big company');
   
    sessionStorage.setItem('firstname', 'Hannes');
    sessionStorage.setItem('lastName', 'Hansson');
    

    const userRole = 'company';
    const compName = sessionStorage.getItem('companyName');
    const firstName = sessionStorage.getItem('firstname');
    const lastName = sessionStorage.getItem('lastName');
   
    const testImg = localStorage.getItem('image');
    return(
            <>
                <div className={style.mini_card_wrapper}>
                    <div className={style.mini_card_img_wrapper}>
                        <div className={style.img_heart_wrap}>
                            <img src={heartlight} className={style.heart} />
                        </div>
                        <img className={style.img} src={testImg} />
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
                                <p>Company City</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}

export default Mini_card