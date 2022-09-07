import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';

function App() {

  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState(null)

  useEffect(() => {
    fetch("/shoes")
    .then(r => r.json())
    .then(shoes => setShoes(shoes))
  }, [])

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  function handleLogOut(){
    fetch('/logout', {
      method: "DELETE"
    }).then(() => setUser())
  }

  if(user) {
    console.log(`Welcome back ${user.username}`)
  }

  return (
    <>
    
    <button onClick={handleLogOut}>Logout?</button>
    {user ? <h2>Welcome back, {user.username}</h2> : null}
    {shoes ? <img src={shoes[0].image}/> : null}
    {!user ? <Login onLogin={setUser} shoes={shoes}/> : null}

    </>
  );
}

export default App;
