import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import NewShoe from './NewShoe';
import Caro from './Caro';
import {Route, Routes, Navigate} from "react-router-dom"
import HomePage from './HomePage';

function App() {

  const [user, setUser, getUser] = useState(null)
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

  function setNewUser(usr){
    setUser(usr)
  }



  return (
    <>
    <Routes>
    <Route path='/' element={<Login onLogin={setNewUser} />} />
    <Route path="/home" element={user ? <HomePage usr={user} setUser={setUser} getUser={getUser} /> : null} />
    {/* <Caro /> */}
    {/* <NewShoe user={user} /> */}
    {/* {!user ? <Login onLogin={setUser} shoes={shoes}/> : null} */}
    
  
  {/* <Route path="/login" element={<Login onLogin={setUser}/>}/> */}
 
  </Routes></>);
}

export default App;
