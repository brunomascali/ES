import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import Caronas from './Components/Caronas';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData.name);
        setIsLoggedIn(true);
      } catch (e) {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser('');
      }
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/caronas" element={<Caronas />} />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          </>

        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
