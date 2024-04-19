import React, { useState, useEffect } from 'react';
import { Box, Card, Flex, Text, Button, Badge } from '@radix-ui/themes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('/', {
    reconnection: true
})

const Cards = () => {
    const [userData, setUserData] = useState(null);
    const [eventData, setEventData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchEventData = async () => {
        try {
            const token = sessionStorage.getItem('accessToken');
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
            const { user, cards } = data;
            setUserData(user);
            setEventData(cards);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchEventData();
    }, []);

    useEffect(() => {
        // console.log('SOCKET IO', socket);
        socket.on('new-add', () => {
            fetchEventData();
        })
    }, [])

    const handleApprove = async (eventId) => {
        try {
            const response = await fetch(`/api/cards/${eventId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('NO EVENTS CURRENTLY');
            }


            toast.success('Event Approved Successfully');
            fetchEventData();
            socket.emit('add');
        } catch (error) {
            console.error('Error patching event:', error);
        }
    };

    const handleDownload = async (event_token) => {
     
        const encodedToken = encodeURIComponent(event_token);
      
        const queryParams = new URLSearchParams(encodedToken);
        navigate(`/dashboard/requestform/${queryParams}`);
            


            
            
        
    };

    return (
        
        <Flex  style={{margin: '20px', justifyContent: "center"}}>
        <Box width="70%" className="cards-container" align="center" margin="20px" >
            {eventData.map(event => (
                <Card key={event._id} size="3" className="event-card" style={{marginBottom: '20px'}}>
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
                        {/* Conditionally render status or approve button based on whether the user is the author */}
                        {userData && userData._id === event.author ? (
                            <Text as="div" size="2" color="gray">
                                {/* Additional conditions for displaying messages based on index */}
                                {event.index === 5 ? (
                                    <div style={{ display: 'flex', gap: '30px' }}>
                                        <Badge color="green">Approved</Badge>
                                        <Button color='blue' onClick={() => handleDownload(event._id)}>Download Letter</Button>
                                    </div>
                                ) : event.index === 1 ? (
                                    <div style={{ display: 'flex', gap: '30px' }}>
                                        <Badge color="orange">In progress</Badge>
                                        <Text style={{ fontWeight: 'bold' }}>Waiting for CCS Head approval</Text>
                                    </div>

                                ) : event.index === 2 ? (
                                    <div style={{ display: 'flex', gap: '30px' }}>
                                        <Badge color="orange">In progress</Badge>
                                        <Text style={{ fontWeight: 'bold' }}>Waiting for Tech Head approval</Text>
                                    </div>


                                ) : event.index === 3 ? (
                                    <div style={{ display: 'flex', gap: '30px' }}>
                                        <Badge color="orange">In progress</Badge>
                                        <Text style={{ fontWeight: 'bold' }}>Waiting for Sec Head approval</Text>
                                    </div>


                                ) : event.index === 4 ? (
                                    <div style={{ display: 'flex', gap: '30px' }}>
                                        <Badge color="orange">In progress</Badge>
                                        <Text style={{ fontWeight: 'bold' }}>Waiting for Office Head approval</Text>
                                    </div>


                                ) : (
                                    <Badge color="orange" >In progress</Badge>
                                )}
                            </Text>
                        ) : (
                            <Button color="green" onClick={() => handleApprove(event._id)}>
                                Approve
                            </Button>
                        )}


                    </Flex>
                </Card>
            ))}
            {/* Display error message if there's an error */}
            {error && <div>Error: {error}</div>}
            {/* ToastContainer for displaying toast notifications */}
            <ToastContainer />
        </Box>
        </Flex>
    );
};

export default Cards;
