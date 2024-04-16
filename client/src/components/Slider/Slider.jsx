import React, { useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import * as avatarsc from '../../assets/company_default_avatars/index';
import props from 'prop-types';
import My_own_slider from "./My_own_slider.jsx";
import { briefcase, locationBlack, userSml } from '../../assets/Icons/index.js';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import style from './slider.module.css';
import Get_avatars from '../../components/get_student_avatar/Get_avatars.jsx';


function SimpleSlider({ companies }) {
const navigate = useNavigate();
const [avatarDataMap, setAvatarDataMap] = useState({});  // Store avatar data for each company
const [avatarLoaded, setAvatarLoaded] = useState(false);
const [imgMap, setImgMap] = useState({});  // Store image URLs for each company



const token = localStorage.getItem('token');

useEffect(() => {
  // Convert avatar data to image URLs
  if (avatarLoaded) {
    const imgUrls = {};
    Object.entries(avatarDataMap).forEach(([compId, avatarData]) => {
      if (avatarData instanceof Blob) {        
        // avatarData is a blob URL so we need
        imgUrls[compId] = URL.createObjectURL(avatarData);
      }
    });

    // Handle default avatars separately
    const companyAvatars = Object.values(avatarsc);
    companies.forEach(company => {
      const compId = company.id;
      if (!imgUrls[compId]) {
        const randomIndex = Math.floor(Math.random() * companyAvatars.length);
        imgUrls[compId] = companyAvatars[randomIndex];
      }
    });

    setImgMap(imgUrls);
  }
}, [avatarDataMap, avatarLoaded, companies]);

useEffect(() => {
  // Convert avatar data to image URLs
  if (avatarLoaded) {
    const imgUrls = {};
    console.log(avatarDataMap)
    Object.entries(avatarDataMap).forEach(([compId, avatarData]) => {
      if (avatarDataMap instanceof Blob) {        
        // avatarData is a blob URL so we need
        imgUrls[compId] = URL.createObjectURL(avatarData);
        
      } else {
        // No avatar data, set default image URL
        const companyAvatars = Object.values(avatarsc);
        console.log('hejsan')
        const randomIndex = Math.floor(Math.random() * companyAvatars.length);
        imgUrls[compId] = companyAvatars[randomIndex];
        
        
      }
    });
    setImgMap(imgUrls);
  }
}, [avatarDataMap, avatarLoaded]);

const handleViewCompany = (companyId) => {
  navigate('/view-company', { state: { companyId, companies } });
};

return (
  <My_own_slider companies={companies}>
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
  </My_own_slider>
);
}


  export default SimpleSlider;