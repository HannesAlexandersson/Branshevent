import { pencilRed, eye_off, image } from '../../assets/Icons';
import style from './personal_info.module.css';

function Personal_information(){
sessionStorage.setItem('userRole', 'company');

const userRole = sessionStorage.getItem('userRole');

    return(
        <>
                    
                    <div className={style.user_info}>
                        <p className={style.sub_title}>Here you can edit your account&apos;s information and profile.</p>

                        <div className={style.personal_information_wrapper}>
                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>PERSONAL INFORMATION</h2>
                                <button className={style.edit_btn}>EDIT <img src={pencilRed} /></button>
                            </div>

                            <div className={style.redBox}>
                                <form className={style.form}>

                                {userRole === 'company' && (
                                    <div>
                                        <label className={style.label} htmlFor='companyName'>Company Name</label>
                                        <input 
                                            type="text"
                                            name="companyName"
                                            className={style.inputfield}
                                        />
                                        </div>
                                         )}



                                    <label className={style.label} htmlFor='proffesion'>PROFFESION</label>
                                    <input 
                                        type="text"
                                        name="proffesion"
                                        className={style.inputfield}
                                        value="Webdeveloper"
                                    />

                                    <label className={style.label} htmlFor='firstname'>FIRSTNAME</label>
                                    <input 
                                        type="text"
                                        name="firstname"
                                        className={style.inputfield}
                                    />
                                    <label className={style.label} htmlFor='lastname'>LASTNAME</label>
                                    <input 
                                        type="text"
                                        name="lastname"
                                        className={style.inputfield}
                                    />
                                    <label className={style.label} htmlFor='email'>EMAIL</label>
                                    <input 
                                        type="text"
                                        name="email"
                                        className={style.inputfield}
                                    />
                                    <label className={style.label} htmlFor='phone'>PHONENUMBER</label>
                                    <input 
                                        type="text"
                                        name="phone"
                                        className={style.inputfield}
                                    />
                   
                                        {userRole === 'company' && (
                                        <div>
                                        <label className={style.label} htmlFor='companyAddress'>Company Address</label>
                                        <input 
                                            type="text"
                                            name="companyAddress"
                                            className={style.inputfield}
                                        />
                                    </div>
                                     )}

                                </form>
                            </div>


                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>USERNAME AND PASSWORD</h2>                               
                            </div>
                            <div className={style.redBox}>
                                <form  className={style.form}>
                                    <label className={style.label} htmlFor='username'>USERNAME</label>
                                    <input 
                                        className={style.inputfield}
                                        type="email"
                                        disabled
                                    />
                                    <label className={style.label} htmlFor='password'>PASSWORD</label>
                                    <input 
                                        className={style.inputfield}
                                        type="password"
                                        
                                    />
                                    <button className={style.change_pass_btn}>CHANGE PASSWORD</button>
                                </form>

                            </div>

                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>DESCRIPTION</h2>
                                <button className={style.edit_btn}>EDIT <img src={pencilRed} /></button>
                            </div>
                            <div className={style.redBox}>
                                <div className={style.img_wrapper}>
                                    <div className={style.img_display_wrapper}>
                                        <img src={image} alt="user image" />
                                    </div>
                                    <button className={style.img_btn}>IMAGE NAME</button> 
                                </div>

                                <label className={style.label} htmlFor='description' >DESCRIPTION</label>
                                <textarea 
                                    className={style.descr_area} 
                                    name="description"
                                />

                                <label className={style.label} htmlFor='application-period'>APPLICATION PERIOD</label>
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="application-period"
                                />
                                <label className={style.label} htmlFor='online-profiles'>ONLINE PROFILE</label>
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="online-profiles"
                                />
                            </div>

                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>WORK RELATED</h2>
                                <button className={style.edit_btn}>EDIT <img src={pencilRed} /></button>
                            </div>
                            <div className={style.redBox}>
                                <div className={style.tags_wrapper}>
                                    <p className={style.tags_title}>PROGRAM USED</p>
                                    <div className={style.tags_container}></div>
                                </div>

                                <div className={style.checkbox_wrapper}>
                                    <p className={style.checkbox_loc_title}>HOW DO I WORK</p>
                                    <div className={style.box_container}>
                                        <div className={style.box_row}>
                                        <label htmlFor='office'>IN OFFICE</label>
                                        <input 
                                            type="checkbox"
                                            name="office"
                                            />
                                            </div>
                                            <div className={style.box_row}>
                                            <label htmlFor='remote'>REMOTElY</label>
                                        <input 
                                            type="checkbox"
                                            name="remote"
                                            />
                                            </div>
                                              <div className={style.box_row}>
                                            <label htmlFor='both'>BOTH</label>
                                        <input 
                                            type="checkbox"
                                            name="both"
                                            />
                                            </div>
                                    </div>
                                </div>
                            </div>

                            {userRole === 'student' && (
                                <div>
                                    <div className={style.pers_info_btn_container}>
                                        <h2 className={style.personal_info_title}>SEE FAVOURITES</h2>
                                        <button className={style.edit_btn}>EDIT <img src={pencilRed} /></button>
                                    </div>
                                    <div className={style.redBox}>
                                        <p className={style.fav}>FAVOURITES</p>
                                        <div className={style.favo_container}>
                                            {/* Render favorite items here */}
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

               

            
        </>
    );
}

export default Personal_information