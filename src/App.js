import './App.css';
import SignUp from './feat/SignUp';
import Login from './feat/Login';
import Home from './feat/Home';
import Logout from './feat/Logout';
import UserDetails from './feat/UserDetails';
import { Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function App() {


  return (
    <CookiesProvider>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/users/:id' element={<UserDetails />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </CookiesProvider>



  );
}

export default App;
