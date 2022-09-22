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
    {user ? <h2>Welcome back, {user.username}! </h2> : null}
    </div>
    <h5 className="card-title">You're now viewing your closet</h5>
    <p className="card-text">Which pair are you feeling for today???</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item"><h2>Jordan</h2></li>
    <li className="list-group-item"><h2>Nike</h2></li>
    <li className="list-group-item"><h2>Puma</h2></li>
    <li className="list-group-item"><h2>Reebok</h2></li>
  </ul>
  {stores ? <Store stores={stores} /> : null}
</div>
    )
}

export default Shopping