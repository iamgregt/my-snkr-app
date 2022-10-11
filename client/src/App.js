import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import Shopping from './Shopping';
import Shoe from './Shoe';
import Navi from './Navi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ShoeDeletedPage from './ShoeDeletedPage';
import {useNavigate} from "react-router-dom"
import UserPage from './UserPage';
import {Spinner} from 'react-bootstrap/Spinner'
import Login from './Login';





function App() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
        console.log('cool')  
        console.log(user)
      }
    })
  }, [])


  useEffect(() => {
    fetch('/users')
    .then(r => r.json())
    .then(data => setUsers(data))  
  }, [])
  


  function handleLogOut(){
    fetch('/logout', {
      method: "DELETE"
    }).then(() => {
      navigate('/')
      setUser()
      
      
    })
  }


  function handleUpdateShoeForm(e){
    e.preventDefault(e)
    console.log(e)
  }

//  setTimeout(() =>{
//   if(!user) return <Login onLogin={setUser} />

//  }, 3000 )








  return (
    <div className='App'>
    <Navi handleLogOut={(handleLogOut)} user={user} />
    <Routes>
      <Route path="/shoepage" element={<Shoe users={users} handleUpdate={handleUpdateShoeForm} user={user} />} />
      <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
      <Route path="/stores" element={<Shopping user={user} setUser={setUser} />} />
      <Route path="/deleted" element={<ShoeDeletedPage />} />
      <Route path="/userpage" element={<UserPage users={users} user={user} setUser={setUser} />} />
    </Routes>
</div>
  );
}

export default App;