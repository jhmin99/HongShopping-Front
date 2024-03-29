import { Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { getCookie } from '../utils/CookieUtils';
import axios from 'axios';

function Logout() {
    const [isRedirected, setIsRedirect] = useState(false);
    const token = getCookie('XSRF-TOKEN');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:8080/api/logout',
                null,
                {
                    headers: {
                        'X-XSRF-TOKEN': token // CSRF 토큰을 요청 헤더에 포함
                    },
                    withCredentials: true
                }
            );
            console.log('Logout success');
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
