import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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

  function handleTakeShoe(){
    const newShoe = {
      size: 9,
      user_id: 1
    }

    fetch('/shoes/1', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newShoe)
    }).then(r => r.json()).then(data => console.log(data))
  }

  if(user) {
    console.log(`Welcome back ${user.username}`)
  }

  return (
    <>
    <button onClick={handleLogOut}>Logout?</button>
    <button onClick={handleTakeShoe}>Take Shoe?</button>
    <form>
      <label>Shoe size</label>
      <input type="number"/>
    </form>
    {user ? <h2>Welcome back, {user.username}</h2> : null}
    {shoes ? <img src={shoes[0].image}/> : null}
    {!user ? <Login onLogin={setUser} shoes={shoes}/> : null}
</>
  );
}

export default App;
