import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
function App() {
  const [start, setStart] = useState(new dayjs());
  const [end, setEnd] = useState(new dayjs());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); // tokens, when session exists we have a user
  const supabase = useSupabaseClient(); // talk to supabase!
  const { isLoading } = useSessionContext();  
  
  if (isLoading) {
    return <></>
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    console.log("Creating calendar event");
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      },
      'end': {
        'dateTime': end.toISOString(), // Date.toISOString() ->
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
      }
    }
    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        'Authorization':'Bearer ' + session.provider_token // Access token for google
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    });
  }

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);
  return (
    <div className="App">
      <div style={{ maxWidth: "800px", margin: "30px auto" }}>
        {session ?
          <>
            <h2>Hey there {session.user.email}</h2>
            <p>Start of your event</p>
            <DateTimePicker label="Basic date time picker" value={start}
              onChange={(newValue) => setStart(newValue)}
                /> 
            <p>End of your event</p>
            <DateTimePicker label="Basic date time picker" value={end}
            onChange={(newValue) => setEnd(newValue)}
            />
            {/* <DateTimePicker
              onChange={setEnd}
              value={end}
              calendarClassName="custom-calendar"
              format="dd/MM/yyyy hh:mm a"
              className="datetime-picker"
              style={{ marginBottom: "20px", width: "100%" }}
            /> */}
            <p>Event name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} style={{ marginBottom: "10px", width: "100%" }} />
            <p>Event description</p>
            <textarea onChange={(e) => setEventDescription(e.target.value)} style={{ marginBottom: "20px", width: "100%", minHeight: "200px" }} />
            <hr />
            <button onClick={() => createCalendarEvent()}>Create Calendar Event</button>
            <p style={{ marginTop: "10px" }}></p>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
          :
          <>
            <button onClick={() => googleSignIn()}>Sign In With Google</button>
          </>
        }
      </div>
    </div>
  );
}

export default App;
