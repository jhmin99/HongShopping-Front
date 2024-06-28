import React from 'react';
import { Outlet } from 'react-router-dom';
import Home from './Home';

const MainLayout = () => {
  return (
    <div>
      <Home />
      <Outlet />
    </div>
  );
};

export default MainLayout;
