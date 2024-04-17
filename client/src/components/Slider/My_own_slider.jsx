import React, { useState, useEffect } from 'react';
import { useNavigate,  } from "react-router-dom";
import { briefcase, locationBlack, userSml } from '../../assets/Icons/index.js';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import style from './slider.module.css';
import Get_avatars from '../../components/get_student_avatar/Get_avatars.jsx';
import * as avatarsc from '../../assets/company_default_avatars/index';
import Slide_show from './Slide_show.jsx';


  
  function MyOwnSlider({ companies, onClick }) {
    const [imgMap, setImgMap] = useState({});
    const [ updatedCompanies, SetUpdateCompanies] = useState([]);
    const navigate = useNavigate();  
  
    //fetch the avatars from the db
    useEffect(() => {
      const fetchAvatars = async () => {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));        
        const userType = decodedToken.userType;
        const imgUrls = {};
        let updatedCompanies;
        //assign a new property to flag if the avatar is user avatar or a default avatar
        updatedCompanies = companies.map(company => {
          if (company.avatar_id) {
            return { ...company, hasUserUploadedAvatar: true };
          } else {
            return { ...company, hasUserUploadedAvatar: false };
          }
        });
        //wait for updatedcompanies
        if(updatedCompanies){
        //iterate over the list of companies
        for (const company of updatedCompanies) {          
          //each object in the list that have a avatar_id set gets their avatars fetched
          if (company.avatar_id) {
            if ('occupation' in company){
              
              try {
                const avatarData = await Get_avatars(company.id, token, 'studentAvatars/');
                imgUrls[company.id] = URL.createObjectURL(avatarData);                              
              } catch (error) {
                console.error('Error fetching company data:', error);
              }           
            }else if ('company_name' in company){             
              try {//
                const avatarData = await Get_avatars(company.id, token, 'companyAvatars/');
                imgUrls[company.id] = URL.createObjectURL(avatarData);                
              } catch (error) {
                console.error('Error converting blob company data:', error);
              }  
            }           
          }else { //           
            const companyAvatars = Object.values(avatarsc);
            const randomIndex = Math.floor(Math.random() * companyAvatars.length);
            imgUrls[company.id] = companyAvatars[randomIndex];
          }
        }
      }
        SetUpdateCompanies(updatedCompanies);
        setImgMap(imgUrls);
      };
  
      fetchAvatars();
    }, [companies]);

    const handleViewCompany = (companyId) => {
      navigate('/view-company', { state: { companyId, companies } });
    };
     
    return (
      <Slide_show companies={companies}  >
        {updatedCompanies.map((company) => (
          <div key={company.id} className={style.redBox} onClick={() => handleViewCompany(company.id)}>
            <div className={style.img_wrapper}>
              <div className={style.img_display_area}>                                           
                <img 
                  src={imgMap[company.id]} 
                  alt="company image / default avatar image" 
                  style={{ objectFit: company.hasUserUploadedAvatar ? 'cover' : 'fill' }}
                />
                <div className={style.icon_container}>
                  <img src={heartlight} alt="heart icon" />
                </div>
              </div>
            </div>
            <div className={style.text_area}>
              {'company_name' in company ? (
                <div className={style.name_box}>
                  <img src={briefcase} alt="briefcase icon" />
                  <p>{company.company_name}</p>
                </div>
              ) : (
                <div className={style.name_box}>
                  <img src={briefcase} alt="briefcase icon" />
                  <p>{company.occupation}</p>
              </div>
              )}
             
              <div className={style.name_box}>
                <div className={style.name_loc_wrapper}>
                  <img src={userSml} alt="user icon" />
                  <p>{company.first_name} {company.last_name}</p>
                </div>
                <div className={style.name_loc_wrapper}>                                
                  <img src={locationBlack} alt="location icon" />
                  <p>{company.address}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slide_show>
    );
  }
 
export default MyOwnSlider