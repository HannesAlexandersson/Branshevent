import { useNavigate } from "react-router-dom";
import Mini_card from "../Mini-cards/Mini_card";
import style from './render_mini.module.css';

function Render_mini({ companies }){
  const navigate = useNavigate();
  const handleViewCompany = (companyId) => {
    navigate('/view-company', { state: { companyId, companies } });
  };
    return(
       
            <div className={style.mini_cards_containter}>
              
              {companies.map((company) => (
                <Mini_card  onClick={() => handleViewCompany(company.id)}
                  key={company.id}
                  companyName={company.company_name}
                  firstName={company.first_name}
                  lastName={company.last_name}
                  location={company.location}
                  avatar={company.avatar_id}
                />
              ))}
            </div>
    );
}

export default Render_mini