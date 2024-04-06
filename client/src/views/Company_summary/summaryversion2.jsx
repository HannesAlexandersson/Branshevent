import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Progressbar, Red_btn, White_btn } from '../../components';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import { Nav } from '../index.js';
import style from './company_summary.module.css';
import Company_sum from '../../components/Company-summary/Company_sum.jsx';

function Company_summary(){
    const [currentStep, setCurrentStep] = useState(3);
    const totalSteps = 4;

    const handleNextStep = () => {

        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
       } 
    return(
<>
<Nav />

<div className={style.main}>

    <Progressbar currentStep={currentStep} totalSteps={totalSteps} />
        <Company_sum />

        <div className={style.footer_buttons}>
        <Link to="/company-work">
             <White_btn>
                 <img src={backArrow} />
                 <p>BACK</p>
             </White_btn> 
         </Link>

         
             <Red_btn onClick={handleNextStep}>                        
                 <p>NEXT STEP</p>
                 <img src={nextArrow} />
             </Red_btn>
         
     </div>
     </div>
</>
);
}

export default Company_summary