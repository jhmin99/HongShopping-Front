import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { axiosInstance } from '../config/Interceptor.js';

function Logout() {
    const [isRedirected, setIsRedirect] = useState(false);

    const handleSubmit = async () => {
        try {
            await axiosInstance.post('/logout');
            console.log('Logout success');
            sessionStorage.removeItem('userdetails');  // 사용자 정보 제거
            setIsRedirect(true);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Container>
            <p className='title'>Logout</p>
            <button type="button" onClick={handleSubmit}>Logout</button>
            {isRedirected && <Navigate to="/signin" replace />}
        </Container>
    );
}

export default Logout;
