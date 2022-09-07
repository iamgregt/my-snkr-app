import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  if(user) {
    console.log(`Welcome back ${user.username}`)
  }

  return (
    <>
    {user ? <h2>Welcome back, {user.username}</h2> : null}
    <Login onLogin={setUser} />
    </>
  );
}

export default App;
