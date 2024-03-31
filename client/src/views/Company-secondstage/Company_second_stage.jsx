import { useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Red_btn, White_btn, Progressbar, Company_description, Skip_btn, } from '../../components/index.js';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import Nav from '../Navigation/Navigation.jsx';
import styles from './company_second_stage.module.css';


function Company_second_stage(){
    const [currentStep, setCurrentStep] = useState(3);
    const totalSteps = 4;

    if (currentStep < totalSteps) {//add 1 to the progressbar prop
        setCurrentStep(currentStep + 1); 
    }

    return(
        <>
            <Nav />
            <div className={styles.main}>
                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />                
                
                <Company_description />

                <div className={styles.btn_container}>
                    <div className={styles.skip_wrapper}>
                        <Skip_btn />
                    </div>

                    <div className={styles.footer_btn_wrapper}>
                        <Link to="/company-signup">
                                <White_btn>
                                    <img src={backArrow} />
                                    <p>BACK</p>
                                </White_btn>
                        </Link>
                        <Link to="/company-work">
                            <Red_btn>                        
                                <p>NEXT STEP</p>
                                <img src={nextArrow} />
                            </Red_btn>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Company_second_stage