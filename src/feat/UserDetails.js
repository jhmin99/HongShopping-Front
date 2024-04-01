import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Navigate } from 'react-router-dom'; // useParams 추가

function UserDetails() {
    const [userDetails, setUserDetails] = useState(null);
    const { id } = useParams(); // URL 매개변수 읽기
    const [isRedirected, setIsRedirect] = useState(false);

    useEffect(() => {
        // 사용자 정보를 가져오는 API 호출
        const fetchUserDetails = async () => {
            try {

                const response = await axios.get(`http://localhost:8080/api/users?id=${id}`
                );
                setUserDetails(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsRedirect(true);
                } else {
                    console.log(error);
                }
            }
        };

        fetchUserDetails(); // useEffect가 마운트될 때 한 번만 호출되도록 함
    }, [id]);

    return (

        <div>
            <h1>User Details</h1>
            {userDetails ? (
                <div>
                    <p>User ID: {userDetails.identification}</p>
                    <p>Username: {userDetails.name}</p>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
            {isRedirected && <Navigate to="/signin" />}
        </div>
    );
}

export default UserDetails;
