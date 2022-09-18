import Button from "react-bootstrap/esm/Button"
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import DonateShoe from "./DonateShoe";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import myJson from './assets/shoeDescriptions.json'
import CardGroup from 'react-bootstrap/CardGroup'



function Shoe({shoeList, deleteShoe, users}) {



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleUpdate = () => setUpdate(true)

    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState(false)
    
    function handleUpdateShoeForm(e){
        e.preventDefault(e)
        console.log(e)
      }


  

    return (
        <div id='shoeContainer'>
            <CardGroup>
           
        {shoeList ? shoeList.map((s) => {
            let shoeDescription = ""
            const shoeJson = myJson.find(d => d.name == s.brand)
            shoeJson ? shoeDescription = shoeJson.description : shoeDescription = "no desc"

            return(
        <div>
         <Card id={s.id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={s.firebase} />
      <Card.Body>
        <Card.Title>{s.brand}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Shoe Size: {s.size}</ListGroup.Item>
        <ListGroup.Item>{shoeDescription}</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#" onClick={handleShow}>Donate Shoe</Card.Link>
        <Card.Link href="#">Delete Shoe</Card.Link>
      </Card.Body>
    </Card>
        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to do?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button size="lg" variant="primary" onClick={handleUpdate}>
            Update Shoe
          </Button>
          <Button data-shoeID={s.id} size="lg" variant="danger" onClick={deleteShoe}>
            Remove Shoe
          </Button>
          <Button size="lg" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        {update ? <DonateShoe shoe={s} users={users} /> : null}
      </Modal>
      
      </div>
        )
        }): null}
        </CardGroup>
        </div>

    )
}

export default Shoe