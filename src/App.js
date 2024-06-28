import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import SignUp from './feat/SignUp';
import Login from './feat/Login';
import Logout from './feat/Logout';
import UserDetails from './feat/UserDetails';
import { axiosInstance } from './config/Interceptor';
import { CsrfProvider } from './context/CsrfTokenContext';
import MainLayout from './feat/MainLayout';
import { UserProvider } from './context/UserContext';

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
    <CsrfProvider>
      <CookiesProvider>
        <UserProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='/home' element={<div />} /> {/* Home 컴포넌트를 중복해서 렌더링하지 않도록 div로 대체 */}
              <Route path='/signin' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/mypage' element={<UserDetails />} />
              <Route path='/logout' element={<Logout />} />
            </Route>
          </Routes>
        </UserProvider>
      </CookiesProvider>
    </CsrfProvider>
  );
}

export default App;
