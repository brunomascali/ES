import { useEffect, useState } from 'react';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(String);
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUser(userData.name);
    }
  }, []);
  
  return (
    <div className="App">
      {isLoggedIn && user ? (
        <>
        <h1>Bem vindo {user}</h1>
        <button onClick={() => {
          localStorage.removeItem('user');
          setIsLoggedIn(false);
        }}>Sair</button>
        </>
      ) : (
        <>
          <Signup />
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
