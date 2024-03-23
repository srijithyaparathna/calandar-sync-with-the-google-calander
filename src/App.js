import React from 'react';
import Calendar from './calander.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from './home.js';
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <Home></Home>
    </div>
    </LocalizationProvider>
  );
}

export default App;
