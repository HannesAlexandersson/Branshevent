import { useState } from 'react';
import { Link, useNavigate }  from 'react-router-dom';
import { Nav } from '../index';
import { Yrgotransred, Yrgo } from '../../assets/Logos/index';
import { backArrow, nextArrow, locationBlack, clockBlack } from '../../assets/Icons/index';
import { Add_to_calendar, Progressbar, Red_btn, Spacer_bottom, White_btn } from '../../components';
import style from './student_finish.module.css';

function Student_finish(){
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(7);
    const totalSteps = 7;
const token = JSON.parse(localStorage.getItem('studentToken'));
console.log(token);
    const handleNextStep = () => {
        


        navigate('/home');
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

                    <Add_to_calendar />

                </div>

                <Spacer_bottom />

                <div className={style.footer_buttons}>
                    <Red_btn onClick={handleNextStep} className={style.red}>
                        <p>browse companies</p>
                        <img src={nextArrow} />
                    </Red_btn>
                    <Link to="/" >
                        <White_btn className={style.white}>
                            <img src={backArrow} />
                            <p>back to event page</p>
                        </White_btn>
                    </Link>
                </div>

                <Spacer_bottom />
                <Spacer_bottom className={style.btm_lgo_spacer}>
                    <div className={style.logo_bottom}>
                        <img src={Yrgotransred} alt="yrgo logo red, semi-transparent" />
                    </div>
                </Spacer_bottom>
                
                <div className={style.big_dev_log}>
                    <img src={Yrgo} />
                </div>

                <div className={style.btm_grad}></div>
            </div>
        </>
    );
}
export default Student_finish