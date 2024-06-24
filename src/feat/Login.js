import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import '../css/Login.css'
import { getCookie } from '../utils/CookieUtils';
import axiosInstance from '../config/Interceptor';

function Login() {

    const [identification, setIdentification] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirected, setIsRedirect] = useState(false);
    const token = getCookie('XSRF-TOKEN');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/login', {
                identification,
                password
            });
            console.log('Login success:', response.data);
            console.log(token);
            setIsRedirect(true);
            const authdata = window.btoa(identification + ':' + password);
            sessionStorage.setItem('userdetails', JSON.stringify(authdata));

        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <Container>
            <p className='title'>
                Login
            </p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                        type="text"
                        value={identification}
                        onChange={(event) => setIdentification(event.target.value)}
                        placeholder="Enter ID" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password" />
                </Form.Group>
                <button className="mb-3" type="submit">
                    Login
                </button>
            </Form>
            <span> Don't have an account? </span>
            <Link to='/signup'>
                SignUp Now
            </Link>
            {isRedirected && <Navigate to="/home" />}
        </Container>
    );
}
export default Login;
