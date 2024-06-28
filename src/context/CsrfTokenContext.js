import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchCsrfToken } from '../config/Interceptor';

const CsrfContext = createContext();

const CsrfProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState('');

    const updateCsrfToken = useCallback(async () => {
        try {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        } catch (error) {
            console.error('Error updating CSRF token', error);
        }
    }, []);

    useEffect(() => {
        updateCsrfToken();
    }, [updateCsrfToken]);

    return (
        <CsrfContext.Provider value={{ csrfToken, updateCsrfToken }}>
            {children}
        </CsrfContext.Provider>
    );
};

export { CsrfContext, CsrfProvider };
