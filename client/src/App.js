import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import NewShoe from './NewShoe';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import Shopping from './Shopping';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal'
import DonateShoe from './DonateShoe';
import Shoe from './Shoe';
import { assert } from '@firebase/util';
import Navi from './Navi';



function App() {


  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState(null)
  const [imageList, setImageList] = useState([])
  const [addShoe, setAddShoe] = useState(false)
  const [shoeList, setShoeList] = useState([])
  const [stores, setStores] = useState([])

  const [users, setUsers] = useState([])

  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate = () => setUpdate(true)



  const imageListRef = ref(storage, "SneakerImages/")
  const shoeDescriptions = ref(storage, "ShoeDescriptions/")

  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
        console.log('cool')    
      }
    })
  }, [])

  useEffect(() => {
    fetch('/users')
    .then(r => r.json())
    .then(data => setUsers(data))  
  }, [])
  
  
  useEffect(() => {
    fetch("/shoes/")
    .then(r => r.json())
    .then(shoes => setShoes(shoes))
  }, [])
  
  
  useEffect(() => {
    fetch('/stores')
    .then(r => r.json())
    .then(s => setStores(s))
  }, [])



  useEffect(() => {
    fetch("/shoes/")
    .then(r => r.json())
    .then(shoes => setShoeList(shoes))
  }, [])

  // function getTheData(pic){
  //   const picPath = ref(storage, pic._location.path)
  //   getMetadata(picPath).then((metadata) => {
  //     console.log(metadata.customMetadata.user_id)
  //   }).catch((error) => console.log(error))
  // }

  useEffect(() => {
    listAll(imageListRef)
    .then(r => {
      r.items.forEach((item) => {
        // getTheData(item)
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url])
        } )
      })
    })
    
  }, [])


  function handleLogOut(){
    fetch('/logout', {
      method: "DELETE"
    }).then(() => setUser())
  }


  function deleteShoe(e){
    console.log(e)
    const shoe = e.target.dataset.shoeid
    console.log(shoe)
    const shoeImg = document.getElementById(shoe)
    shoeImg.remove()

    setShoeList(shoeList.filter((i) => {
      return i.id !== shoe
    }))
    fetch(`/shoes/${shoe}`)
    .then(r => r.json())
    .then(s => {
     const shoeRef = ref(storage, s.firebase)
    deleteObject(shoeRef).then(() => {
      console.log(shoe)
    }).catch((error) => {
  console.log(error)
  // setShoeList(imageList.filter((i) => {
  //   return i !== s.firebase
  // }))
  setImageList(imageList.filter((i) => {
    return i !== s.firebase
  }))
    });
    })

    fetch(`/shoes/${shoe}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => console.log('removed from database'))
   
    
  }

  if(user) {
    console.log(`Welcome back ${user.username}`)
  }

  function renderShoe(newShoe){
    console.log(newShoe)
    setShoeList((prevArr) => [...prevArr, newShoe])
    console.log('newImg added')
  }

  function handleUpdateShoeForm(e){
    e.preventDefault(e)
    console.log(e)
  }



  return (
    <>
    <Navi handleLogOut={handleLogOut} user={user} />
    <Button size='lg ' onClick={() => setAddShoe(!addShoe)}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button>
    {!user ? <Login onLogin={setUser} shoes={shoes}/> : null}
    {addShoe ? <NewShoe user={user} setImageList={setImageList} newShoe={shoeList} setShoeList={setShoeList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} /> : null}
    {shoes ? <Shoe shoeList={shoeList} deleteShoe={deleteShoe} users={users} handleUpdate={handleUpdateShoeForm}/> : null}
</>
  );
}

export default App;