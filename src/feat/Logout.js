import { Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axiosInstance from '../config/Interceptor.js';

function Logout() {
    const [isRedirected, setIsRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/api/logout');
            console.log('Logout success');
            sessionStorage.removeItem('userdetails');  // 사용자 정보 제거
            setIsRedirect(true);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        if (isRedirected) {
            window.location.reload();  // 페이지 새로고침
        }
    }, [isRedirected]);

    return (
        <Container>
            <p className='title'>Logout</p>
            <button type="button" onClick={handleSubmit}>Logout</button>
            {isRedirected && <Navigate to="/home" />}
        </Container>
    );
}

export default Logout;
