import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import './requestform.css';
import { Heading, Box, RadioCards, Flex, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import * as RadioGroup from '@radix-ui/react-radio-group';


const RequestForm = () => {
  const [clubName, setClubName] = useState('');
  const [eventName, setEventName] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [eventMode, setEventMode] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [expectedParticipation, setExpectedParticipation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clubName, eventName, briefDescription, eventMode, roomNumber, expectedParticipation })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const { event_token, eventData } = data;
      console.log(event_token);
      
      // Manually encode the event_token
      const encodedToken = encodeURIComponent(event_token);
      
      const queryParams = new URLSearchParams(encodedToken);
      navigate(`/dashboard/requestform/${queryParams}`);
      
      // Handle success response from backend
      console.log('Form submitted successfully');
    } catch (error) {

      // setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
    <div className="form-container" style={{ display: 'grid', height: '110vh', margin: '30px' }}>
      <div className='heading-container' style={{ backgroundColor: 'blue', margin: '-50px',marginBottom: '20px', padding: '50px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '20px'}}>
      <Heading as="h3" size="6" trim="start" mb="5" style={{ textAlign: 'center', color: 'white' }}>
        Fill Event Details
      </Heading>
      </div>
      
      <Form.Root className="FormRoot" onSubmit={handleSubmit}>
        <div className='club-event' style={{ display: 'flex', gap: '70px' }}>
          <Form.Field className="FormField" name="clubName">
            <div style={{ display: 'flex', alignItems: 'baseline' , justifyContent: 'space-between'}}>
              <Form.Label className="FormLabel">Club Name</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter the club name
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="text" required value={clubName}
                onChange={(e) => setClubName(e.target.value)} />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="eventName">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Form.Label className="FormLabel">Event Name</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter the event name
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="Input" type="text" required value={eventName}
                onChange={(e) => setEventName(e.target.value)} />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Field className="FormField" name="briefDescription">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Brief Description</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a brief description
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="Textarea" required value={briefDescription} style={{ width: '67rem', height: '8rem' }}
              onChange={(e) => setBriefDescription(e.target.value)} />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="eventMode">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Event Mode</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the event mode
            </Form.Message>
          </div>

          {/* <RadioGroup.Root
  className="RadioGroupRoot"
  defaultValue={eventMode}
  aria-label="Event Mode"
  onChange={(value) => setEventMode(value)}
>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <RadioGroup.Item className="RadioGroupItem" value="Online" id="r1">
      <RadioGroup.Indicator className="RadioGroupIndicator" />
    </RadioGroup.Item>
    <label className="Label" htmlFor="r1" style={{ color: 'black' }}>
      ONLINE
    </label>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <RadioGroup.Item className="RadioGroupItem" value="Offline" id="r2">
      <RadioGroup.Indicator className="RadioGroupIndicator" />
    </RadioGroup.Item>
    <label className="Label" htmlFor="r2" style={{ color: 'black' }}>
      OFFLINE
    </label>
  </div>
</RadioGroup.Root> */}
<Form.Control asChild>
              <input className="Input" type="text" required value={eventMode}
                onChange={(e) => setEventMode(e.target.value)} />
            </Form.Control>
      
       




        </Form.Field>
        <Form.Field className="FormField" name="roomNumber">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Room Number</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the room number
            </Form.Message>
          </div>
          {/* <Box maxWidth="600px">
  <RadioCards.Root defaultValue={roomNumber} columns={{ initial: '1', sm: '3' }} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
    <RadioCards.Item value="L20" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 20</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L21" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 21</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L22" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 22</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L23" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 23</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L24" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 24</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L29" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 29</Text>
      </Flex>
    </RadioCards.Item>
    <RadioCards.Item value="L30" className="radio-card" style={{ width: '90px', height: '50px' }}>
      <Flex direction="column">
        <Text weight="bold">L 30</Text>
      </Flex>
    </RadioCards.Item>
  </RadioCards.Root>
</Box> */}
 <Form.Control asChild>
              <input className="Input" type="text" required value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)} />
            </Form.Control>
          </Form.Field>
       
        <div className='party-audi' style={{display: 'flex', gap: '70px'}}>
        <Form.Field className="FormField" name="expectedParticipation">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Expected Participation</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the expected participation
            </Form.Message>
          </div>
          
          <Form.Control asChild>
            <input className="Input" type="number" required value={expectedParticipation}
              onChange={(e) => setExpectedParticipation(e.target.value)} />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="expectedParticipatio">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">Audience</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter the expected audience
            </Form.Message>
          </div>
          
          <Form.Control asChild>
            <input className="Input" type="text" required 
              />
          </Form.Control>
        </Form.Field>
          </div>
        <Form.Submit asChild>
          <button type="submit" className="Button" style={{ marginTop: '20px', width: '65rem' }}>
            Submit
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  )
}

export default RequestForm;