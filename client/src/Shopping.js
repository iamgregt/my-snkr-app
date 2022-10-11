import {useEffect, useState} from 'react'
import Store from './Store'
import Login from './Login'
import './Shopping.css'

function Shopping({user, setUser}){
  const [stores, setStores] = useState([])


  useEffect(() => {
    fetch('/stores')
    .then(r => r.json())
    .then(s => {
      console.log(s)
      setStores(s)})
  }, [])

  if(!user) return <Login onLogin={setUser} />


    return(
        <div className="card">
  {/* <img className="card-img-top" src="https://1000logos.net/wp-content/uploads/2020/10/Finish-Line-Logo-1976.png" alt="Card image cap" /> */}
  <div className="card-body"><div>
    {user ? <h1 className='welcome'>Welcome back, {user.username}! </h1> : null}
    </div>
  </div>
  {stores ? <Store stores={stores} setStores={setStores} /> : null}
</div>
    )
}

export default Shopping