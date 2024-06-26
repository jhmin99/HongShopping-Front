import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Home from './feat/Home';
import SignUp from './feat/SignUp';
import Login from './feat/Login';
import Logout from './feat/Logout';
import UserDetails from './feat/UserDetails';
import axiosInstance from '../src/config/Interceptor.js';

function App() {
  const [isSessionActive, setIsSessionActive] = useState(true);

  const resetTimeout = useCallback(() => {
    setIsSessionActive(true);
    if (window.sessionTimeout) {
      clearTimeout(window.sessionTimeout);
    }
    window.sessionTimeout = setTimeout(() => {
      setIsSessionActive(false);
      sessionStorage.removeItem('userdetails');
      window.location.href = '/signin';
    }, 1800000); // 30분
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    resetTimeout();

    return () => {
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
    };
  }, [resetTimeout]);

  useEffect(() => {
    if (!isSessionActive) {
      axiosInstance.post('/api/logout'); // 필요한 경우 서버 로그아웃도 호출
    }
  }, [isSessionActive]);

  return (
    <CookiesProvider>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mypage' element={<UserDetails />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/' element={<Navigate to='/home' />} />
      </Routes>
    </CookiesProvider>
  );
}

export default App;
