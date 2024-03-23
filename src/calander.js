import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import SmallCalander from './smallcalander.js';


const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse, 
  startOfWeek,
  getDay,
  locales,
});

const initialNewEvent = {
  title: "",
  start: new Date(),
  end: new Date(),
};

function App() {

  

  const [newEvent, setNewEvent] = useState(initialNewEvent);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  const [newDescription, setNewDescription] = useState("");
  const [allDescriptions, setAllDescriptions] = useState([]);
  const [selectedDescriptionIndex, setSelectedDescriptionIndex] = useState(null);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    setNewEvent(initialNewEvent);
  };

  const handleAddDescription = () => {
    setAllDescriptions([...allDescriptions, newDescription]);
    setNewDescription("");
  };

  const handleEditEvent = () => {
    if (selectedEventIndex !== null) {
      const updatedEvents = [...allEvents];
      updatedEvents[selectedEventIndex] = { ...newEvent };
      setAllEvents(updatedEvents);
      setSelectedEventIndex(null);
    }
  };

  const handleEditDescription = () => {
    if (selectedDescriptionIndex !== null) {
      const updatedDescriptions = [...allDescriptions];
      updatedDescriptions[selectedDescriptionIndex] = newDescription;
      setAllDescriptions(updatedDescriptions);
      setSelectedDescriptionIndex(null);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEventIndex !== null) {
      const updatedEvents = allEvents.filter((event, index) => index !== selectedEventIndex);
      setAllEvents(updatedEvents);
      setSelectedEventIndex(null);
    }
  };

  const handleDeleteDescription = () => {
    if (selectedDescriptionIndex !== null) {
      const updatedDescriptions = allDescriptions.filter((description, index) => index !== selectedDescriptionIndex);
      setAllDescriptions(updatedDescriptions);
      setSelectedDescriptionIndex(null);
    }
  };

  return (
    <div className="App">
      <div>
       
          <>
            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div>
              <input
                type="text"
                placeholder="Add Title"
                style={{ width: '20%', marginRight: "10px" }}
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Add Description"
                style={{ width: '20%', marginRight: "10px" }}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <DatePicker
                placeholderText="Start Date"
                showTimeSelect
                dateFormat="Pp"
                style={{ marginRight: "10px" }}
                selected={newEvent.start}
                onChange={(start) => setNewEvent({ ...newEvent, start })}
              />
              <DatePicker
                placeholderText="End Date"
                showTimeSelect
                dateFormat="Pp"
                style={{ marginRight: "10px" }}
                selected={newEvent.end}
                onChange={(end) => setNewEvent({ ...newEvent, end })}
              />
              <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>Add Event</button>
              <button style={{ marginTop: "10px" }} onClick={handleEditEvent}>Edit Event</button>
              <button style={{ marginTop: "10px" }} onClick={handleDeleteEvent}>Delete Event</button>
            </div>

            <div className="App" style={{ display: "flex" }}>
              <SmallCalander />
              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, width: 1000, marginLeft: 50, marginTop: 50 }}
              />
            </div>
          </>
       
      </div>
    </div>
  );
}

export default App;
