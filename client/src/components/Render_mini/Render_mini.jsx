import { useNavigate } from "react-router-dom";
import Mini_card from "../Mini-cards/Mini_card";
import style from './render_mini.module.css';
import { useState, useEffect } from "react";


function Render_mini({ companies }){
  const navigate = useNavigate();

//handler for when the user presses on a minicard to get to the company view
  const handleViewCompany = (companyId) => {
    navigate('/view-company', { state: { companyId, companies } });
  };
    return(
       
            <div className={style.mini_cards_containter}>
              
              {companies.map((company) => (
                <Mini_card  onClick={() => handleViewCompany(company.id)}
                  key={company.id}
                  avatarID={company.avatar_id}
                  companyName={company.company_name}
                  firstName={company.first_name}
                  lastName={company.last_name}
                  location={company.work_place}                 
                />
              ))}
            </div>
    );
}

export default Render_mini