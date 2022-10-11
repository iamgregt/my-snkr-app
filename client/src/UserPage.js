import { useState } from "react"
import Login from "./Login"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import './UserPage.css'
import Spinner from 'react-bootstrap/Spinner'





function UserPage({users, user, setUser}){



    if(!user){
        console.log('loading')
        return <Spinner animation="grow" variant="light" />
      }
    if(user){return(
        <>
        <h1>Welcome to the Users Page</h1>
        <ul>
            {users.map((u) => {
                return(
                    <div key={u.id} className="userCard">
                    <CardGroup>
                    <Card id={u.id} data-cardid={u.id} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{u.summary}</Card.Title>
      </Card.Body>
    </Card>
                    </CardGroup>
                    </div>
                )
            })}
        </ul>
        </>
    )}
    return(
     <Login onLogin={setUser} />
    )
}

export default UserPage