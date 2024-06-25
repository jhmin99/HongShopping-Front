import { Link, Navigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Container, Modal, Button } from 'react-bootstrap'; // Modal과 Button 추가
import { useState } from 'react';
import '../css/Login.css';
import axiosInstance from '../config/Interceptor';
import Home from './Home';


function Login() {
    const [identification, setIdentification] = useState('');
    const [password, setPassword] = useState('');
    const [isRedirected, setIsRedirect] = useState(false);
    const [showModal, setShowModal] = useState(false); // 모달 창 상태 추가
    const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/api/login', {
                identification,
                password
            });
            console.log('Login success:', response.data);
            
            const { accessToken, refreshToken, userId } = response.data;
            const authdata = {
                accessToken,
                refreshToken,
                userId
            };
            sessionStorage.setItem('userdetails', JSON.stringify(authdata));
            setIsRedirect(true);
        } catch (error) {
            console.error('Login failed:', error);
            setModalMessage('Login failed. Please check your ID and password.'); // 실패 메시지 설정
            setShowModal(true); // 모달 창 표시
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // 모달 창 닫기
        window.location.reload(); // 페이지 새로고침
    };

    return (
        <>
            {isRedirected ? <Navigate to="/home" /> : <Home />}
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

                {/* 실패 모달 창 */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login Failed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Login;
