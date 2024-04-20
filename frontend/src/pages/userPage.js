import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Card, Inset } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import Nabvar from '../components/navbar';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeData = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) {
          navigate('/');
          return;
          throw new Error('Access token not found');
        }

        const response = await fetch('/api/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMeData();
  }, []);

  return (
    <div>
      <Nabvar/>
    
    <Box
    maxWidth="500px"
    style={{ margin: 'auto', marginTop: '50px', transition: 'transform 0.3s' }}
    css={{
      '&:hover': {
        transform: 'scale(1.05)', // Increase scale on hover
      },
    }}
  >
    {error && <p>{error}</p>}
    <Card size="2">
      <Inset clip="padding-box" side="top" pb="current">
        <img
          src="https://pbblogassets.s3.amazonaws.com/uploads/2015/11/4k-uncropped.jpg"
          alt="Bold typography"
          style={{
            display: 'block',
            objectFit: 'cover',
            width: '100%',
            height: 140,
            backgroundColor: 'var(--gray-5)',
          }}
        />
      </Inset>
      {userData && (
        <div>
          <Heading as="h2" size="4">
            User Data
          </Heading>
          <Text as="p">Name: {userData.name}</Text>
          <Text as="p">Email: {userData.email}</Text>
          {/* Render other user data fields as needed */}
        </div>
      )}
    </Card>
  </Box>
  </div>
  );
}

export default UserPage;
