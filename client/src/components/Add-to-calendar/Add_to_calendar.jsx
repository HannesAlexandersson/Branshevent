import React, { useState } from 'react';
import style from './add_to_calendar.module.css'; 

const Add_to_calendar = () => {
    const [selectedCalendar, setSelectedCalendar] = useState('');

    const handleCalendarChange = (event) => {
        setSelectedCalendar(event.target.value);
    };

    const renderCalendarLinks = () => {
        switch (selectedCalendar) {
            case 'google':
                return (
                    <a className={style.add_link} href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20240424T130000Z%2F20240424T150000Z&details=Industry%20meetup%20with%20focus%20on%20LIA&location=Lindholmspiren%203%2C%20417%2056%20G%C3%B6teborg&text=YRGO%20LIA%20event" title="Add to Google Calendar">
                        <h2 className={style.link}>ADD to Google Calendar</h2>
                    </a>
                );
            case 'outlook':
                return (
                    <a className={style.add_link} href="https://outlook.live.com/calendar/0/deeplink/compose?body=Industry%20meetup%20with%20focus%20on%20LIA%0ALocation:%20Lindholmspiren%203,%20417%2056%20Göteborg&startdt=2024-04-24T13:00:00&enddt=2024-04-24T15:00:00&subject=YRGO%20LIA%20event" title="Add to Outlook Calendar">
                        <h2 className={style.link}>ADD to Outlook Calendar</h2>
                    </a>
                );
            case 'apple':
                return (
                    <a className={style.add_link} href="webcal://p06-calendars.icloud.com/published/2/Nzg3OTAwOTQxMjQ4NzkwMAZBBqC0PEixXZRFRH77WUuf7EchAa1SWpw1r4XBG0mP0Ia2k-1C1avJ6jjqK6p7R4E4_D5FLFENd0As1ptf1xA" title="Add to Apple Calendar">
                        <h2 className={style.link}>ADD to Apple Calendar</h2>
                    </a>
                );
            case 'yahoo':
                return (
                    <a className={style.add_link} href="https://calendar.yahoo.com/?v=60&view=d&type=20&title=YRGO%20LIA%20event&st=20240424T130000Z&dur=0200&desc=Industry%20meetup%20with%20focus%20on%20LIA&in_loc=Lindholmspiren%203%2C%20417%2056%20G%C3%B6teborg" title="Add to Yahoo Calendar">
                        <h2 className={style.link}>ADD to Yahoo Calendar</h2>
                    </a>
                );
            // Add more cases for other calendar services as needed
            default:
                return null;
        }
    };

    return (
        <>
            <select className={style.list} value={selectedCalendar} onChange={handleCalendarChange}>
                <option value="">ADD to Calendar</option>
                <option value="google">Google Calendar</option>
                <option value="outlook">Outlook Calendar</option>
                <option value="apple">Apple Calendar</option>
                <option value="yahoo">Yahoo Calendar</option>                
            </select>
            {renderCalendarLinks()}
        </>
    );
};
/*
<add-to-calendar-button 
  name="YRGO LIA event"
  description="Industry meetup with focus on LIA"
  startDate="2024-04-24"
  startTime="15:00"
  endDate="2024-04-24"
  endTime="17:00"
  timeZone="Europe/Stockholm"
  location="Lindholmspiren 3, 417 56 Göteborg"
  options="'Apple','Google','iCal','Outlook.com','Yahoo','Microsoft365','MicrosoftTeams'"
  listStyle="overlay"
  trigger="click"
  hideBackground
  hideCheckmark
  size="3"
  lightMode="bodyScheme"
  pastDateHandling="disable"
></add-to-calendar-button>


https://calendar.app.google/9eSQrodRn2oGJSxr5
*/
export default Add_to_calendar;