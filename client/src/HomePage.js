import {useEffect} from "react"
import {useNavigate} from "react-router-dom"

function HomePage({usr, setUser, getUser}){
    let navigate = useNavigate()

    useEffect(() => {
        fetch("/me").then((r) => {
          if(r.ok) {
            r.json().then((user) => setUser(user))
          }
        })
      }, [])

    function handleLogOut(){
        fetch('/logout', {
          method: "DELETE"
        }).then(() => {
            setUser()
            navigate('/login', {replace: true})
        })
      }
    
      function handleTakeShoe(){
        const newShoe = {
          size: 9,
          user_id: 1
        }
    
        fetch('/shoes/1', {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newShoe)
        }).then(r => r.json()).then(data => console.log(data))
      }

    return(
      <>
      <button onClick={handleLogOut}>Logout?</button>
      <button onClick={handleTakeShoe}>Take Shoe?</button>
      <h2>Welcome back, {usr.username}.</h2>
      <h3>You're ID is {usr.id}</h3>
      <h3>Here's your closet!</h3>
      <ul>
        {usr.shoes.map((shoe) => {
          return(
            <li>{shoe.brand} in a size {shoe.size}
            <img src={shoe.image}/></li>
          )
        })}
      </ul>
      </>
    )

}

export default HomePage