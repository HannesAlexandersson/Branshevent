import './App.css';
import { calendarIcon, arrow, location, clock, lowOP } from './assets/Icons';
import yrgoLogo from './assets/Logos/yrgo-text.jpg';
import Draggable from './components/Draggable/Draggable';
import Gradient from './components/Gradient/Gradient.jsx';
import Join_btn from './components/Join-btn/Join.btn.jsx';
import Date_box from './components/Date-box/Date-box.jsx';
import Logo from './components/Logo-large/Logo.jsx';
import Main_header from './components/Header/Main_header.jsx';
import Box from './components/Box/Box.jsx';

function App() {
  //const date = new Date().toLocaleDateString();
  /* Alternative text??:
    Welcome to Industry Mingle Times, the ideal platform for discovering top-notch interns or 
    internship opportunities in the fields of Web Development or Digital Design!
  */
  const date = '24 APRIL 15:00-17:00';

  return (
    <>
      <div className="main">

        <Date_box className="date-box default-font">
          <img src={calendarIcon} alt="Calendar" />
          <span>{date}</span>
        </Date_box>

        <div className="divider">

          <Logo className="logo-large">
            <img src={yrgoLogo} alt="Yrgo Logo" />
          </Logo>

          <Main_header className="main-header default-font">
            <h1>
              <span style={{ fontWeight: 'bold' }}>WELCOME TO </span>
              <span style={{ fontWeight: 'normal' }}>INDUSTRY MINGLE TIMES</span>
            </h1>
            <p>Perfect place for you to find the perfect intern or internship within Web development or Digital Design!</p>
          </Main_header>

        </div>

        <Draggable>          
          <div className='draggable-card'>
            <div className="white-divider"></div>

            <div className='dragg-wrapper'>

              <div className='drag-header default-font'>
                <h2>Where & When?</h2>                
              </div>

              <div className="drag-info">
                <Box className='box location default-font'>
                  <img src={location} alt="location-icon" />
                  <p>Lindholmspiren 3, 417 56 Göteborg</p>
                </Box>
                <Box className='box time default-font'>
                  <img className='clock' src={clock} alt="clock-icon" />
                  <p>Wednesday 24 April - 15:00-17:00</p>
                </Box>
              </div>

              <div className='drag-more default-font'>
                <h2>Event details</h2>
                <p>
                    Welcome to Yrgo&apos;s mingle-event to find future coworkers or interns during the LIA-period. 
                    You will be able to meet Web-developers and Digital Designers from Yrgo who want to show 
                    you what they have worked with during the year, and we hope you find a match.
                </p>
              </div>

              <div className='bottom-text default-font'>
                <p>The Web-developers and Digital Designers welcome you!</p>
              </div>           

            </div>
            <img className="bottom-logo" src={lowOP} alt="yrgo logo offset" />
          </div>
          
        </Draggable>
        
        <Join_btn className='btn-white default-font'>Join the Event</Join_btn>
        <Gradient className="gradient-filter"/>
      </div>
      
    </>
  )
}

export default App
