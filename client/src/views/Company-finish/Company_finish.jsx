import { useState } from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { Nav } from '../index';
import { Yrgotransred } from '../../assets/Logos/index';
import { backArrow, nextArrow, locationBlack, clockBlack } from '../../assets/Icons/index';
import { Progressbar, Red_btn, Spacer_bottom, White_btn } from '../../components';
import style from './company_finish.module.css';

function Company_finish(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(7);
    const totalSteps = 7;

    const handleNextStep = () => {


        navigate('#');
    }
    return(
        <>
            
            <div className={style.main}>

            <Nav />

            <Progressbar currentStep={currentStep} totalSteps={totalSteps} />

                <div className={style.header}>
                    <h1><span>THANK YOU FOR SIGNING UP,</span>SEE YOU SOON!</h1>
                </div>

                <div className={style.container}>

                    <div className={style.location_container}>
                        <img src={locationBlack} />
                        <h2 className={style.location}>Lindholmspiren 3, 417 56 Göteborg</h2>
                    </div>

                    <div className={style.location_container}>
                        <img src={clockBlack} />
                        <h2 className={style.date}>Wednesday 24 April - 15:00-17:00</h2>
                    </div>

                    <div className={style.add_link}>
                        <h2 className={style.link}>ADD to calendar</h2>
                    </div>

                </div>

                <Spacer_bottom />
                
                <div className={style.footer_buttons}>
                    <Red_btn onClick={handleNextStep} className={style.red}>
                        <p>browse companies</p>
                        <img src={nextArrow} />
                    </Red_btn>
                    <Link to="/company-summary" >
                        <White_btn className={style.white}>
                            <img src={backArrow} />
                            <p>back to event page</p>
                        </White_btn>
                    </Link>
                </div>

                <Spacer_bottom />
                <Spacer_bottom />
                <div className={style.logo_bottom}>
                    <img src={Yrgotransred} alt="yrgo logo red, semi-transparent" />
                </div>

            </div>
        </>
    );
}

export default Company_finish