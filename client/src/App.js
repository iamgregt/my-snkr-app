import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import NewShoe from './NewShoe';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import Shopping from './Shopping';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import DonateShoe from './DonateShoe';
import Shoe from './Shoe';
import { assert } from '@firebase/util';
import Navi from './Navi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ShoeDeletedPage from './ShoeDeletedPage';
import {useNavigate} from "react-router-dom"
import UserPage from './UserPage';




function App() {

  const navigate = useNavigate()


  const [user, setUser] = useState(null)
  // const [shoes, setShoes] = useState(null)
  // const [shoeList, setShoeList] = useState([])
  const [stores, setStores] = useState([])

  const [users, setUsers] = useState([])

  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = () => setUpdate(true)




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
  

  
  // useEffect(() => {
  //   fetch("/shoes/")
  //   .then(r => r.json())
  //   .then(shoes => {
  //     setShoes(shoes)
  //     setShoeList(shoes)
  //   })
  // }, [])
  
  
  // useEffect(() => {
  //   fetch('/stores')
  //   .then(r => r.json())
  //   .then(s => setStores(s))
  // }, [])



  // useEffect(() => {
  //   fetch("/shoes/")
  //   .then(r => r.json())
  //   .then(shoes => setShoeList(shoes))
  // }, [])

  // function getTheData(pic){
  //   const picPath = ref(storage, pic._location.path)
  //   getMetadata(picPath).then((metadata) => {
  //     console.log(metadata.customMetadata.user_id)
  //   }).catch((error) => console.log(error))
  // }

  // useEffect(() => {
  //   listAll(imageListRef)
  //   .then(r => {
  //     r.items.forEach((item) => {
  //       // getTheData(item)
  //       getDownloadURL(item).then((url) => {
  //         setImageList((prev) => [...prev, url])
  //       } )
  //     })
  //   })
    
  // }, [])


  function handleLogOut(){
    fetch('/logout', {
      method: "DELETE"
    }).then(() => {
      navigate('/')
      setUser()
      
      
    })
  }

  // function clearImageState(){
  //   setShoeList([])
  // }

  
  // if(user) {
  //   console.log(`Welcome back ${user.username}`)
  // }



  function handleUpdateShoeForm(e){
    e.preventDefault(e)
    console.log(e)
  }

  if(!user) return <Login onLogin={setUser} />




  return (
    <>
    <Navi handleLogOut={(handleLogOut)} user={user} />
    {/* {user ? <Button variant='dark' style={{marginTop: '3rem', marginBottom: '3rem'}} size='lg ' onClick={() => setAddShoe(!addShoe)}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button> :null} */}
    {/* {addShoe ? <NewShoe user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} /> : null} */}
    <Routes>
      <Route path="/shoepage" element={<Shoe users={users} handleUpdate={handleUpdateShoeForm} user={user} />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<Shopping user={user} />} />
      <Route path="/deleted" element={<ShoeDeletedPage />} />
      <Route path="/userpage" element={<UserPage users={users} />} />
    </Routes>
</>
  );
}

export default App;