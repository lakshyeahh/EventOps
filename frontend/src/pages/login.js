import {

  Box,
  Button,
  Card,
  Flex,
  Heading,

  Text,
  TextField,

} from '@radix-ui/themes';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/logo_pec.png'




function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();
      if (response.ok) {
        const { user, access_token, refresh_token } = data;

        sessionStorage.setItem('accessToken', access_token);
        sessionStorage.setItem('refreshToken', refresh_token);
        
        const userName = user.name;
        navigate('/dashboard');
        console.log("Successfully Logged In");
      } else {

        // Handle login failure (e.g., display error message)
        const data = await response.json();
        setErrorMessage(data.message);
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };



  return (
    <Flex flexShrink="0" gap="6" direction="column" width="416px" style={{ margin: 'auto', marginTop: '20px' }}>
      <Card size="4">
        <form onSubmit={handleSubmit}>
          <div style={{ backgroundColor: '#3E63DD', margin: '-31px', padding: '30px', marginBottom: '20px', height: '30px'}}>
          
          <Heading as="h3" size="6" trim="start" mb="5" style={{ color: 'white'}}>
            Login
          </Heading>
          </div>
          

          <Box mb="5">
            <Flex mb="1">
              <Text as="label" htmlFor="example-email-field" size="2" weight="bold">
                Email address
              </Text>
            </Flex>
            <TextField.Root
              placeholder="Enter your email"
              id="example-email-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          <Box mb="5" position="relative">
            <Flex align="baseline" justify="between" mb="1">
              <Text as="label" size="2" weight="bold" htmlFor="example-password-field">
                Password
              </Text>
              {/* <Link href="#" size="2" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </Link> */}
            </Flex>
            <TextField.Root
              placeholder="Enter your password"
              type="password"
              id="example-password-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>

          <Flex mt="6" justify="end" gap="3">
            <Link to="/signup">
              <Button variant="outline" type="button">
                Create an account
              </Button>
            </Link>
            <Button type="submit">Log in</Button>
          </Flex>
        </form>
      </Card>
    </Flex>

  );
}

export default Login;
