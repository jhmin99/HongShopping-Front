import { Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from '../config/Interceptor.js';
import axiosInstance from '../config/Interceptor.js';

function Logout() {
    const [isRedirected, setIsRedirect] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(
                '/api/logout'
            );
            console.log('Logout success');
            if(sessionStorage.getItem('userdetails')){
                sessionStorage.removeItem('userdetails');
            }
            setIsRedirect(true);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Container>
            <p className='title'>
                Logout
            </p>
            {isRedirected && <Navigate to="/home" />}
            <button type="button" onClick={handleSubmit}>
                Logout
            </button>
            {isRedirected && <Navigate to = "/home"/>}
        </Container>
    );
}
export default Logout;
