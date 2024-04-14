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




function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });


            const data = await response.json();
            if (response.ok) {
                const { user, access_token, refresh_token } = data;

                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                
                const userName = user.name;
                navigate('/dashboard');
                console.log("Successfully Signed In");
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
                    <Heading as="h3" size="6" trim="start" mb="5">
                        Sign up
                    </Heading>

                    <Box mb="5">
                        <Flex mb="1">
                            <Text as="label" htmlFor="example-name-field" size="2" weight="bold">
                                Name
                            </Text>
                        </Flex>
                        <TextField.Root
                            placeholder="Enter your name"
                            id="example-name-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Box>

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

                    <Box mb="5" position="relative">
                        <Flex align="baseline" justify="between" mb="1">
                            <Text as="label" size="2" weight="bold" htmlFor="example-password-field">
                                Repeat Password
                            </Text>

                        </Flex>
                        <TextField.Root
                            placeholder="Repeat your password"
                            type="password"
                            id="example-repeat-password-field"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    </Box>

                    <Flex mt="6" justify="end" gap="3">
                        <Link to="/login">
                            <Button variant="outline" type="button" >
                                Already a Member
                            </Button>
                        </Link>
                        <Button type="submit">Sign Up</Button>
                    </Flex>
                </form>
            </Card>
        </Flex>

    );
}

export default SignUp;
