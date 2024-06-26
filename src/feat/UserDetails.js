import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/Interceptor.js';

function UserDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isRedirected, setIsRedirect] = useState(false);

    useEffect(() => {
        // sessionStorage에서 userdetails 가져오기
        const storedUserDetails = sessionStorage.getItem('userdetails');
        if (storedUserDetails) {
            const parsedDetails = JSON.parse(storedUserDetails);
            setUserId(parsedDetails.userId);
        } else {
            setIsRedirect(true);
        }
    }, []);

    useEffect(() => {
        if (!userId) return;

        // 사용자 정보를 가져오는 API 호출
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get(`/api/users?userId=${userId}`);
                setUserDetails(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsRedirect(true);
                } else {
                    console.log(error);
                }
            }
        };

        fetchUserDetails();
    }, [userId]);

    const addDeliveryAddress = () => {
        // 배송지 추가하는 로직
    };

    return (
        <div>
            <h1>My Page</h1>
            {userDetails ? (
                <div>
                    <p>User ID: {userDetails.identification}</p>
                    <p>Username: {userDetails.name}</p>
                    <p>BirthDate: {userDetails.birthDate}</p>
                    <p>PhoneNumber: {userDetails.phoneNumber}</p>
                    <p>Delivery Addresses: </p>
                    <ul>
                        {userDetails.deliveryAddresses.map(address => (
                            <li key={address.deliveryAddressId}>
                                {address.name}, {address.phoneNumber}, {address.address}, {address.addressDetail}, {address.zipCode}
                            </li>
                        ))}
                    </ul>
                    <button onClick={addDeliveryAddress}>Add Delivery Address</button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            {isRedirected && <Navigate to="/signin" />}
        </div>
    );
}

export default UserDetails;
