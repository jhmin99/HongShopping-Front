import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import '../css/Home.css'
import { Container } from 'react-bootstrap';

function Home() {

    return (
        <Container>
            <p className='title'>
                Login
            </p>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter ID" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <button className="mb-3" type="submit">
                    Login
                </button>

            </Form>
            <span> Don't have an accout? </span>
            <Link to='/signup'>
                SignUp Now
            </Link>
        </Container>

    );
}
export default Home;