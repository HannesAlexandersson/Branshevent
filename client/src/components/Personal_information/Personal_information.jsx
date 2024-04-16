import { useState, useEffect } from 'react';
import { pencilRed, image, save } from '../../assets/Icons';
import get_company_tags from '../Get-company-tags/Get_company_tags.jsx';
import get_student_tags from '../get-student-tags/get_student_tags.jsx';
import style from './personal_info.module.css';
import Tags_name_from_server from '../TagsFromServer/Tags_name_from_server';
import tagsArray from '../../tagArray';
import Update_company from '../Update/Update_company.jsx';
import Update_student from '../Update/Update_student.jsx';


function Personal_information({ userData }){    
    const [userDataObj, setUserDataObj] = useState({});
    const [tags, setTags] = useState([]);
    const [editMode, setEditMode] = useState({
        personalInformation: false,       
        description: false,
        workrelated: false,
    });
    
    //set the initial userDataObj to the userData props parsed
    
    useEffect(() => {
        if (userData) {
           
            const parsedData = JSON.parse(userData);
            setUserDataObj(parsedData);
         
            }
          
    }, [userData]);
    
    
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const id = decodedToken.id;
    let userRole;    
    
    //set the userole
    if(decodedToken.userType === 'student'){
        userRole = 'student';
    }else if(decodedToken.userType === 'company' ){
        userRole = 'company';
    }
   

    const handleEditToggle = (section) => {
        if (!editMode[section]) {
            // If not in edit mode, switch to edit mode
            setEditMode((prevEditMode) => ({
                ...prevEditMode,
                [section]: true,
            }));
        } else {
            // If in edit mode, save the changes

            saveChangesToDatabase(section);
        }
    };
    const saveChangesToDatabase = (section) => {
    console.log('Saving changes to database...');
    

    // Update the database based on the user's role
    if (userRole === 'company') {
        updateCompanyData(section);
    } else if (userRole === 'student') {
        updateStudentData(section);
    } else {
        console.error('Unknown user role:', userRole);
    }

    // switch back to view mode
    setEditMode((prevEditMode) => ({
        ...prevEditMode,
        [section]: false,
    }));

    sessionStorage.setItem('userData', JSON.stringify(userDataObj));
};

    const updateCompanyData = (section) => {
        // logic to send updated company data to the server
        console.log('Updating company data...');
        const endpoint = 'api/company/update';        
        const updatedData = {
            company_name: userDataObj.company_name,
            first_name: userDataObj.first_name,
            last_name: userDataObj.last_name,
            phone_number: userDataObj.phone_number,
            email: userDataObj.email,
            password: userDataObj.password,
            description: userDataObj.description,
            companyId: userDataObj.id 
        }; 
        
        //call the db to update the data
        Update_company( updatedData, endpoint, token);
        
        
    };

    const updateStudentData = (section) => {
        //logic to send updated student data to the server
        console.log('Updating student data...');
        const endpoint = 'api/student/update'       
        const updatedData = {
            first_name: userDataObj.first_name,
            last_name: userDataObj.last_name,
            email: userDataObj.email,
            password: userDataObj.password,
            phone_number: userDataObj.phone_number,
            description: userDataObj.description,
            github: userDataObj.github,
            portfolio: userDataObj.portfolio,
            linkedin: userDataObj.linkedin,
            behance: userDataObj.behance,
            work_place: userDataObj.work_place,
            studentId: userDataObj.id
        };
        sessionStorage.setItem('userData', updatedData);
        
        Update_student(updatedData, endpoint, token);
        
    };
  
    useEffect(() => {
        const fetchTags = async (id, token, userRole) => {
            try {
                let tagsData; // Conditionally use a fetch call depending on the user role
                if (userRole === 'company') {
                    tagsData = await get_company_tags(id, token);
                } else if (userRole === 'student') {
                    tagsData = await get_student_tags(id, token);
                }
                if (Array.isArray(tagsData)) {
                    setTags(tagsData); // Only set tags if tagsData is an array
                } else {
                    console.error('Invalid tags data:', tagsData);
                }
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
    
        if (id && token) {
            fetchTags(id, token, userRole);
        }
    }, [id, token, userRole]);
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
    //initialize date variables
    let unformatedDateStart = new Date();
    let unformatedDateEnd = new Date();
    let formattedStartDate;
    let formattedEndDate;
    //if the userdata have date set format the dates
    if (userDataObj && userDataObj.app_start && userDataObj.app_end) {
        unformatedDateStart = new Date(userDataObj.app_start);
        unformatedDateEnd = new Date(userDataObj.app_end);
    }
    //formate the user dates to our desired display format(ie we take away the time and only display date)
    formattedStartDate = unformatedDateStart.toISOString().split('T')[0]; 
    formattedEndDate = unformatedDateEnd.toISOString().split('T')[0];
    //set the display variables to the formatted dates
    const app_start = formattedStartDate;
    const app_end = formattedEndDate;



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
                                        {editMode.personalInformation ? (
                                        <input 
                                        type="text"
                                        name="companyName"
                                        className={style.inputfield}
                                        value={userDataObj.company_name}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, company_name: e.target.value })}
                                    />
                                    ) : (
                                        <input 
                                            type="text"
                                            name="companyName"
                                            className={style.inputfield}
                                            disabled
                                            value={userDataObj.company_name}
                                        />
                                    )}
                                        
                                </div>
                                )}


                                {userRole === 'student' && ( 
                                    <div>
                                    <label className={style.label} htmlFor='proffesion'>PROFFESION</label>
                                    {editMode.personalInformation ? (
                                    <input 
                                        type="text"
                                        name="proffesion"
                                        className={style.inputfield}
                                        value={userDataObj.occupation}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, occupation: e.target.value })}
                                    />
                                    
                                ) : (                                   
                                    
                                    <input 
                                        type="text"
                                        name="proffesion"
                                        className={style.inputfield}
                                        value={userDataObj.occupation}
                                        disabled
                                    />
                                )}
                                </div>
                                )}

                                    <label className={style.label} htmlFor='firstname'>FIRSTNAME</label>
                                    {editMode.personalInformation ? (
                                    <input 
                                        type="text"
                                        name="firstname"
                                        className={style.inputfield}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, first_name: e.target.value })}
                                        value={userDataObj.first_name}
                                    />
                                    ) : ( 
                                        <input 
                                            type="text"
                                            name="firstname"
                                            className={style.inputfield}
                                            disabled
                                            value={userDataObj.first_name}
                                        />
                                    )}

                                    <label className={style.label} htmlFor='lastname'>LASTNAME</label>
                                    {editMode.personalInformation ? (
                                    <input 
                                        type="text"
                                        name="lastname"
                                        className={style.inputfield}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, last_name: e.target.value })}
                                        value={userDataObj.last_name}
                                    />
                                    ) : ( 
                                        <input 
                                        type="text"
                                        name="lastname"
                                        className={style.inputfield}
                                        disabled
                                        value={userDataObj.last_name}
                                    />
                                    )}

                                    <label className={style.label} htmlFor='email'>EMAIL</label>
                                    {editMode.personalInformation ? (
                                    <input 
                                        type="text"
                                        name="email"
                                        className={style.inputfield}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, email: e.target.value })}
                                        value={userDataObj.email}
                                    />
                                    ) : ( 
                                        <input 
                                        type="text"
                                        name="email"
                                        className={style.inputfield}
                                        disabled
                                        value={userDataObj.email}
                                    />
                                    )}

                                    <label className={style.label} htmlFor='phone'>PHONENUMBER</label>
                                    {editMode.personalInformation ? (
                                    <input 
                                        type="text"
                                        name="phone"
                                        className={style.inputfield}
                                        onChange={(e) => setUserDataObj({ ...userDataObj, phone_number: e.target.value })}
                                        value={userDataObj.phone_number}
                                    />
                                ) : ( 
                                    <input 
                                        type="text"
                                        name="phone"
                                        className={style.inputfield}
                                        disabled
                                        value={userDataObj.phone_number}
                                    />
                                )}

                                        {userRole === 'company' && (
                                        <div>
                                        <label className={style.label} htmlFor='companyAddress'>Company Address</label>
                                        {editMode.personalInformation ? (
                                        <input 
                                            type="text"
                                            name="companyAddress"
                                            className={style.inputfield}
                                            onChange={(e) => setUserDataObj({ ...userDataObj, address: e.target.value })}
                                            value={userDataObj.address}
                                        />
                                    ) : ( 
                                        <input 
                                        type="text"
                                        name="companyAddress"
                                        className={style.inputfield}
                                        disabled
                                        value={userDataObj.address}
                                    />
                                    )}
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
                                        value={userDataObj.email}
                                    />
                                    <label className={style.label} htmlFor='password'>PASSWORD</label>
                                    {editMode.password ? (
                                    <input 
                                        className={style.inputfield}
                                        type="password"                                                                                
                                        onChange={(e) => setUserDataObj({ ...userDataObj, address: e.target.value })}
                                        value={userDataObj.password}
                                    />
                                    ) : (
                                        <input 
                                        className={style.inputfield}
                                        type="password"
                                        disabled                                        
                                        value={userDataObj.password}
                                    />
                                    )}                                   
                                    <button className={style.change_pass_btn} onClick={() => handleEditToggle('password')}>  
                                        {editMode.password ? <>CHANGE PASSWORD</> : <>SAVE PASSWORD</>}                                           
                                    </button>
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
                                {editMode.description ? (
                                <textarea 
                                    className={style.descr_area} 
                                    name="description"
                                    onChange={(e) => setUserDataObj({ ...userDataObj, description: e.target.value })}
                                    value={userDataObj.description}
                                />
                                ):(
                                    <textarea 
                                    className={style.descr_area} 
                                    name="description"
                                    disabled
                                    value={userDataObj.description}
                                />
                                )}
                                <label className={style.label} htmlFor='application-periodStart'>APPLICATION PERIOD</label>
                               
                                {editMode.description ? (
                                    
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="application-periodStart"
                                onChange={(e) => setUserDataObj({ ...userDataObj, app_start: e.target.value })}
                                value={app_start}
                                />
                                ):(
                                    <input 
                                    className={style.inputfield}
                                    type="text"
                                    name="application-periodStart"
                                    disabled
                                    value={app_start}
                                    />
                                )}
                                 {editMode.description ? (
                                  <input 
                                className={style.inputfield}
                                type="text"
                                name="application-periodEnd"
                                onChange={(e) => setUserDataObj({ ...userDataObj, app_end: e.target.value })}
                                value={app_end}
                                />
                                 ):(
                                    <input 
                                    className={style.inputfield}
                                    type="text"
                                    name="application-periodEnd"
                                    disabled
                                    value={app_end}
                                    />
                                 )}
                                <label className={style.label} htmlFor='online-profiles'>ONLINE PROFILE</label>
                                {editMode.onlineProfiles ? (
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="online-profiles"
                                onChange={(e) => setUserDataObj({ ...userDataObj, linkedin: e.target.value })}
                                value={userDataObj.linkedin
                                }
                                />
                            ):(
                                <input 
                                className={style.inputfield}
                                type="text"
                                name="online-profiles"
                                disabled
                                value={userDataObj.linkedin
                                }
                                />
                            )}

                                {userRole === 'student' ? (
                                    <div>
                                        <label className={style.label} htmlFor='online-profiles'>Github</label>
                                        {editMode.onlineProfiles ? (
                                            <input 
                                                className={style.inputfield}
                                                type="text"
                                                name="online-profiles"
                                                value={userDataObj.github}
                                                onChange={(e) => setUserDataObj({ ...userDataObj, github: e.target.value })}
                                            />
                                        ) : (
                                            <input 
                                                className={style.inputfield}
                                                type="text"
                                                name="online-profiles"
                                                disabled
                                                value={userDataObj.github}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <label className={style.label} htmlFor='online-profiles'>Company Website</label>
                                        {editMode.onlineProfiles ? (
                                            <input 
                                                className={style.inputfield}
                                                type="text"
                                                name="online-profiles"
                                                value={userDataObj.company_website}
                                                onChange={(e) => setUserDataObj({ ...userDataObj, company_website: e.target.value })}
                                            />
                                        ) : (
                                            <input 
                                                className={style.inputfield}
                                                type="text"
                                                name="online-profiles"
                                                disabled
                                                value={userDataObj.company_website}
                                            />
                                        )}
                                    </div>
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
                                    
                                        <Tags_name_from_server selectedTagNames={selectedTagNames} />                                       
                                    
                                </div>

                                <div className={style.checkbox_wrapper}>

                                    {userRole === 'student' ? (
                                    <div>
                                        <p className={style.checkbox_loc_title}>HOW DO I WORK</p>
                                        <div className={style.box_container}>
                                        <div className={style.box_row}>
                                            {userDataObj.work_place === 'office' ? (
                                                <div>                                                
                                                <input 
                                                    disabled
                                                    type="checkbox"
                                                    name="office"
                                                    checked       
                                                    className={style.checkis}                                             
                                                    />
                                                    <label htmlFor='office'>IN OFFICE</label>
                                                </div>
                                            ) : (
                                                <div>                                               
                                                <input 
                                                    disabled
                                                    type="checkbox"
                                                    name="office"
                                                    />
                                                     <label htmlFor='office'>IN OFFICE</label>
                                                </div>
                                            )}
                                            </div>
                                            <div className={style.box_row}>
                                            {userDataObj.work_place === 'remote' ? (
                                                <div>
                                              
                                            <input 
                                                disabled
                                                type="checkbox"
                                                name="remote"
                                                checked
                                                className={style.checkis}
                                                />
                                                  <label htmlFor='remote'>REMOTELY</label>
                                                </div>
                                            ) : (<div>                                               
                                            <input 
                                                disabled
                                                type="checkbox"
                                                name="remote"                                                
                                                />
                                                 <label htmlFor='remote'>REMOTELY</label>
                                                </div>)}
                                            </div>
                                              <div className={style.box_row}>
                                                {userDataObj.work_place === 'both' ? (
                                                    <div>                                                        
                                                    <input 
                                                        disabled
                                                        type="checkbox"
                                                        name="both"
                                                        checked
                                                        className={style.checkis}
                                                        />
                                                        <label htmlFor='both'>BOTH</label>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        
                                                    <input 
                                                        disabled
                                                        type="checkbox"
                                                        name="both"
                                                        />
                                                        <label htmlFor='both'>BOTH</label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    ) : (
                                    <div>
                                        <p className={style.checkbox_loc_title}>HOW DO WE WORK</p>
                                        <div className={style.box_container}>
                                        <div className={style.box_row}>
                                            {userDataObj.work_place === 'office' ? (
                                                <div>                                                
                                                <input 
                                                className={style.checkis}
                                                  disabled
                                                    type="checkbox"
                                                    name="office"
                                                    checked
                                                    />
                                                    <label htmlFor='office'>IN OFFICE</label>
                                                </div>
                                            ) : (
                                                <div>                                               
                                                <input 
                                                  disabled
                                                    type="checkbox"
                                                    name="office"
                                                    />
                                                     <label htmlFor='office'>IN OFFICE</label>
                                                </div>
                                            )}
                                            </div>
                                            <div className={style.box_row}>
                                            {userDataObj.work_place === 'remote' ? (
                                                <div>
                                              
                                            <input 
                                              disabled
                                                type="checkbox"
                                                name="remote"
                                                checked
                                                className={style.checkis}
                                                />
                                                  <label htmlFor='remote'>REMOTELY</label>
                                                </div>
                                            ) : (<div>                                               
                                            <input 
                                              disabled
                                                type="checkbox"
                                                name="remote"                                                
                                                />
                                                 <label htmlFor='remote'>REMOTELY</label>
                                                </div>)}
                                            </div>
                                              <div className={style.box_row}>
                                                {userDataObj.work_place === 'both' ? (
                                                    <div>                                                        
                                                    <input 
                                                      disabled
                                                        type="checkbox"
                                                        name="both"
                                                        checked
                                                        className={style.checkis}
                                                        />
                                                        <label htmlFor='both'>BOTH</label>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        
                                                    <input 
                                                      disabled
                                                        type="checkbox"
                                                        name="both"
                                                        />
                                                        <label htmlFor='both'>BOTH</label>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    )}
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