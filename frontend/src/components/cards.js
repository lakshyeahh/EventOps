import React, { useState, useEffect } from 'react';

import { Box, Card, Flex, Text, Button } from '@radix-ui/themes';
// import { io } from 'socket.io-client';


// const socket = io('/', {
//     reconnection: true
// })

const Cards = () => {
    
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);


    


        const fetchEventData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('/api/cards', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setEventData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        useEffect(() => {
        fetchEventData();



    }, []);

    // useEffect(() => {
    //     console.log('SOCKET IO', socket);
    //     socket.on('new-comment', () => {
    //         fetchEventData();
    //     })
    // }, [])

    const handleApprove =  async (eventId) => {
        try{
            const response = await fetch(`/api/cards/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to patch event');
            }
        
            fetchEventData();
            

        }catch(error) {
            // Handle any errors that occur during the request
            console.error('Error patching event:', error);
        }
    };

    // let uiEventUpdate = eventData;
    return (
        <Box width="70%" className="cards-container" align="center" margin="20px">
            {eventData.map(event => (
                <Card key={event._id} size="3" className="event-card">
                    <Flex gap="4" align="center">
                        <Box>
                            <Text as="div" size="4" weight="bold">
                                {event.clubName}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                EVENT: {event.eventName}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                DESP: {event.briefDescription}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                MODE: {event.eventMode}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                AUD: {event.expectedParticipation}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                ROOM: {event.roomNumber}
                            </Text>
                        </Box>
                        <Button color="green" onClick={() => handleApprove(event._id)}>
                            Approve
                        </Button>
                    </Flex>
                </Card>
            ))}
            {/* Display error message if there's an error */}
            {error && <div>Error: {error}</div>}
        </Box>
    );
}

export default Cards;
