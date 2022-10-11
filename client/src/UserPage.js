import { useState } from "react"
import Button  from "react-bootstrap/Button"
import Store from "./Store"
import Login from "./Login"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import CardGroup from 'react-bootstrap/CardGroup'
import Modal from 'react-bootstrap/Modal'
import './UserPage.css'





function UserPage({users, user, setUser}){

    const [storeList, setStoreList] = useState([])

    function handleClick(){
        fetch('/stores')
        .then(r => r.json())
        .then( data => {
            let newStore
            console.log(data)
            const stores = data.filter((store) => {
                
                setStoreList((prev) => [...prev, newStore])
            })
        })
    }

    if(!user) return <Login onLogin={setUser} />

    return(
        <>
        <h1>Welcome to the Users Page</h1>
        <ul>
            {users.map((u) => {
                return(
                    <div key={u.id} className="userCard">
                    <CardGroup>
                    <Card id={u.id} data-cardid={u.id} style={{ width: '18rem' }}>
      {/* <Card.Img variant="top" src={s.firebase} /> */}
      <Card.Body>
        <Card.Title>{u.summary}</Card.Title>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroup.Item>Shoe Size: {s.size}</ListGroup.Item>
        <ListGroup.Item>Store: {s.store.name}</ListGroup.Item>
        <ListGroup.Item>{s.for_sale ? <>This is For Sale</> : <>Not For Sale</>}</ListGroup.Item>
      </ListGroup> */}
    </Card>
                    </CardGroup>
                    </div>
                )
            })}
        </ul>
        </>
    )
}

export default UserPage