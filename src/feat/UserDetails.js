import React, { useState, useEffect, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosInstance, fetchCsrfToken } from '../config/Interceptor.js';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import '../css/UserDetails.css';

function UserDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isRedirected, setIsRedirect] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: '',
        phoneNumber: '',
        zipCode: '',
        address: '',
        addressDetail: ''
    });
    const [editingAddressId, setEditingAddressId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedUserDetails = sessionStorage.getItem('userdetails');
        if (storedUserDetails) {
            const parsedDetails = JSON.parse(storedUserDetails);
            setUserId(parsedDetails.userId);
        } else {
            setIsRedirect(true);
        }

        // 페이지 로드 시 CSRF 토큰 갱신
        fetchCsrfToken();
    }, []);

    const fetchUserDetails = useCallback(async () => {
        try {
            const response = await axiosInstance.get(`/users?userId=${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setIsRedirect(true);
            } else {
                console.log(error);
            }
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        fetchUserDetails();
    }, [userId, fetchUserDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const addOrUpdateDeliveryAddress = async () => {
        try {
            setErrorMessage(''); // Clear error message
            if (editingAddressId) {
                await axiosInstance.put(`/users/delivery-address/${editingAddressId}`, {
                    userId: userId,
                    ...newAddress
                });
                alert('Delivery address updated successfully');
            } else {
                await axiosInstance.post('/users/delivery-address', {
                    userId: userId,
                    ...newAddress
                });
                alert('Delivery address added successfully');
            }
            fetchUserDetails();
            setNewAddress({
                name: '',
                phoneNumber: '',
                zipCode: '',
                address: '',
                addressDetail: ''
            });
            setEditingAddressId(null);
        } catch (error) {
            console.error('Error adding/updating delivery address', error);
            setErrorMessage('Error adding/updating delivery address');
        }
    };

    const editDeliveryAddress = (address) => {
        setErrorMessage(''); // Clear error message
        setNewAddress({
            name: address.name,
            phoneNumber: address.phoneNumber,
            zipCode: address.zipCode,
            address: address.address,
            addressDetail: address.addressDetail
        });
        setEditingAddressId(address.id);
    };

    const deleteDeliveryAddress = async (addressId) => {
        try {
            setErrorMessage(''); // Clear error message
            await axiosInstance.delete(`/users/delivery-address/${addressId}`);
            alert('Delivery address deleted successfully');
            fetchUserDetails();
            setNewAddress({
                name: '',
                phoneNumber: '',
                zipCode: '',
                address: '',
                addressDetail: ''
            });
            setEditingAddressId(null);  // Reset form to "Add" mode
        } catch (error) {
            console.error('Error deleting delivery address', error);
            setErrorMessage('Error deleting delivery address');
        }
    };

    return (
        <Container>
            <h1 className="my-4">My Page</h1>
            {userDetails ? (
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Header>User Information</Card.Header>
                            <Card.Body>
                                <p><strong>User ID:</strong> {userDetails.identification}</p>
                                <p><strong>Username:</strong> {userDetails.name}</p>
                                <p><strong>BirthDate:</strong> {userDetails.birthDate}</p>
                                <p><strong>PhoneNumber:</strong> {userDetails.phoneNumber}</p>
                            </Card.Body>
                        </Card>
                        <Card className="mt-4">
                            <Card.Header>Delivery Addresses</Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    {userDetails.deliveryAddresses.map(address => (
                                        <ListGroup.Item key={address.id} className="list-group-item">
                                            <span>{address.name}, {address.phoneNumber}, {address.address}, {address.addressDetail}, {address.zipCode}</span>
                                            <div>
                                                <Button variant="custom-edit btn-custom me-2" onClick={() => editDeliveryAddress(address)}>Edit</Button>
                                                <Button variant="custom-delete btn-custom" onClick={() => deleteDeliveryAddress(address.id)}>Delete</Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>{editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}</Card.Header>
                            <Card.Body>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="name"
                                                    value={newAddress.name}
                                                    onChange={handleInputChange}
                                                    placeholder="Name"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="phoneNumber"
                                                    value={newAddress.phoneNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="Phone Number"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Zip Code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="zipCode"
                                                    value={newAddress.zipCode}
                                                    onChange={handleInputChange}
                                                    placeholder="Zip Code"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="address"
                                                    value={newAddress.address}
                                                    onChange={handleInputChange}
                                                    placeholder="Address"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Address Detail</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="addressDetail"
                                                    value={newAddress.addressDetail}
                                                    onChange={handleInputChange}
                                                    placeholder="Address Detail"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button variant="primary mt-3" onClick={addOrUpdateDeliveryAddress}>
                                        {editingAddressId ? 'Update' : 'Add'} Delivery Address
                                    </Button>
                                </Form>
                                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <p>Loading user details...</p>
            )}
            {isRedirected && <Navigate to="/signin" replace />}
        </Container>
    );
}

export default UserDetails;
