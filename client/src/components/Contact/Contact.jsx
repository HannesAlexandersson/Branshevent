import {phone, mail, globe, office} from '../../assets/Icons/index.js';
import style from './contact.module.css';
function Contact(){
    const userRole = sessionStorage.getItem('userRole');


    return(
        <>
            <div className={style.contact_wrapper}>
                <div className={style.online_container}>
                    

                    <div className={style.online_profile_display_wrap}>
                        <div className={style.onlin_header_wrap}>
                            <img src={globe} />
                            <p className={style.head_txt}>Online Profile</p>
                        </div>

                        <div className={style.box}>
                            <p className={style.online_txt_display}>Linkedin:</p>
                            <p className={style.online_txt_value}>@setValueToUser</p>
                        </div>
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Website:</p>
                            <p className={style.online_txt_value}>www.alexanderochson.se/portfolio/</p>
                        </div>

                        {userRole === 'student' && (
                        <div className={style.box}>
                            <p className={style.online_txt_display}>Github:</p>
                            <p className={style.online_txt_value}>www.github.com/hannesalexandersson/</p>
                        </div>
                        )}
                        

                    </div>


                    <div className={style.online_profile_display_wrap}>
                        <div className={style.onlin_header_wrap}>                        
                            <img src={mail} />
                            <p className={style.head_txt}>Email</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>
                            <p className={style.online_txt_value}>s103154@gmail.com</p>
                        </div>
                    </div>

                    <div className={style.online_profile_display_wrap}>                        
                        <div className={style.onlin_header_wrap}>      
                            <img src={phone} />
                            <p className={style.head_txt}>Phonenumber</p>
                        </div>
                        <div className={style.online_profile_display_wrap}>
                            <p className={style.online_txt_value}>0730378013</p>
                        </div>                        
                    </div>

                    {userRole === 'company' && (
                         <div className={style.online_profile_display_wrap}>                        
                            <div className={style.onlin_header_wrap}>      
                                <img src={office} />
                                <p className={style.head_txt}>Company Address</p>
                            </div>
                            <div className={style.online_profile_display_wrap}>
                                <p className={style.online_txt_value}>Ricklevägen 28, 44833 Floda</p>
                            </div>                        
                        </div>
                    )}

                </div>



                
            </div>
        </>
    );
}

export default Contact