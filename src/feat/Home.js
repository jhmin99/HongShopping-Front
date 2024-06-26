import '../css/Home.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';

function Home() {
    const [userdetails, setUserdetails] = useState(null);

    useEffect(() => {
        const userdetails = JSON.parse(sessionStorage.getItem('userdetails'));
        setUserdetails(userdetails); // 세션 스토리지에서 사용자 정보 가져와서 상태 업데이트
    }, []);

    useEffect(() => {
        console.log('userdetails changed:', userdetails);
    }, [userdetails]);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#">Hong Shopping</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {userdetails ? (
                            <>
                                <Nav.Link href="/mypage">Mypage</Nav.Link>
                                <Nav.Link href="/cart">Cart</Nav.Link>
                                <Nav.Link href="/wish">Wish</Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link href="/signin">Login</Nav.Link>
                        )}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Home;
