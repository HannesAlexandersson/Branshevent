
import { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import { Progressbar,Red_btn, White_btn, Skip_btn, TagsSelector, Spacer_bottom, } from '../../components/index.js';
import { backArrow, nextArrow } from '../../assets/Icons/index.js';
import Nav from '../Navigation/Navigation';
import style from './student_third.module.css';
import tagArray from '../../tagArray.js';

function Student_third_stage(){
    const [selectedTags, setSelectedTags] = useState([]);
    // we keep track of the checkboxes with this useState hook
    const [selectedLocation, setSelectedLocation] = useState('');
    //we keep track of the progrssbar with this hook
    const [currentStep, setCurrentStep] = useState(5);
    const totalSteps = 7;

    

    useEffect(() => {
        // Load form data from sessionStorage to be able to 'prefill' the form if user backtracks
        const storedData = sessionStorage.getItem('userRole') === 'student' ? {
            tags: sessionStorage.getItem('selectedTags'),
            location: sessionStorage.getItem('selectedLocation'),           
        } : null;
    
        if (storedData && storedData.tags) {
            setSelectedTags(JSON.parse(storedData.tags));
            console.log(storedData.tags);
            // Function to compare the selected tags with the tagsArray and return the corresponding IDs
           
        }
        if (storedData && storedData.location) {           
            setSelectedLocation(storedData.location);
        }        
    }, []);

    
    
    //handle the selected tags
    const handleSaveSelectedTags = (tagsData) => {
        setSelectedTags(tagsData.tags);
      };
    
    //checkboxes
    const handleCheckboxChange = (event) => {
        setSelectedLocation(event.target.value);
    };


    return(
        <>
            <div className={style.main}>
                
            <Nav />

                <Progressbar currentStep={currentStep} totalSteps={totalSteps} />    

                <div className={style.content_container}>               

                    
                    <TagsSelector 
                        who="I" 
                        className={style.tag_selector}
                        onSaveSelectedTags={handleSaveSelectedTags}
                        selectedTags={selectedTags.tags}
                        setSelectedTags={setSelectedTags}
                    />

                    <div className={style.location_container}>
                        <p>I want to work...</p>
                        <div className={style.checkBox_wrapper}>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="office" 
                                checked={selectedLocation === 'office'}
                                onChange={handleCheckboxChange}/>
                                In office
                            </label>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="remote" 
                                checked={selectedLocation === 'remote'}
                                onChange={handleCheckboxChange}/>
                                Remote
                            </label>
                            <label className={style.location_row}>
                                <input className={style.checkBox}
                                type="checkbox" 
                                name="workLocation" 
                                value="both" 
                                checked={selectedLocation === 'both'}
                                onChange={handleCheckboxChange}/>
                                Both
                            </label>
                        </div>
                    </div>

                    <div className={style.btn_container}>
                        <div className={style.skip_wrapper}>
                            <Skip_btn />
                        </div>

                        <div className={style.footer_btn_wrapper}>
                            <Link to="/student-description">
                                    <White_btn>
                                        <img src={backArrow} />
                                        <p>BACK</p>
                                    </White_btn>
                            </Link>
                            <Link to="/student-summary">
                                <Red_btn
                                    onClick={() => {
                                        // Save selectedTags to session storage
                                        sessionStorage.setItem('selectedTags', JSON.stringify(selectedTags));
                                                                                
                                        // Save the selected checkbox value to session storage
                                        sessionStorage.setItem('selectedLocation', selectedLocation);

                                        if (currentStep < totalSteps) {
                                            setCurrentStep(currentStep + 1);                                        
                                        }                                        
                                    }}
                                >                        
                                    <p>NEXT STEP</p>
                                    <img src={nextArrow} />
                                </Red_btn>
                            </Link>
                        </div>

                        <Spacer_bottom />
                        
                    </div>

                </div>
            </div>
        </>
    );
}

export default Student_third_stage



