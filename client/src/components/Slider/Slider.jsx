import React, { useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";
import * as avatarsc from '../../assets/company_default_avatars/index';
import props from 'prop-types';
import My_own_slider from "./My_own_slider.jsx";
/* import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */
import { briefcase, locationBlack, userSml } from '../../assets/Icons/index.js';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import style from './slider.module.css';


  function SimpleSlider({ companies }) {
    const navigate = useNavigate();

    //set random avatars to the companies if they doesnt have an uploaded image
    let image;
    const company_avatars = Object.values(avatarsc);    
    const randomIndex = Math.floor(Math.random() * company_avatars.length);    
    image = company_avatars[randomIndex];
       


    const handleViewCompany = (companyId) => {
      navigate('/view-company', { state: { companyId, companies } });
    };
   
    return (
      
      
      <My_own_slider companies={companies}>
     
      
        
        {companies.map((company) => (
          <div key={company.id} className={style.redBox}  onClick={() => handleViewCompany(company.id)}>
            <div className={style.img_wrapper}>
              <div className={style.img_display_area}>
              <img src={image} alt="company image / default avatar image" />
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