import React, { useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";

import My_own_slider from "./My_own_slider.jsx";

function SimpleSlider({ companies }) {
const navigate = useNavigate();  


const handleViewCompany = (companyId) => {
  navigate('/view-company', { state: { companyId, companies } });
};

return (
  
        <My_own_slider    
          companies={companies}
          onClick={handleViewCompany}
        >
        
            
          
        </My_own_slider>
 
);
/*
 {companies.map((company) => (
      <div key={company.id} className={style.redBox} onClick={() => handleViewCompany(company.id)}>
        <div className={style.img_wrapper}>
          <div className={style.img_display_area}>
       
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
    

*/


}


  export default SimpleSlider;