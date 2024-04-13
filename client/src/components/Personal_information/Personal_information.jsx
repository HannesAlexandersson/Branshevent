import { useState, useEffect } from 'react';
import { pencilRed, image, save } from '../../assets/Icons';
import get_company_tags from '../Get-company-tags/Get_company_tags.jsx';
import get_student_tags from '../get-student-tags/get_student_tags.jsx';
import style from './personal_info.module.css';
import Tags_name_from_server from '../TagsFromServer/Tags_name_from_server';

function Personal_information({ userData }){
    const [editMode, setEditMode] = useState({
        personalInformation: false,       
        description: false,
        workrelated: false,
    });

    const handleEditToggle = (section) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [section]: !prevEditMode[section],
        }));
    };
    
    const id = userData.id;
    const token = localStorage.getItem('token');
    if(userRole === 'company'){
        useEffect(() => {
            if (id) { 
                get_company_tags(id, token)
                    .then(data => setTags(data))
                    .catch(error => console.error('Error fetching company tags:', error));
            }
        }, [id]);
    }else if(userRole === 'student'){
        useEffect(() => {
            if (id) { 
                get_student_tags(id, token)
                    .then(data => setTags(data))
                    .catch(error => console.error('Error fetching company tags:', error));
            }
        }, [id]);
    }

    //a reverse function to compare the tags id from the db to the tagsArray to get the names of the selected tags
    const getSelectedTagNames = (tagIds) => {
        // we need to filter the tagsArray to find tags that match the IDs in tagIds
        const selectedTagNames = tagsArray
            .filter(tag => tagIds.includes(tag.id))
            .map(tag => tag.name);
        
        return selectedTagNames;
    };
    
    
    const tagIdsFromServer = tags; 
    const selectedTagNames = getSelectedTagNames(tagIdsFromServer);

const userRole = sessionStorage.getItem('userType');

    return(
        <>
                    <p className={style.sub_title}>Here you can edit your account&apos;s information and profile.</p>
                    
                    <div className={style.user_info}>

                        <div className={style.personal_information_wrapper}>
<div className={style.name_password_container}>
    
                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>PERSONAL INFORMATION</h2>                               
                                <button className={style.edit_btn} onClick={() => handleEditToggle('personalInformation')}>
                                    {editMode.personalInformation ? <img src={save} /> : (
                                        <>
                                            EDIT
                                            <img src={pencilRed} />
                                        </>
                                    )}
                                </button>
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
                                            disabled
                                            value={userData.company_name}
                                        />
                                        </div>
                                         )}


                                {userRole === 'student' && ( 
                                    <div>
                                    <label className={style.label} htmlFor='proffesion'>PROFFESION</label>
                                    <input 
                                        type="text"
                                        name="proffesion"
                                        className={style.inputfield}
                                        value={userData.occupation}
                                        disabled
                                    />
                                    </div>
                                )}
                                    <label className={style.label} htmlFor='firstname'>FIRSTNAME</label>
                                    <input 
                                        type="text"
                                        name="firstname"
                                        className={style.inputfield}
                                        disabled
                                        value={userData.first_name}
                                    />
                                    <label className={style.label} htmlFor='lastname'>LASTNAME</label>
                                    <input 
                                        type="text"
                                        name="lastname"
                                        className={style.inputfield}
                                        disabled
                                        value={userData.last_name}
                                    />
                                    <label className={style.label} htmlFor='email'>EMAIL</label>
                                    <input 
                                        type="text"
                                        name="email"
                                        className={style.inputfield}
                                        disabled
                                        value={userData.email}
                                    />
                                    <label className={style.label} htmlFor='phone'>PHONENUMBER</label>
                                    <input 
                                        type="text"
                                        name="phone"
                                        className={style.inputfield}
                                        disabled
                                        value={userData.phone_number}
                                    />
                   
                                        {userRole === 'company' && (
                                        <div>
                                        <label className={style.label} htmlFor='companyAddress'>Company Address</label>
                                        <input 
                                            type="text"
                                            name="companyAddress"
                                            className={style.inputfield}
                                            disabled
                                            value={userData.address}
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
                                        value={userData.email}
                                    />
                                    <label className={style.label} htmlFor='password'>PASSWORD</label>
                                    <input 
                                        className={style.inputfield}
                                        type="password"
                                        disabled
                                        hidden
                                        value={userData.password}
                                    />
                                    <button className={style.change_pass_btn}>CHANGE PASSWORD</button>
                                </form>

                            </div>
</div>
<div className={style.name_password_container}> 
                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>DESCRIPTION</h2>
                                <button className={style.edit_btn} onClick={() => handleEditToggle('description')}>
                                    {editMode.description ? <img src={save} /> : (
                                        <>
                                            EDIT
                                            <img src={pencilRed} />
                                        </>
                                    )}
                                </button>
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
                                    disabled
                                    value={userData.description}
                                />

                                <label className={style.label} htmlFor='application-periodStart'>APPLICATION PERIOD</label>
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="application-periodStart"
                                disabled
                                value={userData.app_start}
                                />
                                  <input 
                                className={style.inputfield}
                                type="text"
                                name="application-periodEnd"
                                disabled
                                value={userData.app_end}
                                />
                                <label className={style.label} htmlFor='online-profiles'>ONLINE PROFILE</label>
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="online-profiles"
                                disabled
                                value={userData.linkedin
                                }
                                />
                                {userRole === 'student' ? (
                                    <input 
                                    className={style.inputfield}
                                    type="text"
                                    name="online-profiles"
                                    disabled
                                    value={userData.github
                                    }
                                    />
                                ): (
                                    <input 
                                    className={style.inputfield}
                                    type="text"
                                    name="online-profiles"
                                    disabled
                                    value={userData.company_website
                                    }
                                    />
                                )}
                               
                            </div>
</div>
<div className={style.name_password_container}>
                            <div className={style.pers_info_btn_container}>
                                <h2 className={style.personal_info_title}>WORK RELATED</h2>
                                <button className={style.edit_btn} onClick={() => handleEditToggle('workrelated')}>
                                    {editMode.workrelated ? <img src={save} /> : (
                                        <>
                                            EDIT
                                            <img src={pencilRed} />
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className={style.redBox}>
                                <div className={style.tags_wrapper}>
                                    <p className={style.tags_title}>PROGRAM USED</p>
                                    <div className={style.tags_container}>
                                        <Tags_name_from_server >
                                        {/*tags here*/}
                                        </Tags_name_from_server>
                                    </div>
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
                                       {/*  <button className={style.edit_btn}>EDIT <img src={pencilRed} /></button> */}
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
                    </div>

               

            
        </>
    );
}

export default Personal_information