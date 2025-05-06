import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import UserList, { User } from './Components/UserList';

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/users")
    .then(response => {
      setUsers(response.data)
    })
    .catch(error => console.log(error))
    .finally(() => {})
  }, [])

  return (
    <div className="App">
      <UserList users={users} />
    </div>
  );
}

export default App;
