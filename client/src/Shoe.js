import Button from "react-bootstrap/esm/Button"
import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import DonateShoe from "./DonateShoe";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import './Shoe.css'
import CardGroup from 'react-bootstrap/CardGroup'
import NewShoe from "./NewShoe";
import { storage } from './firebase';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import {useNavigate} from "react-router-dom"
import Spinner from "react-bootstrap/Spinner"





function Shoe({ deleteShoe, users, user}) {

  const [shoeList, setShoeList] = useState([])
  const [imageList, setImageList] = useState([])
  const [addShoe, setAddShoe] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const navigate = useNavigate()

  



    const handleClose = () => {
      let removeBtn = document.getElementById('remove-button')
      console.log(removeBtn)
      setShow(false)

    };
    const handleShow = (e) => {
      setShow(true)
      console.log(e)
    };
    const handleUpdate = () => setUpdate(true)
    let handleRemove = (e, s) => {
        setShow(false)
        console.log(s)
        console.log(e)
        console.log(e.target.dataset.shoeid)
        deleteShoe(e, s)
        
        
       
        
    }

    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)

    const imageListRef = ref(storage, "SneakerImages/")


    useEffect(() => {
      fetch("/shoes/")
      .then(r => r.json())
      .then(s => {
        console.log(s)
        setShoeList(s)
      })
      listAll(imageListRef)
      .then(r => {
        r.items.forEach((item) => {
          // getTheData(item)
          getDownloadURL(item).then((url) => {
            setImageList((prev) => [...prev, url])
            setLoading(false)
            console.log('loaded')
          } )
        })
      })
    }, [])

    
    function renderShoe(newShoe){
      console.log(newShoe)
      console.log(shoeList)
      setShoeList((prevArr) => [...prevArr, newShoe])
      console.log('newImg added')
    }

    function deleteShoe(e, s){
      console.log(e)
      let shoe = s.id
      console.log(shoe)
      let shoeImg = document.getElementById(shoe)
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
      }).then(r => {
        console.log('removed from database')
        navigate('/deleted')
      }).catch((error) => {
        alert(error)
      })
     
      
    }
  

    console.log(shoeList.length)

  
    
      // while(shoeList.length === 0 ){
      //   console.log(shoeList.length)

  
      

      //   return(
      //     <>
      //     <h1>You do not have any shoes.</h1>
      //     <NewShoe setShoeList={setShoeList} user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} />
      //     </>
      //   )
      // }

    if(isLoading){
      console.log('loading')
      return <Spinner animation="grow" variant="light" />
    }
    if(shoeList.length > 0 && user){
    console.log("loading")
    console.log(shoeList)
    console.log(user)
    let usrList = [...shoeList]
     usrList = usrList.filter(s => s.user.id === user.id)
    
    return (
      <>
      <Button variant='dark' style={{marginTop: '3rem', marginBottom: '3rem'}} size='lg ' onClick={() => setAddShoe(!addShoe)}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button>
      {addShoe ? <NewShoe setShoeList={setShoeList} user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} /> : null}
        <div id='shoeContainer'>
            <CardGroup>
           
       {user ? usrList.filter((s) => s.user.id === user.id).map((s) => {

            return(
        <div key={s.id}>
         <Card id={s.id} data-cardid={s.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={s.firebase} />
      <Card.Body>
        <Card.Title>{s.brand}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Shoe Size: {s.size}</ListGroup.Item>
        <ListGroup.Item>Store: {s.store.name}</ListGroup.Item>
        <ListGroup.Item>{s.for_sale ? <>This is For Sale</> : <>Not For Sale</>}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button size="lg" variant="primary" onClick={handleShow}>
        Shoe Management
      </Button>
      </Card.Body>
      <Modal data-picid={s.id} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to do?</Modal.Title>
        </Modal.Header>
        <Modal.Footer data-picid={s.id}>
          <Button size="lg" variant="primary" onClick={handleUpdate}>
            Update Shoe
          </Button>
          <Button id='remove-button' data-shoeid={s.id} size="lg" variant="danger" onClick={(e) => handleRemove(e, s)}>
            Remove Shoe
          </Button>
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        {update ? <DonateShoe show={show} setShow={setShow} shoeList={shoeList} setShoeList={setShoeList} shoe={s} users={users} user={user} update={update} setUpdate={setUpdate} /> : null}
      </Modal>
    </Card>
      
   
      
      </div>
        )
        }) : null}
        </CardGroup>
        </div>
        </>

    )}
            return(
          <>
          <h1>You do not have any shoes.</h1>
          <NewShoe setShoeList={setShoeList} user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} />
          </>
        )

      }
    //   else{
    //     return(
    //       <> 
    //       <Button variant='dark' style={{marginTop: '3rem', marginBottom: '3rem'}} size='lg ' onClick={() => setAddShoe(!addShoe)}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button>
    //       {addShoe ? <NewShoe user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} /> : null}
    // </>
    //     )
    //   }

export default Shoe