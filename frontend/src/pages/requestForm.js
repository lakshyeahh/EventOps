import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import './styles/requestform.css';
import { Heading, Box, RadioCards, Flex, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import * as RadioGroup from '@radix-ui/react-radio-group';
import Nabvar from '../components/navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const RequestForm = () => {
  const [clubName, setClubName] = useState('');
  const [eventName, setEventName] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [eventMode, setEventMode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [expectedParticipation, setExpectedParticipation] = useState('');
  const [dateTime, setDateTime] = useState(null);
  const navigate = useNavigate();


  const handleDateChange = async (date) => {
    setDateTime(date);
    try {
      const response = await fetch('/api/cards/room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dateTime: date }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Data received:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('accessToken');
        if (!token) {
          navigate('/');
          return;
        }
        
        const responseu = await fetch('/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const datau = await responseu.json();
        const author = datau._id.toString();
        
        

console.log('Selected Date:', dateTime);
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clubName, eventName, briefDescription, eventMode, roomNumber, expectedParticipation, author, dateTime })
      });

      

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      
      navigate('/dashboard');
      
      // Handle success response from backend
      console.log('Form submitted successfully');
    } catch (error) {

      // setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
    <div>
      <Nabvar/>
   
      <div className="form-container" style={{ display: 'grid', height: '110vh', margin: '30px' }}>
  <div className='heading-container' style={{ backgroundColor: 'blue', margin: '-50px',marginBottom: '20px', padding: '50px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '20px'}}>
    <h3 style={{ textAlign: 'center', color: 'white' }}>
      Fill Event Details
    </h3>
  </div>
  
  <form className="FormRoot" onSubmit={handleSubmit}>
    <div className='club-event' style={{ display: 'flex', gap: '70px' }}>
      <div className="FormField">
        <div style={{ display: 'flex', alignItems: 'baseline' , justifyContent: 'space-between'}}>
          <label className="FormLabel">Club Name</label>
          <p className="FormMessage" style={{ color: 'red' }}>
            Enter Club Name
          </p>
        </div>
        <input className="Input" type="text" required value={clubName} onChange={(e) => setClubName(e.target.value)} />
      </div>
      <div className="FormField">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <label className="FormLabel">Event Name</label>
          <p className="FormMessage" style={{ color: 'red' }}>
          Enter Event Name
          </p>
        </div>
        <input className="Input" type="text" required value={eventName} onChange={(e) => setEventName(e.target.value)} />
      </div>
    </div>

    <div className="FormField">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <label className="FormLabel">Brief Description</label>
        <p className="FormMessage" style={{ color: 'red' }}>
        Enter Brief Description Name
        </p>
      </div>
      <textarea className="Textarea" required value={briefDescription} style={{ width: '67rem', height: '8rem' }} onChange={(e) => setBriefDescription(e.target.value)} />
    </div>

    <div className="FormField">
  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
    <label className="FormLabel">Event Mode (Online/Offline)</label>
    <p className="FormMessage" style={{ color: 'red' }}>
      Choose Mode
    </p>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <input
    type="radio"
    id="online"
    value="Online"
    checked={eventMode === 'Online'}
    onChange={() => setEventMode('Online')}
    style={{ appearance: 'none', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc', outline: 'none', cursor: 'pointer' }}
  />
  <label htmlFor="online" style={{ cursor: 'pointer' }}>Online</label>
  <input
    type="radio"
    id="offline"
    value="Offline"
    checked={eventMode === 'Offline'}
    onChange={() => setEventMode('Offline')}
    style={{ appearance: 'none', width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #ccc', outline: 'none', cursor: 'pointer' }}
  />
  <label htmlFor="offline" style={{ cursor: 'pointer' }}>Offline</label>
</div>

</div>

<div className="form-group">
        <label htmlFor="datePicker">Select Date and Time:</label>
        <br />
        <DatePicker
          id="datePicker"
          selected={dateTime}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
        />
      </div>

    <div className="FormField">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <label className="FormLabel">Room Number</label>
        <p className="FormMessage" style={{ color: 'red' }}>
Choose Room Number
        </p>
      </div>
      <input className="Input" type="text" required value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
    </div>
  
    <div className='party-audi' style={{display: 'flex', gap: '70px'}}>
      <div className="FormField">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <label className="FormLabel">Expected Participation</label>
          <p className="FormMessage" style={{ color: 'red' }}>
Enter Expected Participation
          </p>
        </div>
        <input className="Input" type="number" required value={expectedParticipation} onChange={(e) => setExpectedParticipation(e.target.value)} />
      </div>
      <div className="FormField">
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <label className="FormLabel">Audience</label>
          <p className="FormMessage" style={{ color: 'red' }}>
Enter Audience
          </p>
        </div>
        <input className="Input" type="text" required />
      </div>
    </div>
    
    <button type="submit" className="Button" style={{ marginTop: '20px', width: '65rem' }}>
      Submit
    </button>
  </form>
</div>
</div>
  )
}

export default RequestForm;