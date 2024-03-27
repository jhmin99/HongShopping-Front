import './App.css';
import SignUp from './feat/SignUp';
import Login from './feat/Login';
import Home from './feat/Home';
import UserDetails from './feat/UserDetails';
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signin' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/users/:id' element={<UserDetails/>}/> 
      </Routes>
    </>


  );
}

export default App;
