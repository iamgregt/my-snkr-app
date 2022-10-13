import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from 'react';
import Navi from './Navi';
import {useNavigate} from "react-router-dom"
import AnimatedRoutes from './AnimatedRoutes';





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
      }else{
        setTimeout(() => {
          console.log('not signed in')
          navigate('/')
        }, 2000)
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
    <AnimatedRoutes user={user} setUser={setUser} users={users} handleUpdateShoeForm={handleUpdateShoeForm} />
</div>
  );
}

export default App;