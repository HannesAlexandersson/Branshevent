import './App.css';
import yrgoLogo from './assets/Logos/yrgo-text.jpg';
import { calendarIcon, arrow, location, clock, lowOP } from './assets/Icons';
import Draggable from './components/Draggable/Draggable';

function App() {
  //const date = new Date().toLocaleDateString();
  const date = '24 APRIL 15:00-17:00';

  return (
    <>
      <div className="main">

        <div className="date-box">
          <img src={calendarIcon} alt="Calendar" />
          <span>{date}</span>
        </div>

        <div className="divider">

          <div className="logo-large">
            <img src={yrgoLogo} alt="Yrgo Logo" />
          </div>

          <div className="main-header default-font">
          <h1>
            <span style={{ fontWeight: 'bold' }}>WELCOME TO </span>
            <span style={{ fontWeight: 'normal' }}>INDUSTRY MINGLE TIMES</span>
          </h1>
            <p>Perfect place for you to find the perfect intern or internship within Web development or Digital Design!</p>
          </div>

        </div>

        <Draggable>
          <div className='draggable-card'>
            <div className='dragg-wrapper'>

              <div className='drag-header default-font'>
                <h2>Where & When?</h2>
                <img src={arrow} className='arrow-icon' alt="arrow-up icon" />
              </div>

              <div className="drag-info">
                <div className='box location default-font'>
                  <img src={location} alt="location-icon" />
                  <p>Lindholmspiren 3, 417 56 Göteborg</p>
                </div>
                <div className='box time default-font'>
                  <img className='clock' src={clock} alt="clock-icon" />
                  <p>Wednesday 24 April - 15:00-17:00</p>
                </div>
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
        
        <button className='btn-white default-font'>
            Join the Event
        </button>
      </div>
      
    </>
  )
}

export default App
