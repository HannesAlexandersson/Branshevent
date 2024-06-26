import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {  map_marker, clock, lowOP } from '../../assets/Icons';
import { Draggable, Gradient, Join_btn, Logo, Main_header, Box, Divider, Details, Bottom, Bottom_logo, Dragg_header, Navbar_landing, Spacer_bottom, Red_btn, } from '../../components';
import  yrgoLogo  from '../../assets/Logos/yrgo-text.jpg';
import { Yrgo } from '../../assets/Logos/index.js';
import styles from './landing.module.css';

function Landing_page(){
  const location = useLocation();  
  if(!sessionStorage.getItem('loggedIn') || sessionStorage.getItem('loggedIn') !== 'true'){
    sessionStorage.clear();//clear session
    localStorage.clear();
  }
  useEffect(() => {
    // We only want to have overflow hidden on the landing page so:
    const isLandingPage = location.pathname === '/'; // check to see if we are on the landing page or not
     
   
    // default is to remove the overflow hidden property
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [location]);

  
  const handleJoinEvent = () => {
    sessionStorage.setItem('isSessionActive', true); // Set session variable
  };

  return (
    
      <>
        <div className={styles.main_container}>
        <Navbar_landing />

          

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
          <div className={styles.layout_big_devices_large}>

            <div className={styles.header_container_big_layout}>
             
                <Main_header>
                  <h1>
                    <span style={{ fontWeight: 'bold' }}>WELCOME TO </span>
                    <span style={{ fontWeight: 'normal' }}>INDUSTRY MEETUP</span>
                  </h1>
                  <p>Perfect place for you to find the perfect intern or internship within Web Development or Digital Design!</p>
                
                  {sessionStorage.getItem('loggedIn') !== 'true' && (
                <div className={styles.join_event_btn_wrapper}>
                  <Link to="/sign-in">
                    <button className={styles.join_the_event} onClick={handleJoinEvent}>JOIN THE EVENT</button>
                  </Link>
                </div>
                )}
                
                </Main_header>

                <div className={styles.bg_logo}>
                  <img src={Yrgo} alt="Yrgo logo semi-transparent" />
                </div>
                <div className={styles.bottom_gradient}></div>
              </div>
              
              

              <div className={styles.side_bar}>
                <div className={styles.top_sidebar}>
                  <h5>Where & When?</h5>
                </div>

                <div className={styles.icon_text_wrap}>
                  <div className={styles.locTime_box}>
                    <img src={map_marker} />
                    <p>Lindholmspiren 3, 417 56 Göteborg</p>
                  </div>
                  <div className={styles.locTime_box}>
                    <img src={clock} />
                    <p>Wednesday April 24th, 15:00-17:00</p>
                  </div>
                </div>

                <div className={styles.top_sidebar}>
                  <h5>Event details</h5>
                </div>

                <div className={styles.icon_text_wrap}>
                  <div className={styles.locTime_box}>
                    <p>
                      Welcome to Yrgo&apos;s mingle-event to find future coworkers or interns during the LIA-period. 
                      You will be able to meet Web-developers and Digital Designers from Yrgo who want to show you what 
                      they have worked with during the year. We hope you find a suitable match.
                    </p>
                  </div>
                
                </div>

                <div className={styles.top_sidebar}>
                  <h5>The Web Developers and Digital Designers welcome you!</h5>
                </div>


              </div>

              

          </div>

          

          
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

          <div className={styles.Bottom_logo}>
            <Bottom_logo src={lowOP} alt="yrgo logo offset" />
          </div>
              
        </div>
        <Spacer_bottom />
        </Draggable> 
          
      </div>
      {sessionStorage.getItem('loggedIn') !== 'true' && (
        <div className={styles.join}>
          <Join_btn onClick={handleJoinEvent}>Join the Event</Join_btn>
        </div>
      )}
      
      <Gradient/>
      
    </>
  )
}

export default Landing_page