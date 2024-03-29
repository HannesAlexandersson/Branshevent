import style from './popup.module.css';
import { close } from '../../assets/Icons/index.js';
function Popup({ onClose, onAccept }){
    const handleAcceptClick = () => {
        onAccept(); 
    };

    return(
        <>
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.title_container}>
                    <h5>GDPR</h5>
                    <button className={style.closeButton} onClick={onClose}>
                        <img src={close} />
                    </button>
                </div>
                <section className={style.text_container}>
                    <p>
                        We are committed to protecting your privacy and personal data in accordance with 
                        the General Data Protection Regulation (GDPR). This Privacy Notice outlines how we collect, 
                        use, and share your personal information when you sign up for our industry meetup platform.                        
                    </p>

                    <p>
                        <span>1. Data Controller </span>
                        <span>
                            YRGO is the data controller responsible for your personal data. If you have any questions 
                            about this Privacy Notice or how we use your personal data, please contact us at 
                            susan.johansson@educ.goteborg.se.
                        </span>
                    </p>

                    <p>
                        <span>2. Personal Data</span>
                        <span>
                            We Collect When you sign up for our industry meetup platform, we collect the 
                            following types of personal data: Name Email address Phone number
                        </span>
                    </p>

                    <p>
                        <span>3. How We Use Your Personal Data</span>
                        <span>
                            We use your personal data for the following purposes: Facilitating communication and interaction between 
                            students and companies for internship opportunities. Providing personalized internship recommendations 
                            based on your profile information. Improving our platform and services. Complying with legal obligations. 
                        </span>
                    </p>

                    <p>
                        <span>4. Sharing Your Personal Data</span>
                        <span>
                            We may share your personal data with the following parties: Other users of our platform, 
                            such as companies and students, to facilitate internship opportunities. Service providers 
                            who assist us in providing our services, such as hosting providers and analytics providers. 
                            Law enforcement or regulatory authorities, if required by law or to protect our rights.
                        </span>
                    </p>

                    <p>
                        <span>5. Legal Basis for Processing Your Personal Data</span>
                        <span>
                            We process your personal data on the following legal bases: Performance of a contract: 
                            To fulfill our contractual obligations in providing our industry meetup platform. 
                            Legitimate interests: To pursue our legitimate interests in connecting students with 
                            internship opportunities and assisting companies in finding interns. Consent: 
                            Where you have provided your consent to specific processing activities.
                        </span>
                    </p>

                    <p>
                        <span>6. Data Retention</span>
                        <span>
                            We retain your personal data for as long as necessary to fulfill the purposes for 
                            which it was collected, or as required by law.
                        </span>
                    </p>

                    <p>
                        <span>7. Your Rights</span>
                        <span>
                            You have the following rights regarding your personal data: Right to access, 
                            rectification, erasure, restriction of processing, and data portability: 
                            You can exercise these rights by contacting us using the contact details provided 
                            in Section 1. Right to object: You have the right to object to the processing of 
                            your personal data under certain circumstances.
                        </span>
                    </p>

                    <p>
                        <span>8. Changes to this Privacy Notice</span>
                        <span>
                            We may update this Privacy Notice from time to time to reflect changes 
                            in our practices or legal requirements. We will notify you of any material 
                            changes by posting the updated Privacy Notice on our website or by other means 
                            of communication.
                        </span>
                    </p>

                    <p>
                        <span>9. Contact Us</span>
                        <span>
                            If you have any questions or concerns about this Privacy Notice or our data practices, 
                            please contact us at susan.johansson@educ.goteborg.se. Thank you for joining our 
                            Industry Meetup and best of luck with your internship endeavors!
                        </span>
                    </p>
                </section>
            </div>

            <button className={style.btn} onClick={handleAcceptClick} >ACCCEPT</button>
        </div>    
        </>
    );
}

export default Popup