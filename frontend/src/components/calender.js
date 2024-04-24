import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { Box, Card, Flex, Text, Button, Badge } from '@radix-ui/themes';

import "react-datepicker/dist/react-datepicker.css";

function CalendarComponent() {
  const [startDate, setStartDate] = useState(new Date());
    const [error, setError] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [highlightedDates, setHighlightedDates] = useState([]);
    const datePickerRef = useRef(true);

  const fetchDates = async () => {
        try {
          const response = await fetch(`/api/cards/date`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ roomNumber })
          });
          
          if (!response.ok) {
            throw new Error('Failed to fetch dates');
          }
          const data = await response.json();

      const formattedDates = data.map(dateString => {
        const [year, month, day] = dateString.split(',').map(Number);
        return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
      });

      setHighlightedDates(formattedDates);
      showCalendar(); 
      setError('');
    } catch (error) {
            console.error('Error fetching dates:', error);
            setError('Failed to fetch dates. Please try again.');
          }
        };
        
        useEffect(() => {
          fetchDates();
        }, []);
  // const highlightedDates = [
  //   new Date(2024, 3, 22),
  //   new Date(2024, 3, 24)
  // ];
  const showCalendar = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // Open the date picker
    }
  };
  const CustomInput = ({ value, onClick }) => (
    <button onClick={onClick} style={{ visibility: 'hidden' }}>
      {value}
    </button>
  );

  return (

    <div style={{ margin: '30px', justifySelf: 'center'}}>
      <div style={{border: '2px solid grey', padding: '20px', borderRadius: '10px'}}>
      <input
        type="text"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        placeholder="Enter room number"
      />
       <Button onClick={fetchDates}>Fetch Dates</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      
      <div style={{ textAlign: 'center'}}>
      <DatePicker 
  selected={startDate}
  minDate={new Date()}
  onChange={(date) => setStartDate(date)}
  highlightDates={highlightedDates}
  ref={datePickerRef}
  customInput={<CustomInput />}
  className="custom-datepicker" // You can also apply a CSS class for further styling
  style={{
    borderRadius: '20px',
    fontSize: '16px'

    // Add more styles as needed
  }}
/>

      </div>
     
    </div>
  );
}

export default CalendarComponent;
// import React, { useState, useRef } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function CalendarComponent() {
//   const [startDate, setStartDate] = useState(new Date());
//   const [roomNumber, setRoomNumber] = useState('');
//   const [highlightedDates, setHighlightedDates] = useState([]);
//   const [error, setError] = useState('');
//   const datePickerRef = useRef(null);

//   const fetchDates = async () => {
//     try {
//       const response = await fetch(`/api/cards/date`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ roomNumber })
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch dates');
//       }
//       const data = await response.json();
//       console.log(data);
//       // const highlightedDates = data.map(dateString => {
//       //   const [year, month, day] = dateString.split(',').map(Number);
//       //   return new Date(year, month - 1, day); // Month is zero-based in JavaScript Date
//       // });
//       const highlightedDates = [
//         new Date(2024, 3,25)
//       ]
      
//       console.log(highlightedDates);
//       setError('');
//       showCalendar(); // Show the calendar after fetching dates
//     } catch (error) {
//       console.error('Error fetching dates:', error);
//       setError('Failed to fetch dates. Please try again.');
//     }
//   };

//   const showCalendar = () => {
//     if (datePickerRef.current) {
//       datePickerRef.current.setOpen(true); // Open the date picker
//     }
//   };

//   return (
//     <div style={{ margin: '30px' }}>
//       <h2>Calendar Component</h2>
//       <DatePicker
//         selected={startDate}
//         onChange={date => setStartDate(date)}
//         minDate={new Date()}
//         dateFormat="dd/MM/yyyy"
//         highlightDates={highlightedDates}
//       />
//     </div>
//   );
// }

// export default CalendarComponent;


