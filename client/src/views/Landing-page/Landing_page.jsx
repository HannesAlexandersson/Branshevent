import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { calendarIcon, map_marker, clock, lowOP } from '../../assets/Icons';
import { Draggable, Gradient, Join_btn, Date_box, Logo, Main_header, Box, Divider, Details, Bottom, Bottom_logo, Dragg_header, } from '../../components';
import yrgoLogo from '../../assets/Logos/yrgo-text.jpg';
import styles from './landing.module.css';

function Landing_page(){
  const location = useLocation();

  useEffect(() => {
    // We only want to have overflow hidden on the landing page so:
    const isLandingPage = location.pathname === '/'; // check to see if we are on the landing page or not
    // Apply the class if we are on the landing page, and remove it when we are not.  
    if (isLandingPage) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // default is to remove the overflow hidden property
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [location]);

  const date = '24 APRIL 15:00-17:00';

  return (
    
      <>
        <div className={styles.main_container}>

          <Date_box>
            <img src={calendarIcon} alt="Calendar" />
            <span>{date}</span>
          </Date_box>

          <div className={styles.header_container}>

            <Logo>
              <img className={styles.the_logo} src={yrgoLogo} alt="Yrgo Logo" />
            </Logo>

            <Main_header>
              <h1>
                <span style={{ fontWeight: 'bold' }}>WELCOME TO </span>
                <span style={{ fontWeight: 'normal' }}>INDUSTRY MEETUP</span>
              </h1>
              <p>Perfect place for you to find the perfect intern or internship within Web development or Digital Design!</p>
            </Main_header>

          </div>

          <div className={styles.draggable_container}>
            <Draggable>          
              <div className={styles.draggable_card}>

                <Divider/>        

                <div className={styles.dragg_wrapper}>

                  <Dragg_header>
                    Where & When?
                  </Dragg_header>

                  <div className={styles.drag_info}>

                    <Box>
                      <img className={styles.location} src={map_marker} alt="location-icon" />
                      <p>Lindholmspiren 3, 417 56 Göteborg</p>
                    </Box>
                    <Box>
                      <img className={styles.clock} src={clock} alt="clock-icon" />
                      <p>Wednesday 24 April - 15:00-17:00</p>
                    </Box>
                    
                  </div>

                  <Details>
                    <h2>Event details</h2>
                    <p>
                        Welcome to Yrgo&apos;s mingle-event to find future coworkers or interns during the LIA-period. 
                        You will be able to meet Web-developers and Digital Designers from Yrgo who want to show 
                        you what they have worked with during the year, and we hope you find a match.
                    </p>
                  </Details>

                  <Bottom>
                    <p>The Web-developers and Digital Designers welcome you!</p>
                  </Bottom>           

                </div>
                <Bottom_logo src={lowOP} alt="yrgo logo offset" />
                
                
              </div>
              
            </Draggable>
          
          

          </div>

          <Join_btn>Join the Event</Join_btn>
          <Gradient/>

          
        </div>
      
      </>
  )
}

export default Landing_page