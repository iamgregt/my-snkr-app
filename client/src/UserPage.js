import { useState } from "react"
import Button  from "react-bootstrap/Button"
import Store from "./Store"



function UserPage({users}){

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



    return(
        <>
        <h1>Welcome to the User Page</h1>
        <ul>
            {users.map((u) => {
                return(
                    <li key={u.id}>{u.summary}</li>
                )
            })}
        </ul>
        <Button onClick={handleClick}>Shop At</Button>
        <ul>
            {storeList.map((s) => {
                return(
                    <li key={s.name}>{s.name}</li>
                )
            })}
        </ul>
        </>
    )
}

export default UserPage