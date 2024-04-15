import { useNavigate } from "react-router-dom";
import Mini_card from "../Mini-cards/Mini_card";
import style from './render_mini.module.css';

function Render_mini({ companies, onHeartClick, favorites} ){
  const navigate = useNavigate();
  const handleViewCompany = (companyId) => {
    navigate('/view-company', { state: { companyId, companies } });
  };

  
  // in order to know if we are looking for company_id or student_id later on, we need to decide what key to use
  let favoriteMatchKey
  if (sessionStorage.getItem("userType") === "student") { 
    favoriteMatchKey = 'company_id' 
  } else { 
    favoriteMatchKey = 'student_id';
  }

  return(
    <div className={style.mini_cards_containter}>
      {companies.map((company) => (
        <Mini_card onClick={() => handleViewCompany(company.id)}
          key={company.id}
          companyName={company.company_name}
          firstName={company.first_name}
          lastName={company.last_name}
          location={company.location}
          avatar={company.avatar_id}
          onHeartClick={() => onHeartClick(company.id, (favorites.find((favorite) => favorite[favoriteMatchKey] == company.id)))}
          favorite={(favorites.find((favorite) => favorite[favoriteMatchKey] == company.id))}
        />
      ))}
    </div>
  );
}

export default Render_mini