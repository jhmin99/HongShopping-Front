import './App.css';
import SignUp from './feat/SignUp';
import Home from './feat/Home';
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </>


  );
}

export default App;
