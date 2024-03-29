import { Link, Navigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import '../css/Login.css'

function Login() {

    const [identification, setIdentification] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirected, setIsRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                identification,
                password
            });
            console.log('Login success:', response.data);
            setIsRedirect(true);
            // 로그인 성공 시 추가 작업 수행
        } catch (error) {
            console.error('Login failed:', error);
            // 로그인 실패 시 에러 처리
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
            <span> Don't have an accout? </span>
            <Link to='/signup'>
                SignUp Now
            </Link>

            {/* 응답 또는 오류 메시지 출력 */}
            {isRedirected && <Navigate to = "/home"/>}

        </Container>

    );
}
export default Login;