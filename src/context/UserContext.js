import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userdetails, setUserdetails] = useState(null);

    useEffect(() => {
        const storedUserDetails = sessionStorage.getItem('userdetails');
        if (storedUserDetails) {
            setUserdetails(JSON.parse(storedUserDetails));
        }
    }, []);

    return (
        <UserContext.Provider value={{ userdetails, setUserdetails }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
