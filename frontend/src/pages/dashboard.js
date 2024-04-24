import { Flex, Heading, Button } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/cards';
import { useNavigate } from 'react-router-dom';
import Nabvar from '../components/navbar';
import Calender from '../components/calender';





function Dashboard() {
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
      } catch {

      }
    };

    fetchMeData();
  }, []);


  return (
    <div>
      <Nabvar />
      <div style={{ display: 'flex' }}>
        <div className='cards-container' style={{ flex: '2' }}>
          <Cards />
        </div>
        <div className='calender-container' style={{ flex: '1', margin: '25px', borderRadius: '10px', padding: '20px'}}  >
          <Calender />

        </div>


      </div>

    </div>

  )

}

export default Dashboard;
