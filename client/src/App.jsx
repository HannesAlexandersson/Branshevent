import './App.css';
import { calendarIcon, location, clock, lowOP } from './assets/Icons';
import { Draggable, Gradient, Join_btn, Date_box, Logo, Main_header, Box, Divider, Details, Bottom, Bottom_logo, } from './components';
import yrgoLogo from './assets/Logos/yrgo-text.jpg';
import Dragg_header from './components/Dragg-header/Dragg_header';



function App() {  
  const date = '24 APRIL 15:00-17:00';

  return (
    <>
      <div className="main-container">

        <Date_box>
          <img src={calendarIcon} alt="Calendar" />
          <span>{date}</span>
        </Date_box>

        <div className="header-container">

          <Logo>
            <img src={yrgoLogo} alt="Yrgo Logo" />
          </Logo>

          <Main_header>
            <h1>
              <span style={{ fontWeight: 'bold' }}>WELCOME TO </span>
              <span style={{ fontWeight: 'normal' }}>INDUSTRY MEETUP</span>
            </h1>
            <p>Perfect place for you to find the perfect intern or internship within Web development or Digital Design!</p>
          </Main_header>

        </div>

        <div className='draggable-container'>
        <Draggable>          
          <div className='draggable-card'>

            <Divider/>        

            <div className='dragg-wrapper'>

              <Dragg_header>
                Where & When?
              </Dragg_header>

              <div className="drag-info">

                <Box>
                  <img className='location' src={location} alt="location-icon" />
                  <p>Lindholmspiren 3, 417 56 Göteborg</p>
                </Box>
                <Box>
                  <img className='clock' src={clock} alt="clock-icon" />
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

export default App
