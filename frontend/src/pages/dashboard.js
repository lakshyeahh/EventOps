import { Flex, Heading, Button } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../components/cards';
import { useNavigate } from 'react-router-dom';
import Nabvar from '../components/navbar';





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
      }catch{

      }
    };

    fetchMeData();
  }, []);

        
  return (
    <div>
 <Nabvar/>
    <Cards/>
  </div>
  
  )

}

export default Dashboard;
