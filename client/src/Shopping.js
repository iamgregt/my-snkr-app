import {useEffect, useState} from 'react'
import Store from './Store'

function Shopping({user}){
  const [stores, setStores] = useState([])


  useEffect(() => {
    fetch('/stores')
    .then(r => r.json())
    .then(s => {
      console.log(s)
      setStores(s)})
  }, [])

    


    return(
        <div className="card">
  {/* <img className="card-img-top" src="https://1000logos.net/wp-content/uploads/2020/10/Finish-Line-Logo-1976.png" alt="Card image cap" /> */}
  <div className="card-body"><div>
    {user ? <h1>Welcome back, {user.username}! </h1> : null}
    </div>
  </div>
  {stores ? <Store stores={stores} /> : null}
</div>
    )
}

export default Shopping