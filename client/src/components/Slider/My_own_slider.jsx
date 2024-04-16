import React, { useState, useEffect } from 'react';
import { briefcase, locationBlack, userSml } from '../../assets/Icons/index.js';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import style from './slider.module.css';
import Get_avatars from '../../components/get_student_avatar/Get_avatars.jsx';
import * as avatarsc from '../../assets/company_default_avatars/index';
import Slide_show from './Slide_show.jsx';


  
  function MyOwnSlider({ companies, handleViewCompany }) {
    const [imgMap, setImgMap] = useState({});
  
    useEffect(() => {
      const fetchAvatars = async () => {
        const token = localStorage.getItem('token');
        const imgUrls = {};
        
        for (const company of companies) {
          if (company.avatar_id) {
            try {
              const avatarData = await Get_avatars(company.id, token, 'companyAvatars/');
              imgUrls[company.id] = URL.createObjectURL(avatarData);
            } catch (error) {
              console.error('Error fetching company data:', error);
            }
          } else {
            const companyAvatars = Object.values(avatarsc);
            const randomIndex = Math.floor(Math.random() * companyAvatars.length);
            imgUrls[company.id] = companyAvatars[randomIndex];
          }
        }
        
        setImgMap(imgUrls);
      };
  
      fetchAvatars();
    }, [companies]);
    {/* <div className={style.slider_container_child}> */}
    return (
      <Slide_show companies={companies}  >
        {companies.map((company) => (
          <div key={company.id} className={style.redBox} onClick={() => handleViewCompany(company.id)}>
            <div className={style.img_wrapper}>
              <div className={style.img_display_area}>
                {/* Render avatar image or default avatar image */}
                <img src={imgMap[company.id]} alt="company image / default avatar image" />
                <div className={style.icon_container}>
                  <img src={heartlight} alt="heart icon" />
                </div>
              </div>
            </div>
            <div className={style.text_area}>
              <div className={style.name_box}>
                <img src={briefcase} alt="briefcase icon" />
                <p>{company.company_name}</p>
              </div>
              <div className={style.name_box}>
                <div className={style.name_loc_wrapper}>
                  <img src={userSml} alt="user icon" />
                  <p>{company.first_name} {company.last_name}</p>
                </div>
                <div className={style.name_loc_wrapper}>                                
                  <img src={locationBlack} alt="location icon" />
                  <p>{company.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slide_show>
    );
  }
  /* </div> */
export default MyOwnSlider