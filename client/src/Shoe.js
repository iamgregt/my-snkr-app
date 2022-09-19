import Button from "react-bootstrap/esm/Button"
import {useState, useEffect} from 'react'
import Modal from 'react-bootstrap/Modal'
import DonateShoe from "./DonateShoe";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import myJson from './assets/shoeDescriptions.json'
import CardGroup from 'react-bootstrap/CardGroup'
import NewShoe from "./NewShoe";
import { storage } from './firebase';
import { ref, listAll, getDownloadURL, getMetadata, deleteObject } from 'firebase/storage';
import { async } from "@firebase/util";




function Shoe({ deleteShoe, users, user}) {

  const [shoeList, setShoeList] = useState([])
  const [imageList, setImageList] = useState([])
  const [addShoe, setAddShoe] = useState(false)

  
  const getShoes = () => {
    let arr = [...shoeList]

  }




    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => setUpdate(true)
    const handleRemove = (e) => {
        setShow(false)
        deleteShoe(e)
    }

    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)
    const [shoesLoaded, setShoesLoaded] = useState(false)

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
          } )
        })
      })
    }, [])

    

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

    function renderShoe(newShoe){
      console.log(newShoe)
      setShoeList((prevArr) => [...prevArr, newShoe])
      console.log('newImg added')
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
  

    console.log(shoeList.length)

    

        // console.log(shoeList)
        // setShoeList(shoes)
        // console.log(shoes)
        // console.log(user)
        // let userShoes = shoeList
        // let newestShoe = userShoes[userShoes.length - 1]
        // userShoes.map((s) => {
        //     s.user_id = user.id
        //     console.log(s)
        // })
        // console.log(newestShoe)
        // console.log(shoeList.length)
      // if(shoeList.length !== 0){
      //   console.log(userShoes)
      //   userShoes = userShoes.filter((kick) => kick !== newestShoe)
      //   console.log(userShoes)
      // }
    while(shoeList.length === 0 ){
      return(
        <>Loading</>
      )
    }

    if(shoeList.length > 0 && user){
    console.log("loading")
    console.log(shoeList)
    console.log(user)
    const usrList = shoeList.filter(s => s.user.id === user.id)
    }
    return (
      <>
      <Button variant='dark' style={{marginTop: '3rem', marginBottom: '3rem'}} size='lg ' onClick={() => setAddShoe(!addShoe)}>{addShoe ? <>Forget About It!</>: <>Add a pair?</>}</Button>
      {addShoe ? <NewShoe user={user} setImageList={setImageList} renderShoe={renderShoe} addShoe={addShoe} setAddShoe={setAddShoe} /> : null}
        <div id='shoeContainer'>
            <CardGroup>
           
       {user ? shoeList.filter((s) => s.user.id === user.id).map((s) => {
            // console.log(s)
            let shoeDescription = ""
            const shoeJson = myJson.find(d => d.name == s.brand)
            shoeJson ? shoeDescription = shoeJson.description : shoeDescription = "no desc"

            return(
        <div>
         <Card id={s.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={s.firebase} />
      <Card.Body>
        <Card.Title>{s.brand}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Shoe Size: {s.size}</ListGroup.Item>
        <ListGroup.Item>{shoeDescription}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
      <Button size="lg" variant="primary" onClick={handleShow}>
        Shoe Management
      </Button>
      </Card.Body>
    </Card>
      
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to do?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button size="lg" variant="primary" onClick={handleUpdate}>
            Update Shoe
          </Button>
          <Button data-shoeid={s.id} size="lg" variant="danger" onClick={handleRemove}>
            Remove Shoe
          </Button>
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        {update ? <DonateShoe show={show} setShow={setShow} shoeList={shoeList} setShoeList={setShoeList} shoe={s} users={users} user={user} update={update} setUpdate={setUpdate} /> : null}
      </Modal>
      
      </div>
        )
        }) : console.log('something went wrong')}
        </CardGroup>
        </div>
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