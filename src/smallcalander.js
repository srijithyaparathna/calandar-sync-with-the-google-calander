// smallcalander.js
import React, { useState } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./smallcalander.css"
const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div>
      <Calendar showWeekNumbers onChange={onChange} value={date} />
      {console.log(date)}
     
    </div>
  );
};

export default ReactCalendar;
