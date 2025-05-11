import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Unlogged from './Pages/LoggedOut';
import LoggedIn from './Pages/LoggedIn';

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
    <div className="App">
      {isLoggedIn ? (
        <LoggedIn user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      ) : (
        <Unlogged setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
