import Button from "react-bootstrap/esm/Button"
import {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import DonateShoe from "./DonateShoe";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'


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
           
        {shoeList ? shoeList.map((s) => {
            return(
        <div>
         <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={s.firebase} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
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
          <Button size="lg" variant="danger" onClick={handleClose}>
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
        </div>
    )
}

export default Shoe