import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import NewShoe from './NewShoe';

function App() {

  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState(null)
  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
        console.log('cool')
      }
    })
  }, [])

  useEffect(() => {
    fetch("/shoes")
    .then(r => r.json())
    .then(shoes => setShoes(shoes))
  }, [])


  function handleLogOut(){
    fetch('/logout', {
      method: "DELETE"
    }).then(() => setUser())
  }

  function handleTakeShoe(){
    const newShoe = {
      user_id: 1
    }

    fetch('/shoes/2', {
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

  function writeId(usr, kicks){
    return(
      <>
      <h3>You're ID is {usr.id}</h3>
      <h3>Here's your closet!</h3>
      <ul>
        {kicks.map((shoe) => {
          return(
            <li>{shoe.brand} in a size {shoe.size}</li>
          )
        })}
      </ul>
      </>
    )
  }

  return (
    <>
    <button onClick={handleLogOut}>Logout?</button>
    <button onClick={handleTakeShoe}>Take Shoe?</button>
    <NewShoe user={user} />
    {user ? <h2>Welcome back, {user.username}.</h2> : null}
    {user && user.shoes ? <>{writeId(user, user.shoes)}</>: null}
    {user ? <img src={user.shoes[0].image}/> : null}
    {!user ? <Login onLogin={setUser} shoes={shoes}/> : null}
</>
  );
}

export default App;