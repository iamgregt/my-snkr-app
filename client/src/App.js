import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import { useEffect, useState } from 'react';
import NewShoe from './NewShoe';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { storage } from './firebase';
import Shopping from './Shopping';
import Button from 'react-bootstrap/esm/Button';


function App() {

  const initialState = [
    {url: 'test', path: 'test', name: 'test'}
  ]
  const [testObj, setTestObj] = useState(initialState)
  const [user, setUser] = useState(null)
  const [shoes, setShoes] = useState(null)
  const [imageList, setImageList] = useState([])
  const [addShoe, setAddShoe] = useState(false)



  const imageListRef = ref(storage, "SneakerImages/")


  useEffect(() => {
    fetch("/me").then((r) => {
      if(r.ok) {
        r.json().then((user) => setUser(user))
        console.log('cool')
        console.log(testObj)
      }
    })
  }, [])

  useEffect(() => {
    fetch("/shoes/")
    .then(r => r.json())
    .then(shoes => setShoes(shoes))
  }, [])

  function getTheData(pic){
    const picPath = ref(storage, pic._location.path)
    getMetadata(picPath).then((metadata) => {
      console.log(metadata.customMetadata.user_id)
    }).catch((error) => console.log(error))
    console.log(imageList)
    console.log(shoes)
  }

  useEffect(() => {
    listAll(imageListRef)
    .then(r => {
      r.items.forEach((item) => {
        console.log(item)
        console.log(item._location.path)
        getTheData(item)
        console.log(item.name)
        console.log(testObj)
       
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

  function handleTakeShoe(){
    setAddShoe(!addShoe)
    const newShoe = {
      user_id: 1
    }

  



    // fetch('/shoes/2', {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(newShoe)
    // }).then(r => r.json()).then(data => console.log(data))
  }
  function deleteShoe(e){
    console.log(e)
    const shoe = e.target.id
    fetch(`/shoes/${shoe}`)
    .then(r => r.json())
    .then(s => {
     const shoeRef = ref(storage, s.firebase)
    deleteObject(shoeRef).then(() => {
      console.log(shoe)
    }).catch((error) => {
  console.log(error)
  setImageList(imageList.filter((i) => {
    return i !== s.firebase
  }))
    });
    })

    fetch(`/shoes/${e.target.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => console.log('removed from database'))


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
          console.log(shoe)
          return(<>
            <li>{shoe.brand} in a size {shoe.size}</li>
            <img onClick={deleteShoe} id={shoe.id} src={shoe.firebase} />
            </>
          )
        })}
      </ul>
      {imageList ? imageList.map(url => <img src={url} /> ) : null}

      </>
    )
  }

  function handleListRemoval(e){
    const shoe = e.target.currentSrc
    setImageList((currentList) => {
      currentList.filter((s) => {
        return s !== shoe
      })
    })
  }

  return (
    <>
   {user ?  <Button onClick={handleLogOut}>Logout?</Button> : null}
    <Button onClick={handleTakeShoe}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button>
    {!user ? <Login onLogin={setUser} shoes={shoes}/> : null}
    {addShoe ? <NewShoe user={user} setImageList={setImageList} setTestObj={setTestObj} testObj={testObj} /> : null}
    {user ? <h2>Welcome back, {user.username}.</h2> : null}
    {/* {user && user.shoes ? <>{writeId(user, user.shoes)}</>: null} */}
    {/* {imageList ? imageList.map(url => <img src={url} /> ) : null} */}
    {user ? <>
      <h3>You're ID is {user.id}</h3>
      <h3>Here's your closet!</h3>
      <ul>
        {user.shoes.map((shoe) => {
          console.log(shoe)
          return(<>
            <li>{shoe.brand} in a size {shoe.size}</li>
            <img onClick={deleteShoe} id={shoe.id} src={shoe.firebase} />
            </>
          )
        })}
      </ul>
      {imageList ? imageList.map(url => <img onClick={handleListRemoval} src={url} /> ) : null}

      </> : null}
    <Shopping />
</>
  );
}

export default App;