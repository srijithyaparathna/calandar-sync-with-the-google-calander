import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createClient } from '@supabase/supabase-js' ;
import { SessionContextProvider } from '@supabase/auth-helpers-react'; 


const supabase = createClient(

  "https://dzyoegjqviixuwqbgrhu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6eW9lZ2pxdmlpeHV3cWJncmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExODcyMjksImV4cCI6MjAyNjc2MzIyOX0.ibnlgaiAKSDHFN_lJZ2_Z3sMgT6c3AYmYZNt8yJRNpM"

);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase} >
    <App /> 
    </SessionContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
